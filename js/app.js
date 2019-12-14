'use strict';

//GLOBAL VARIABLES
var playerArray = [];
var weaponArray = ['rock', 'paper', 'scissors'];

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

//FUNCTION TO DISPLAY GAME SCREEN
function displayGameScreen(event) {
  event.preventDefault();
  hide(roundsScreen);
  show(gameScreen);
  var roundsChosen = parseInt(event.target.roundValue.value);
  roundCounter(roundsChosen);
  // console.log('playerObject: ', playerObject);
  storePlayer();
}

//FN to populate round value
function roundCounter (roundsChosen) {
  playerObject.roundsChosen = roundsChosen;

  switch (roundsChosen) {
    case 3:
      playerObject.roundsWon = 2;
      playerObject.roundsLost = 2;
      break;
    case 5:
      playerObject.roundsWon = 3;
      playerObject.roundsLost = 3;
      break;
    case 7:
      playerObject.roundsWon = 4;
      playerObject.roundsLost = 4;
      break;  


  }
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
  var cpuWeapon = cpuChoice();
  var userWeapon = event.target.value;
  console.log('userWeapon :' ,userWeapon);
  console.log('cpuWeapon :' , cpuWeapon);
  hide(gameScreen);
  show(animationScreen);
  var winner = compareWeapons(cpuWeapon, userWeapon);
  declareWinner(userWeapon, cpuWeapon, winner);
  window.setTimeout(displayVictoryScreen, 1000);
  console.log('winner: ', winner);
}

var testVictory = document.getElementById('test-victory');

function declareWinner (userWeapon, cpuWeapon, winner) {
  if (winner === 'tie') {
    // animate tie
    testVictory.textContent = 'tie';
  } else if (userWeapon === winner) {
    // decrement wins in object
    // animate userWeapon victory
    testVictory.textContent = 'User Wins';
    playerObject.roundsWon--;
  } else {
    // decrement loses in object
    // animate cpuWeapon victory
    testVictory.textContent = 'CPU Wins';
    playerObject.roundsLost--;
  }

}

function cpuChoice () {
  var randomWeaponIndex = randomIndex(weaponArray.length);
  var randomWeapon = weaponArray[randomWeaponIndex];
  return randomWeapon;
}

// compare choices, maybe use Switch statement later?
function compareWeapons (weaponX, weaponY) {
  if ((weaponX === 'rock' && weaponY === 'paper')
  || (weaponY === 'rock' && weaponX === 'paper') ) {
    return 'paper';
  }
  if ((weaponX === 'rock' && weaponY === 'scissors')
  || (weaponY === 'rock' && weaponX === 'scissors') ) {
    return 'rock';
  }
  if ((weaponX === 'scissors' && weaponY === 'paper')
  || (weaponY === 'scissors' && weaponX === 'paper') ) {
    return 'scissors';
  }
  if ((weaponX === 'rock' && weaponY === 'rock')
  || (weaponX === 'paper' && weaponY === 'paper')
  || (weaponX === 'scissors' && weaponY === 'scissors')) {
    return 'tie';
  }
}

function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
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


