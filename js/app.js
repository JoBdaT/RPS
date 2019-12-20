/* eslint-disable no-undef */
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
var nextRoundPlayAgainButton = document.getElementById('next-round-button');
var uiScreen = document.getElementById('ui-screen');
var playerNameUI = document.getElementById('playerNameUI');
var cpuNameUI = document.getElementById('cpuNameUI');
var roundUICount = document.getElementById('uiRounds');
var winLossUICount = document.getElementById('uiWinLoss');
var testVictory = document.getElementById('test-victory');

//EVENT LISTENERS
nameForm.addEventListener('submit', displayRounds);
nameForm.addEventListener('submit', checkUserData);
roundsButton.addEventListener('submit', displayGameScreen);
weaponButtonOne.addEventListener('click', fight);
weaponButtonTwo.addEventListener('click', fight);
weaponButtonThree.addEventListener('click', fight);
nextRoundPlayAgainButton.addEventListener('click', handleNextRound);
uiScreen.addEventListener('click', displayGameScreen);

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
  this.countRound = 0;
  this.countWin = 0;
  this.countLoss = 0;
  this.countTie = 0;
}

// =================================================== //
// vv ====== UI ====== vv //

function popNames() {
  playerNameUI.textContent = `${playerObject.playerName}`;
  cpuNameUI.textContent = 'VS the CPU';
}

function popUI() {
  roundUICount.textContent = `Round ${playerObject.countRound} of ${playerObject.roundsChosen}`;
}

function popWinsLossTies () {
  winLossUICount.textContent = `${playerObject.countWin} Wins & ${playerObject.countLoss} Losses & ${playerObject.countTie} Ties`;
}

// ^^ ====== UI ====== ^^ //
// =================================================== //

// =================================================== //
// vv ====== NAME SCREEN ====== vv //

//FUNCTION TO CHECK FOR USER DATA
function checkUserData(event) {
  event.preventDefault();
  var userNameInput = event.target.nameInput.value;

  if (localStorage.getItem('playerArray')) {
    playerArray = JSON.parse(localStorage.getItem('playerArray'));

    for (var i = 0; i < playerArray.length; i++) {
      if (userNameInput === playerArray[i].playerName) {
        playerObject = playerArray[i];
      }
    }
  }

  if (isEmpty(playerObject)) {
    playerObject = new Player(userNameInput);
  }
}

//FUNCTION TO DISPLAY ROUNDS
function displayRounds(event) {
  event.preventDefault();
  hide(nameScreen);
  show(roundsScreen);
}

// ^^ ====== NAME SCREEN ====== ^^  //
// =================================================== //


// =================================================== //
// vv ====== ROUNDS SCREEN ====== vv //

//FUNCTION TO POPULATE ROUND VALUE, ADD TO PLAYER OBJECT FOR ROUND END CHECKS
function roundCounter (roundsChosen) {
  playerObject.roundsChosen = roundsChosen;

  switch (roundsChosen) {
  case 3:
    playerObject.roundsWon = 2;
    playerObject.roundsLost = 2;
    playerObject.countWin = 0;
    playerObject.countLoss = 0;
    playerObject.countRound = 1;
    playerObject.countTie = 0;
    break;
  case 5:
    playerObject.roundsWon = 3;
    playerObject.roundsLost = 3;
    playerObject.countWin = 0;
    playerObject.countLoss = 0;
    playerObject.countRound = 1;
    playerObject.countTie = 0;
    break;
  case 7:
    playerObject.roundsWon = 4;
    playerObject.roundsLost = 4;
    playerObject.countWin = 0;
    playerObject.countLoss = 0;
    playerObject.countRound = 1;
    playerObject.countTie = 0;
    break;
  }
}

// STORES PLAYER DATA INTO LOCAL STORAGE
function storePlayerInitial() {

  var found = true;
  for (var i = 0; i < playerArray.length; i++) {
    if (playerArray[i].playerName === playerObject.playerName) {
      found = false;
      break;
    }
  }

  // this part should only fire if player input name does NOT already exist in storage
  if (found) {
    playerArray.push(playerObject);
  }

  localStorage.setItem('playerArray', JSON.stringify(playerArray));
}

function storePlayerPostMatch() {
  localStorage.setItem('playerArray', JSON.stringify(playerArray));
}

//FUNCTION TO DISPLAY GAME SCREEN
//fires on NEXT BUTTON on ROUNDS screen
function displayGameScreen(event) {

  event.preventDefault();
  hide(roundsScreen);
  show(gameScreen);
  show(uiScreen);
  // adding Remove Event Listener to address bug where game screen duped when you click the score
  uiScreen.removeEventListener('click', displayGameScreen);
  var roundsChosen = parseInt(event.target.roundValue.value);

  roundCounter(roundsChosen);
  popNames();
  popUI();
  popWinsLossTies();
  storePlayerInitial();
}

// ^^ ====== ROUNDS SCREEN ====== ^^ //
// =================================================== //




// =================================================== //
// vv ====== GAME SCREEN ====== vv //

function fight(event){
  event.preventDefault();
  var cpuWeapon = cpuChoice();
  var userWeapon = event.target.value;
  hide(gameScreen);
  show(animationScreen);
  var winner = compareWeapons(cpuWeapon, userWeapon);
  declareWinner(userWeapon, cpuWeapon, winner);
  draw(userWeapon, cpuWeapon);
  if (playerObject.roundsWon === 0 || playerObject.roundsLost === 0) {
    incrementWinsData();
    storePlayerPostMatch();
    nextRoundPlayAgainButton.textContent = 'Play Again';
  }
  window.setTimeout(displayVictoryScreen, 2500);
}


function declareWinner (userWeapon, cpuWeapon, winner) {
  if (winner === 'tie') {
    // animate tie
    testVictory.textContent = 'tie';
    playerObject.countTie++;
  } else if (userWeapon === winner) {
    // animate userWeapon victory
    testVictory.textContent = 'User Wins';
    playerObject.roundsWon--;
    playerObject.countWin++;
    playerObject.countRound++;
  } else {
    // animate cpuWeapon victory
    testVictory.textContent = 'CPU Wins';
    playerObject.roundsLost--;
    playerObject.countLoss++;
    playerObject.countRound++;
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

function displayVictoryScreen(){
  hide(animationScreen);
  show(victoryScreen);
  popWinsLossTies();
}

// ^^ ====== GAME SCREEN ====== ^^ //
// =================================================== //

// =================================================== //
// vv ====== ANIMATION SCREEN ====== vv //

function draw(userWeapon, cpuWeapon) {
  var stage = new createjs.Stage('canvas');

  stage.autoClear = true;
  stage.clear();

  var userRock = new createjs.Bitmap('images/rock2.png');
  userRock.scaleX = 0.15;
  userRock.scaleY = 0.15;
  var cpuRock = new createjs.Bitmap('images/rock2.png');
  cpuRock.scaleX = 0.15;
  cpuRock.scaleY = 0.15;
  var userPaper = new createjs.Bitmap('images/paper2.png');
  userPaper.scaleX = 0.15;
  userPaper.scaleY = 0.15;
  var cpuPaper = new createjs.Bitmap('images/paper2.png');
  cpuPaper.scaleX = 0.15;
  cpuPaper.scaleY = 0.15;
  var userScissors = new createjs.Bitmap('images/scissors2.png');
  userScissors.scaleX = 0.15;
  userScissors.scaleY = 0.20;
  var cpuScissors = new createjs.Bitmap('images/scissors2.png');
  cpuScissors.scaleX = 0.15;
  cpuScissors.scaleY = 0.20;


  if (userWeapon === 'rock') {
    userRock.x = 50;
    userRock.y = 150;
    stage.addChild(userRock);

    if (cpuWeapon === 'rock') {
      cpuRock.x = 375;
      cpuRock.y = 150;
      stage.addChild(cpuRock);

      // userRock animation against cpuRock
      createjs.Tween.get(userRock, { loop: false })
        .to({ x: 160 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      // cpuRock animation against userRock
      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 265 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 400;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userRock, { loop: false })
        .to({x: 160 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({x: -50, y: -50}, 300, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 200);

      createjs.Tween.get(cpuPaper, { loop: false })
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 400;
      cpuScissors.y = 130;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userRock, { loop: false })
        .to({ x: 160 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 160 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 220 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 260 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 270 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 270 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 500, y: -50}, 400, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

  }
  if (userWeapon === 'paper') {
    userPaper.x = 50;
    userPaper.y = 140;
    stage.addChild(userPaper);

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 400;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 175 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuPaper, { loop: false })
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);
    }

    if (cpuWeapon === 'rock') {
      cpuRock.x = 400;
      cpuRock.y = 150;
      stage.addChild(cpuRock);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 175 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 275 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 600, y: -50}, 100, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 100);
    }

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 400;
      cpuScissors.y = 130;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 175 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4)) // 1
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4)) // 2 swing
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4)) // 3
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4)) // 4 swing
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4)) // 5
        .to({ x: -50, y: -50 }, 50, createjs.Ease.getPowInOut(4)) //
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 275 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4)) // 1
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4)) // 2 swing
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4)) // 3
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4)) // 4 swing
        .to({ x: 285 }, 50, createjs.Ease.getPowInOut(4)) // 5
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4)) // 6 // hit away
        .to({ x: 220 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 400);

    }


  }
  if (userWeapon === 'scissors') {
    userScissors.x = 50;
    userScissors.y = 130;
    stage.addChild(userScissors);

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 400;
      cpuScissors.y = 130;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 165 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 155 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 155 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 265 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 275 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);

    }

    if (cpuWeapon === 'rock') {
      cpuRock.x = 400;
      cpuRock.y = 140;
      stage.addChild(cpuRock);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 175 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 165 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 175 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: -50, y: -50 }, 400, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 100);

      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 255 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 255 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 265 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 255 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 180 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 400;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 195 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 185 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 195 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 185 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 195 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 185 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4)) // win
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuPaper, { loop: false })
        .to({ x: 260 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 270 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 270 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 270 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 600, y: -50 }, 400, createjs.Ease.getPowInOut(4)) // fly away
        .to({ alpha: 0 }, 50);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);

    }

  }

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener('tick', stage);

}

// ^^ ====== ANIMATION SCREEN ====== ^^ //
// =================================================== //


// =================================================== //
// vv ====== VICTORY SCREEN ====== vv //

// Function to determine the round end
function handleNextRound() {
  if (playerObject.roundsWon === 0 || playerObject.roundsLost === 0) {
    playAgain();
  } else {
    nextRound();

  }
}

function incrementWinsData () {
  if(playerObject.roundsWon === 0) {
    playerObject.totalGamesWon++;
    if (playerObject.roundsChosen === 3) {
      playerObject.bestOf3Wins++;
    } else if (playerObject.roundsChosen === 5) {
      playerObject.bestOf5Wins++;
    } else {
      playerObject.bestOf7Wins++;
    }
  }
  playerObject.totalGamesPlayed++;
}

function playAgain () {
  nextRoundPlayAgainButton.textContent = 'Next Round';
  hide(victoryScreen);
  hide(uiScreen);
  show(roundsScreen);
  popUI();

}

function nextRound() {
  hide(victoryScreen);
  show(gameScreen);
  popUI();
}

// ^^ ====== VICTORY SCREEN ====== ^^ //
// =================================================== //



// =================================================== //
// vv ====== HELPER FUNCTIONS ====== vv //
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

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
// ^^ ====== HELPER FUNCTIONS ====== ^^ //
// =================================================== //


