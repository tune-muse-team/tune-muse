// TODO: Figure out what information needs to be stored in localStorage (for info on discovered songs and info on the current request as the user goes back and forth between different screens)

// Store button elements in variables
// TODO: Replace element names with the ones in HTML file
// TODO: Check if other buttons will be used and for what
var tuneMuseLogoButton = document.getElementById("tune-muse-logo");
var songsDiscoveredButton = document.getElementById("songs-discovered-button");
var discoverButton = document.getElementById("discover-button");
var newRequestButton = document.getElementById("new-request-button");
var backButton = document.getElementById("back-button");
var nextButton = document.getElementById("next-button");
// var newRequestResultsButton = document.getElementById("new-request-results-button");

// Store elements for each different screen
// TODO: Replace element names with the ones in HTML file
var homeEl = document.getElementById("home-screen");
var queryEl = document.getElementById("query-screen");
var tuningEl = document.getElementById("tuning-screen");
var resultsEl = document.getElementById("results-screen");
var historyEl = document.getElementById("history-screen");
var stepperEl = document.getElementById("stepper");
var bottomControlsEl = document.getElementById("bottom-controls");

// TODO: Declare other global variables
var discoveredHistory = [];

// Switch between each different screen
// TODO: Replace display types with the ones in HTML file

function populateHistoryScreen() {
  // TODO: Populate Home screen with discovered songs, adding a div for each song
}

function populateResultsScreen() {
  // TODO: Populate Results screen with query result (add values to relevant elements)
}

function displayHomeScreen() {
  console.log("Displaying Home screen...");
  homeEl.style.display = "block";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  tuningEl.style.display = "none";
  resultsEl.style.display = "none";
  stepperEl.style.display = "none";
  bottomControlsEl.style.display = "none";
}

function displayHistoryScreen() {
  console.log("Displaying History screen...");
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
  // TODO: Add if statement checking localStorage for history. If yes, displayHistoryScreen. If not, displayHomeScreen
  if (localStorage.hasOwnProperty("discovered-history")) {
    discoveredHistory = localStorage.getItem("discovered-history").split(",");
    displayHistoryScreen();
  } else {
    displayHomeScreen();
  }
}

function displayQueryScreen() {
  console.log("Displaying Query screen...");
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "block";
  tuningEl.style.display = "none";
  resultsEl.style.display = "none";
  stepperEl.style.display = "flex";
  bottomControlsEl.style.display = "flex";
}

function displayTuningScreen() {
  console.log("Displaying Tuning screen...");
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  tuningEl.style.display = "block";
  resultsEl.style.display = "none";
  stepperEl.style.display = "flex";
  bottomControlsEl.style.display = "flex";
}

function displayResultsScreen() {
  console.log("Displaying Results screen...");
  populateResultsScreen();
  homeEl.style.display = "none";
  historyEl.style.display = "none";
  queryEl.style.display = "none";
  tuningEl.style.display = "none";
  resultsEl.style.display = "block";
  stepperEl.style.display = "none";
  bottomControlsEl.style.display = "none";
}

function submitQuery() {
  // TODO: Replace form element name with the one in HTML file
  // TODO: Submit query to ChatGPt API
  displayTuningScreen();
}

function submitSelectedAttributes() {
  // TODO: Figure out how attributes will be selected and submitted
  displayResultsScreen();
}

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

goHome();

// TODO: Add event listeners to buttons
tuneMuseLogoButton.addEventListener("click", goHome);
songsDiscoveredButton.addEventListener("click", displayHistoryScreen);
discoverButton.addEventListener("click", displayQueryScreen);
newRequestButton.addEventListener("click", displayQueryScreen);
backButton.addEventListener("click", backButtonCheck);
nextButton.addEventListener("click", nextButtonCheck);
// newRequestResultsButton.addEventListener("click", displayQueryScreen);