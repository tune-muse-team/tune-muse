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
var discoveredHistory = [];

// Switch between each different screen
function populateHistoryScreen() {
  // TODO: Populate Home screen with discovered songs, adding a div for each song
}

function populateResultsScreen() {
  // TODO: Populate Results screen with query result (add values to relevant elements)
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
  if (localStorage.hasOwnProperty("discovered-history")) {
    discoveredHistory = localStorage.getItem("discovered-history").split(",");
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

goHome();

tuneMuseLogoButton.addEventListener("click", goHome);
songsDiscoveredButton.addEventListener("click", displayHistoryScreen);
discoverButton.addEventListener("click", displayQueryScreen);
newRequestButton.addEventListener("click", displayQueryScreen);
backButton.addEventListener("click", backButtonCheck);
nextButton.addEventListener("click", nextButtonCheck);
newRequestResultsButton.addEventListener("click", displayQueryScreen);





