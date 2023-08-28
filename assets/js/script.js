// TODO: Figure out what information needs to be stored in localStorage (for info on discovered songs and info on the current request as the user goes back and forth between different screens)

// Store button elements in variables
var tuneMuseLogoButton = document.getElementById("tune-muse-logo");
var songsDiscoveredButton = document.getElementById("songs-discovered-button");
var discoverButton = document.getElementById("discover-button");
var newRequestButton = document.getElementById("new-request-button");
var backButton = document.getElementById("back-button");
var nextButton = document.getElementById("next-button");
var newRequestResultsButton = document.getElementById("new-request-results-button");
var newRequestHistoryButton = document.getElementById("new-request-history-button");

// Store elements for each different screen
var homeEl = document.getElementById("home-screen");
var queryEl = document.getElementById("query-screen");
var tuningEl = document.getElementById("tuning-screen");
var resultsEl = document.getElementById("results-screen");
var historyEl = document.getElementById("history-screen");
var stepperEl = document.getElementById("stepper");
var bottomControlsEl = document.getElementById("bottom-controls");

// Declare other global variables
var discoveredSongHistory = [];
var discoveredArtistHistory = [];
var userQuery = "";
var suggestedArtist = "";
var suggestedSong = "";
// var chatgptApiQuery = 'Create a valid JSON array of no more than one song title and the associated main artist ; the cue to select the song is : ';
var chatgptApiQuery;
var chatgptApiUrl = "https://api.openai.com/v1/chat/completions";
var AK1 = "sk-Sco";
var AK2 = "ZaL";
var AK3 = "TQMx";
var AK4 = "kjSb2";
var AK5 = "CB9oNT3Blbk";
var AK6 = "FJANRiYPnFM9i";
var AK7 = "djpvjZsoj";
var historyDisplay = false;

// Store a clone variable of the tuning-screen to reinitialize it easily

var chipsScreenClone = "";

$( document ).ready(function() {
 chipsScreenClone = $("#introduction-section-chips").clone();
});

function getLocalStorage() {
  if (localStorage.hasOwnProperty("discovered-songs")) {
    discoveredSongHistory = localStorage.getItem("discovered-songs").split(",");
    discoveredArtistHistory = localStorage.getItem("discovered-artists").split(",");
    console.log(discoveredSongHistory);
    console.log(discoveredArtistHistory);
  }
}

// Switch between each different screen
function populateHistoryScreen() {
  historyDisplay = true;
  getLocalStorage();
  document.getElementById("history-list").innerHTML = "";
  console.log("Inside populateHistoryScreen -> historyDisplay =", historyDisplay);
  for (i = 0; i < discoveredSongHistory.length; i++) {
    suggestedSong = discoveredSongHistory[i];
    suggestedArtist = discoveredArtistHistory[i];
    console.log("Song to be added to history:", suggestedSong);
    console.log("Artist to be added to history:", suggestedArtist);
    console.log("Moving to generate Spotify iframe for item", i);
    pullSpotifyData();
  }
  historyDisplay = false;
}

function displayHomeScreen() {
  homeEl.style.display = "block";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  tuningEl.style.display = "none";
  resultsEl.style.display = "none";
  stepperEl.style.display = "none";
  bottomControlsEl.style.display = "none";
}

function displayHistoryScreen() {
  populateHistoryScreen();
  homeEl.style.display = "none";
  historyEl.style.display = "block";
  queryEl.style.display = "none";
  tuningEl.style.display = "none";
  resultsEl.style.display = "none";
  stepperEl.style.display = "none";
  bottomControlsEl.style.display = "none";
}

function goHome() {
  if (localStorage.hasOwnProperty("discovered-songs")) {
    displayHistoryScreen();
  } else {
    displayHomeScreen();
  }
}

function displayQueryScreen() {
  document.getElementById("step2").className = "step-off";
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "block";
  tuningEl.style.display = "none";
  resultsEl.style.display = "none";
  stepperEl.style.display = "flex";
  bottomControlsEl.style.display = "flex";
}

function displayTuningScreen() {

  document.getElementById("step2").className = "step-on";
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  $("#introduction-section-chips").replaceWith(chipsScreenClone.clone());
  tuningEl.style.display = "block";
  resultsEl.style.display = "none";
  stepperEl.style.display = "flex";
  bottomControlsEl.style.display = "flex";
 
}

function displayResultsScreen() {
  document.getElementById("spotify-result").innerHTML = "";
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  tuningEl.style.display = "none";
  resultsEl.style.display = "block";
  stepperEl.style.display = "none";
  bottomControlsEl.style.display = "none";
}

function updateDiscoveredHistory() {
  getLocalStorage();
  discoveredSongHistory.push(suggestedSong);
  discoveredArtistHistory.push(suggestedArtist);
  localStorage.setItem("discovered-songs", discoveredSongHistory);
  localStorage.setItem("discovered-artists", discoveredArtistHistory);
}

async function pullSpotifyData() {
  console.log("Inside pullSpotifyData -> historyDisplay =", historyDisplay);
  var spotifyClientID = "95dac2ec667f4f81b55f7a7ffe19070f";
  var spotifySecretID = "1ac2264050d94b0ca2b1367722c36ef1";
  var apiLink = 'https://accounts.spotify.com/api/token';
  var spotifySearchEndpoint = 'https://api.spotify.com/v1/search?q=';
  var spotifyResultEl = document.getElementById("spotify-result");
  var newHistoryItem;

  // Reference https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow changed buffer to btoa since it is running on web Javascript
 
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (btoa(spotifyClientID + ':' + spotifySecretID).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  // https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow from the reference request.post is not a function so was changed to fetch
  
  fetch (authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = data.access_token;
    }
  });

  // TODO: Remove the function below after integration with current HTML is done
  function spotifyGenerateIframe(track) {
    console.log("Inside spotifyGenerateIframe -> historyDisplay =", historyDisplay);
    if (historyDisplay) {
      console.log("Inside new function!");
      newHistoryItem = document.createElement("div");
      newHistoryItem.innerHTML = ''
      newHistoryItem.innerHTML = '<DISPLAY_TRACK class="result-item">' + '<iframe src="https://open.spotify.com/embed/track/' + track.id + '" width=500 allow="encrypted-media">' + '</DISPLAY_TRACK>';
      document.getElementById("history-list").appendChild(newHistoryItem);
      console.log("Leaving new function!");
    } else {
      spotifyResultEl.innerHTML = '<DISPLAY_TRACK class="result-item">' + '<iframe src="https://open.spotify.com/embed/track/' + track.id + '" width=500 height=500 allow="encrypted-media">' + '</DISPLAY_TRACK>';
    }
  }

  function historyGenerateIframe(track) {
    console.log("Inside new function!");
    newHistoryItem = document.createElement("div");
    newHistoryItem.innerHTML = ''
    newHistoryItem.innerHTML = '<DISPLAY_TRACK class="result-item">' + '<iframe src="https://open.spotify.com/embed/track/' + track.id + '" width=500 allow="encrypted-media">' + '</DISPLAY_TRACK>';
    document.getElementById("history-list").appendChild(newHistoryItem);
    console.log("Leaving new function!");
  }

  // Function to handle the Spotify search
  async function searchSpotify() {
    var keyToken = await Token();
    var track = await SONGSEARCH(suggestedArtist, suggestedSong, keyToken);
    spotifyGenerateIframe(track);
  }

  async function historySearchSpotify() {
    var keyToken = await Token();
    var track = await SONGSEARCH(suggestedArtist, suggestedSong, keyToken);
    historyGenerateIframe(track);
  }
    
  async function Token() {
    var response = await fetch(apiLink, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(spotifyClientID + ":" + spotifySecretID)
        },
        body: "grant_type=client_credentials"
    });

    var data = await response.json();
    return data.access_token;
  }

  var SONGSEARCH = async function (artistName, songName, generatedToken) {
      var response = await fetch(spotifySearchEndpoint + artistName + "+track:" + songName + "&type=track", {
          headers: {
            "Authorization": "Bearer " + generatedToken
          }
      });
      var search = await response.json();
      return search.tracks.items[0]
  }

  console.log("About to enter searchSpotify -> historyDisplay =", historyDisplay);
  if (historyDisplay) {
    historySearchSpotify();
  } else {
    searchSpotify();
  }
  // searchSpotify();
  if (!historyDisplay) {
    console.log("About to update history...");
    updateDiscoveredHistory();
  }
}

// https://www.builder.io/blog/stream-ai-javascript

async function generateSongSuggestion() {

  try {
    
    const response = await fetch(chatgptApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AK1 + AK2 + AK3 + AK4 + AK5 + AK6 + AK7,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": chatgptApiQuery}],
        temperature: 1
      }),
    });
    const data = await response.json();
    console.log("CHATGPT RESPONSE:", data.choices[0].message.content);
    var queryResponse = data.choices[0].message.content;
    // var queryResponse = JSON.parse(data.choices[0].message.content);
    // console.log(queryResponse);
    var parsingSong = true;
    suggestedSong = "";
    suggestedArtist = "";
    for (i = 1; i < queryResponse.length; i++) {
      if (parsingSong) {
        if (queryResponse[i] !== '"') {
          suggestedSong += queryResponse[i];
        } else {
          i += 4;
          parsingSong = false;
        }
      } else {
        suggestedArtist += queryResponse[i];
      }
    }
    /*
    suggestedSong = queryResponse[0].TITLE;
    suggestedArtist = queryResponse[0].ARTIST;
    */
    console.log("Song:", suggestedSong);
    console.log("Artist:", suggestedArtist);
  } catch (error) {
    console.error("Error:", error);
    console.log("Error occurred while generating.");
  }
  pullSpotifyData();
};


function submitQuery() {
  chatgptApiQuery = 'Provide no more than one song in the format "SONG NAME" by ARTIST NAME ; the user cue is : ';
  userQuery = document.getElementById("current-user-wish").value;
  if (userQuery === "") {
    document.getElementById("query-error").style.display = "block";
  } else {
    chatgptApiQuery += userQuery + "; the song must match the following styles : ";
    displayTuningScreen();
  }
  document.getElementById("current-user-wish").value = "";
}

function submitSelectedAttributes() {
  var checkedStyles = document.getElementsByClassName("music-style active");
  for (i = 0; i < checkedStyles.length; i++) {
    chatgptApiQuery += checkedStyles[i].children[2].innerHTML;
    if (i !== checkedStyles.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
  chatgptApiQuery += "; the song must match the following moods : ";
  var checkedMoods = document.getElementsByClassName("music-mood active");
  for (i = 0; i < checkedMoods.length; i++) {
    chatgptApiQuery += checkedMoods[i].children[2].innerHTML;
    if (i !== checkedMoods.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
  chatgptApiQuery += "; the song must match the following themes : ";
  var checkedThemes = document.getElementsByClassName("music-theme active");
  for (i = 0; i < checkedThemes.length; i++) {
    chatgptApiQuery += checkedThemes[i].children[2].innerHTML;
    if (i !== checkedThemes.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
  // TODO: Clear chips' checked status after parsing them
  /*
  var chipsToClear = document.querySelectorAll('active');
  chipsToClear.forEach((element) => {
    chipsToClear.classList.remove('active');
  });
  */
  // chatgptApiQuery += ". The format of the JSON is the following: TITLE = Song title, ARTIST = Main artist associated with the song.";
  chatgptApiQuery += ".";
  console.log("USER QUERY:", chatgptApiQuery);
  generateSongSuggestion();
  displayResultsScreen();
}

// Checks current active screen and directs user to the correct pages
function backButtonCheck() {
  if (queryEl.style.display === "block") {
    displayHomeScreen();
  } else {
    displayQueryScreen();
  }
}

function nextButtonCheck() {
  if (queryEl.style.display === "block") {
    submitQuery();
  } else {
    submitSelectedAttributes();
  }
}

// https://codepen.io/team/Orbis/pen/OaXreJ 

$(document).on(
  "keyup",
  ".chip.chip-checkbox, .chip.toggle, .chip.clickable",
 
  function (e) {
    if (e.which == 13 || e.which == 32) this.click();
  }
);

$(document).on("click", ".chip button", function (e) {
  e.stopPropagation();
});

$(document).on("click", ".chip.chip-checkbox", function () {
  var $this = $(this);
  var $option = $this.find("input");
 
if ($option.is(":radio")) {
  var $others = $("input[name=" + $option.attr("name") + "]").not($option);
  $others.prop("checked", false);
  $others.change();
}
  
  $option.prop("checked", !$this.hasClass("active"));
  $option.change();
  console.log("true");
});

$(document).on("click", ".chip.toggle", function () {
  $(this).toggleClass("active");
});

$(document).on("change", ".chip.chip-checkbox input", function () {
  var $chip = $(this).parent(".chip");
  $chip.toggleClass("active", this.checked);
  $chip.attr("aria-checked", this.checked ? "true" : "false");
});

goHome();

tuneMuseLogoButton.addEventListener("click", goHome);
songsDiscoveredButton.addEventListener("click", displayHistoryScreen);
discoverButton.addEventListener("click", displayQueryScreen);
newRequestButton.addEventListener("click", displayQueryScreen);
backButton.addEventListener("click", backButtonCheck);
nextButton.addEventListener("click", nextButtonCheck);
newRequestResultsButton.addEventListener("click", displayQueryScreen);
newRequestHistoryButton.addEventListener("click", displayQueryScreen);