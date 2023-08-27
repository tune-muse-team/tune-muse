// TODO: Figure out what information needs to be stored in localStorage (for info on discovered songs and info on the current request as the user goes back and forth between different screens)

// Store button elements in variables
var tuneMuseLogoButton = document.getElementById("tune-muse-logo");
var songsDiscoveredButton = document.getElementById("songs-discovered-button");
var discoverButton = document.getElementById("discover-button");
var newRequestButton = document.getElementById("new-request-button");
var backButton = document.getElementById("back-button");
var nextButton = document.getElementById("next-button");
var newRequestResultsButton = document.getElementById("new-request-results-button");

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
var discoveredAlbumHistory = [];
var discoveredCoverHistory = [];
var resultImage;
var resultTitle;
var resultArtist;
var resultAlbum;
var userQuery = "";
var suggestedArtist = "";
var suggestedSong = "";
// var chatgptApiQuery = "Provide a single song name title and artist with no further comments ; the user cue is : ";
var chatgptApiQuery = 'Provide a song in the format "SONG NAME" by ARTIST NAME and no further comments; the user cue is : ';
var chatgptApiUrl = "https://api.openai.com/v1/chat/completions";
var AK1 = "sk-Sco";
var AK2 = "ZaL";
var AK3 = "TQMx";
var AK4 = "kjSb2";
var AK5 = "CB9oNT3Blbk";
var AK6 = "FJANRiYPnFM9i";
var AK7 = "djpvjZsoj";
var spotifyCliId = "3726bd533631461898be92f9cc7dd798"; 
var spotifyCliSecId = "1afad6d3393e4a30b1e66be71094c41f"; 

function getLocalStorage() {
  if (localStorage.hasOwnProperty("discovered-songs")) {
    discoveredSongHistory = localStorage.getItem("discovered-songs").split(",");
    discoveredArtistHistory = localStorage.getItem("discovered-artists").split(",");
    discoveredAlbumHistory = localStorage.getItem("discovered-albums").split(",");
    discoveredCoverHistory = localStorage.getItem("discovered-covers").split(",");  
  }
}

// Switch between each different screen
function populateHistoryScreen() {
  var newHistoryItem;
  getLocalStorage();
  document.getElementById("history-list").innerHTML = "";
  for (i = 0; i < discoveredSongHistory.length; i++) {
    newHistoryItem = document.createElement("div");
    newHistoryItem.innerHTML = '<div class="history-card"> <div class="history-image-area"> <img src="' + discoveredCoverHistory[i] + '" class="history-item-image" alt="An image presenting a song"> </div> <div class="history-content-area"> <div class="history-text-area"> <h2 class="history-item-title" class="app-introduction-paragraph">' + discoveredSongHistory[i] + '</h2> <br> <p class="history-item-artist">' + discoveredArtistHistory[i] + '</p> <p class="history-item-album">' + discoveredAlbumHistory[i] + '</p> </div> <div class="history-logo-area"> <img src="./assets/images/AppleMusic.svg" class="history-item-logo-apple-music" alt="An image presenting the Apple Music Logo"> <img src="./assets/images/Spotify.svg" class="history-item-logo-spotify" alt="An image presenting the Spotify Logo"> </div> </div> </div> <br>';
    document.getElementById("history-list").appendChild(newHistoryItem);
  }
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
  tuningEl.style.display = "block";
  resultsEl.style.display = "none";
  stepperEl.style.display = "flex";
  bottomControlsEl.style.display = "flex";
}

function displayResultsScreen() {
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
  discoveredSongHistory.push(resultTitle);
  discoveredArtistHistory.push(resultArtist);
  discoveredAlbumHistory.push(resultAlbum);
  discoveredCoverHistory.push(resultImage);
  localStorage.setItem("discovered-songs", discoveredSongHistory);
  localStorage.setItem("discovered-artists", discoveredArtistHistory);
  localStorage.setItem("discovered-albums", discoveredAlbumHistory);
  localStorage.setItem("discovered-covers", discoveredCoverHistory);
}

/*
var pullSpotifyData = async () => {
      var SearchRes = await fetch("https://api.spotify.com/v1/search?q=" + suggestedArtist + "+track:" + suggestedSong + "&type=track", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + AccessToken
        }});
      // The following code gets permission (access Key to connect to spotify)
      var Token = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " + btoa(spotifyCliId + ":" + spotifyCliSecId)},
        body: "grant_type=client_credentials"
        });
      console.log("Artist:", suggestedArtist);
      console.log("Song:", suggestedSong);
      // Variables for access to the spotify API
      var TokINFO = await Token.json();
      var AccessToken = TokINFO.access_token;
      console.log(AccessToken);
      var search = await SearchRes.json();
      var songs = search.tracks.items;
      var songdisplay = songs[0];
      // console.log(songs);
      resultImageEl = document.getElementById("search-result-image");
      resultTitleEl = document.getElementById("search-result-title");
      resultArtistEl = document.getElementById("search-result-artist");
      resultAlbumEl = document.getElementById("search-result-album");
      // TODO: add line resultImageEl.src = [Spotify API generated image]
      resultTitleEl.innerHTML = songdisplay.name;
      resultArtistEl.innerHTML = songdisplay.artists.map(artist => artist.name).join(", ");
      // TODO: add line resultAlbumEl.innerHTML = [Spotify API generated album name]
      // TODO: add play button (iframe?)
      updateDiscoveredHistory();
};
*/

/*
// TODO: Remove this function and replace with the one above when you get it to work
function pullSpotifyData() {
  resultImage = "./assets/images/searchResultImage.jpeg";
  resultTitle = suggestedSong;
  resultArtist = suggestedArtist;
  resultAlbum = "Test Album";
  resultImageEl = document.getElementById("search-result-image");
  resultTitleEl = document.getElementById("search-result-title");
  resultArtistEl = document.getElementById("search-result-artist");
  resultAlbumEl = document.getElementById("search-result-album");
  resultImageEl.src = resultImage;
  resultTitleEl.innerHTML = resultTitle;
  resultArtistEl.innerHTML = resultArtist;
  resultAlbumEl.innerHTML = resultAlbum;
  updateDiscoveredHistory();
}
*/

async function pullSpotifyData() {
  // TODO: Clean up code, standardize function/variable names
  var CLI_ID = "95dac2ec667f4f81b55f7a7ffe19070f";
  var SEC_ID = "1ac2264050d94b0ca2b1367722c36ef1";
  API_link = 'https://accounts.spotify.com/api/token';
  Spotify_Search_Endpoint = 'https://api.spotify.com/v1/search?q=';
  // TODO: Remove the line below after integration with current HTML is complete
  var spotiOUTPUT = document.getElementById("SPOTRESU"); //Just for the Output

  // Reference https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow chagned buffer to btoa since it is running on web Javascript
 
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (btoa(CLI_ID + ':' + SEC_ID).toString('base64'))
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
  function SpotifyPRINTSONG(track) {
  spotiOUTPUT.innerHTML = '<DISPLAY_TRACK class="result-item">' +
    '<h1>' + track.artists.map(function (artist) {
    return artist.name;
    }).join(", ") + '</h1>' +
    '<h1>' + track.name + '</h1>' +
    '<iframe src="https://open.spotify.com/embed/track/' + track.id + '" width=500 height=500 allow="encrypted-media">' +
    '</DISPLAY_TRACK>';
  }

  // Function to handle the Spotify search
  async function searchSpotify() {
    var SONGTITLE = suggestedSong;
    var KeyToken = await Token();
    var track = await SONGSEARCH(suggestedArtist, SONGTITLE, KeyToken);
    SpotifyPRINTSONG(track);
  }
    
  async function Token() {
    var response = await fetch(API_link, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(CLI_ID + ":" + SEC_ID)
        },
        body: "grant_type=client_credentials"
    });

    var data = await response.json();
    return data.access_token;
  }

  var SONGSEARCH = async function (MUSICEAN, SONG, Token) {
      var response = await fetch(Spotify_Search_Endpoint + MUSICEAN + "+track:" + SONG + "&type=track", {
          headers: {
            "Authorization": "Bearer " + Token
          }
      });
      var search = await response.json();
      return search.tracks.items[0]
  }

  searchSpotify();
}

// https://www.builder.io/blog/stream-ai-javascript

var generateSongSuggestion = async () => {

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
    var queryResponse = data.choices[0].message.content;
    var parsingSong = true;
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
    console.log("CHATGPT RESPONSE:", data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    console.log("Error occurred while generating.");
  }
  pullSpotifyData();
};


function submitQuery() {
  userQuery = document.getElementById("current-user-wish").value;
  if (userQuery === "") {
    document.getElementById("query-error").style.display = "block";
  } else {
    chatgptApiQuery += userQuery + " ; the song must match the following styles : ";
    displayTuningScreen();
  }
}

function submitSelectedAttributes() {
  var checkedStyles = document.getElementsByClassName("music-style active");
  for (i = 0; i < checkedStyles.length; i++) {
    chatgptApiQuery += checkedStyles[i].children[2].innerHTML;
    if (i !== checkedStyles.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
  chatgptApiQuery += " ; the song must match the following moods : ";
  var checkedMoods = document.getElementsByClassName("music-mood active");
  for (i = 0; i < checkedMoods.length; i++) {
    chatgptApiQuery += checkedMoods[i].children[2].innerHTML;
    if (i !== checkedMoods.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
  chatgptApiQuery += " ; the song must match the following themes : ";
  var checkedThemes = document.getElementsByClassName("music-theme active");
  for (i = 0; i < checkedThemes.length; i++) {
    chatgptApiQuery += checkedThemes[i].children[2].innerHTML;
    if (i !== checkedThemes.length - 1) {
      chatgptApiQuery += ", ";
    }
  }
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
  let $this = $(this);
  let $option = $this.find("input");
 
if ($option.is(":radio")) {
  let $others = $("input[name=" + $option.attr("name") + "]").not($option);
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
  let $chip = $(this).parent(".chip");
  $chip.toggleClass("active", this.checked);
  $chip.attr("aria-checked", this.checked ? "true" : "false");
});

/*
$("#addFilterBtn").click(function () {
  let $txt = $("#addFilterTxt");
  let filter = $txt.val();
  $txt.val("");
  $(`
          <div class = "chip" tabindex = "-1">
            <span>
              ${filter}
            </span>
            <button title="Remove chip" aria-label="Remove chip" type = "button" onclick = "$(this).parent().remove()">
              <i class = "material-icons">cancel</i>
            </button>
          </div>`).appendTo("#filterChipsContainer");
});
*/

goHome();

tuneMuseLogoButton.addEventListener("click", goHome);
songsDiscoveredButton.addEventListener("click", displayHistoryScreen);
discoverButton.addEventListener("click", displayQueryScreen);
newRequestButton.addEventListener("click", displayQueryScreen);
backButton.addEventListener("click", backButtonCheck);
nextButton.addEventListener("click", nextButtonCheck);
newRequestResultsButton.addEventListener("click", displayQueryScreen);