// https://www.builder.io/blog/stream-ai-javascript

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const generate = async () => {

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Provide a single song title and artist with no further comments ; the user cue is : I want to feel excited when listening to this song ; the song must match the following styles : jazz ; the song must match the following moods : dramatic ; the song must match the following themes : city life."}],
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
