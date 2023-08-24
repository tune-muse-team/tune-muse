// https://www.builder.io/blog/stream-ai-javascript

var API_URL = "https://api.openai.com/v1/chat/completions";
var AK1 = "sk-Sco";
var AK2 = "ZaL";
var AK3 = "TQMx";
var AK4 = "kjSb2";
var AK5 = "CB9oNT3Blbk";
var AK6 = "FJANRiYPnFM9i";
var AK7 = "djpvjZsoj";

var generate = async () => {

  try {
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AK1 + AK2 + AK3 + AK4 + AK5 + AK6 + AK7,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Provide a single song title and artist with no further comments ; the user cue is : I want to feel excited when listening to this song ; the song must match the following styles : jazz ; the song must match the following moods : dramatic ; the song must match the following themes : physical activity."}],
        temperature: 1
      }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    console.log("Error occurred while generating.");
  }
};

generate();

/*

import { Configuration, OpenAIApi } from "openai";
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();
*/