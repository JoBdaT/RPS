'use strict';

//GLOBAL VARIABLES

//DOM MANIPULATING VARS
var nameForm = document.getElementById('name-form');
var nameScreen = document.getElementById('name-screen');
var roundsScreen = document.getElementById('rounds-screen');
var gameScreen = document.getElementById('main-game-screen');
var roundsButton = document.getElementById('roundsform');

//EVENT LISTENERS
nameForm.addEventListener('submit', displayRounds);
nameForm.addEventListener('submit', checkUserData);
roundsButton.addEventListener('submit', displayGameScreen);

//PLAYER OBJECT
var playerObject = {};

//PLAYER CONSTRUCTOR
function Player (playerName) {
  this.playerName = playerName;
  this.roundsChosen = 0;
  this.roundsWon = 0;
  this.roundsLost = 0;
  this.bestOf3Wins = 0;
  this.bestOf5Wins = 0;
  this.bestOf7Wins = 0;
  this.totalGamesPlayed = 0;
  this.totalGamesWon = 0;
  this.settings = [];
}

//FUNCTION TO DISPLAY ROUNDS
function displayRounds(event) {
  event.preventDefault();
  hide(nameScreen);
  show(roundsScreen);
}

function displayGameScreen(event) {
  event.preventDefault();
  hide(roundsScreen);
  show(gameScreen);
  playerObject.roundsChosen = parseInt(event.target.roundValue.value);
  console.log('playerObject: ', playerObject);
}

//function to hide
function hide(elem){
  elem.style.display = 'none';
}

//function to show
function show(elem){
  elem.style.display = 'block';
}



//FUNCTION TO CHECK FOR USER DATA
function checkUserData(event) {
  event.preventDefault();
  var playerName = event.target.nameInput.value;
  if (localStorage.getItem(playerName)) {
    var getName = JSON.parse(localStorage.getItem(playerName));
    playerObject = getName;
  } else {
    playerObject = new Player(playerName);
  } console.log('player object is ',playerObject);
}
//FUNCTION TO CREATE CONSTRUCTOR OBJECT
