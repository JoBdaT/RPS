'use strict';

//GLOBAL VARIABLES
var playerArray = [];

//DOM MANIPULATING VARS
var nameForm = document.getElementById('name-form');
var nameScreen = document.getElementById('name-screen');
var roundsScreen = document.getElementById('rounds-screen');
var gameScreen = document.getElementById('main-game-screen');
var animationScreen = document.getElementById('animation-screen');
var victoryScreen = document.getElementById('victory-screen');
var roundsButton = document.getElementById('roundsform');
var weaponButtonOne = document.getElementById('weaponButtonOne');
var weaponButtonTwo = document.getElementById('weaponButtonTwo');
var weaponButtonThree = document.getElementById('weaponButtonThree');

//EVENT LISTENERS
nameForm.addEventListener('submit', displayRounds);
nameForm.addEventListener('submit', checkUserData);
roundsButton.addEventListener('submit', displayGameScreen);
weaponButtonOne.addEventListener('click', fight);
weaponButtonTwo.addEventListener('click', fight);
weaponButtonThree.addEventListener('click', fight);


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
  // console.log('playerObject: ', playerObject);
  storePlayer();
}

function displayVictoryScreen(){
  hide(animationScreen);
  show(victoryScreen);
}


function storePlayer() {
// add array.splice to update playerObject in playerArray

  console.log('playerArray before storage: ', playerArray);

  var found = true;
  for (var i = 0; i < playerArray.length; i++) {
    if (playerArray[i].playerName === playerObject.playerName) {
      found = false;
      break;
    }
  }

  if (found) {
    playerArray.push(playerObject);
  }

  localStorage.setItem('playerArray', JSON.stringify(playerArray));
  console.log('playerArray after storage: ', playerArray);

}
function fight(event){
  event.preventDefault();
  hide(gameScreen);
  show(animationScreen);
  window.setTimeout(displayVictoryScreen, 3000);
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
  var userNameInput = event.target.nameInput.value;
  playerObject = new Player(userNameInput);
  // console.log('player object is ',playerObject);

  if (localStorage.getItem('playerArray')) {
    var getArray = JSON.parse(localStorage.getItem('playerArray'));
    playerArray = getArray;
    for (var i = 0; i < playerArray.length; i++) {
      if (userNameInput === playerArray[i].playerName) {
        playerObject === playerArray[i];
      }
    }
  }
  // console.log('player object is ',playerObject);
}

//FUNCTION TO CREATE CONSTRUCTOR OBJECT
