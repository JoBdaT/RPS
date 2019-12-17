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
var roundUICount = document.getElementById('uiRoundsCount');
var winLossUICount = document.getElementById('uiWinLossCount');


//EVENT LISTENERS
nameForm.addEventListener('submit', displayRounds);
nameForm.addEventListener('submit', checkUserData);
// 1
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
}

// =================================================== //
// vv ====== UI ====== vv //

function popNames() {
  playerNameUI.textContent = `${playerObject.playerName}`;
  cpuNameUI.textContent = 'CPU Enemy!';
}

function popUI() {
  roundUICount.textContent = 'roundtest';
  winLossUICount.textContent = 'winlosstest';
}



// vv ====== UI ====== vv //
// =================================================== //

// =================================================== //
// vv ====== NAME SCREEN ====== vv //

//FUNCTION TO CHECK FOR USER DATA
function checkUserData(event) {
  event.preventDefault();
  var userNameInput = event.target.nameInput.value;
  console.log('userNameInput: ', userNameInput);
  // playerObject = new Player(userNameInput);
  // console.log('player object is ',playerObject);

  if (localStorage.getItem('playerArray')) {
    console.log('playerArray exists');
    playerArray = JSON.parse(localStorage.getItem('playerArray'));
    console.log('playerArray:', playerArray);

    for (var i = 0; i < playerArray.length; i++) {
      if (userNameInput === playerArray[i].playerName) {
        console.log('playerObject before reassign:', playerObject);
        console.log('playerArray[i]:', playerArray[i]);
        playerObject = playerArray[i];
        console.log('playerObject after reassign:', playerObject);
      }
    }
  }

  if (isEmpty(playerObject)) {
    console.log('Creating new player');
    playerObject = new Player(userNameInput);
  }
  // console.log('player object is ',playerObject);
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

//FUNCTION TO POPULATE ROUND VALUE, ADD TO PLAYER OBJECT FOR ROUNDEND CHECKS
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

// STORES PLAYER DATA INTO LOCAL STORAGE
function storePlayerInitial() {
  // add array.splice to update playerObject in playerArray
  console.log('playerArray before storage: ', playerArray.length);

  var found = true;
  for (var i = 0; i < playerArray.length; i++) {
    if (playerArray[i].playerName === playerObject.playerName) {
      found = false;
      // console.log('Inside loop for player array length');
      break;
    }
  }

  // this part should only fire if player input name does NOT already exist in storage
  if (found) {
    playerArray.push(playerObject);
    console.log('object pushed to array');
  }

  localStorage.setItem('playerArray', JSON.stringify(playerArray));
  console.log('playerArray after storage: ', playerArray);
}

function storePlayerPostMatch() {
  // for (var i = 0; i < playerArray.length; i++) {
  //   if (playerObject.playerName === playerArray[i].playerName) {
  //     playerArray.splice(i, 1, playerObject);
  //     break;
  //   }
  // }
  localStorage.setItem('playerArray', JSON.stringify(playerArray));
}

//FUNCTION TO DISPLAY GAME SCREEN
//fires on NEXT BUTTON on ROUNDS screen
function displayGameScreen(event) {
  // console.log('You chose rounds and hit next');
  // console.log('playerArray Data inside display game screen before hide', playerArray);

  event.preventDefault();
  hide(roundsScreen);
  show(gameScreen);
  show(uiScreen);
  popNames();
  var roundsChosen = parseInt(event.target.roundValue.value);
  // console.log('playerArray Data inside display game screen before rounds', playerArray);

  roundCounter(roundsChosen);
  // console.log('playerObject: ', playerObject);
  // console.log('playerArray Data inside display game screen', playerArray);
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
  console.log('userWeapon :' ,userWeapon);
  console.log('cpuWeapon :' , cpuWeapon);
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
  console.log('winner: ', winner);
}

var testVictory = document.getElementById('test-victory');


// get rid of this function and incorporate the display into draw()
function declareWinner (userWeapon, cpuWeapon, winner) {
  if (winner === 'tie') {
    // animate tie
    testVictory.textContent = 'tie';
  } else if (userWeapon === winner) {
    // animate userWeapon victory
    testVictory.textContent = 'User Wins';
    playerObject.roundsWon--;
  } else {
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

function displayVictoryScreen(){
  hide(animationScreen);
  show(victoryScreen);
}

// ^^ ====== GAME SCREEN ====== ^^ //
// =================================================== //

// =================================================== //
// vv ====== ANIMATION SCREEN ====== vv //

function draw(userWeapon, cpuWeapon) {
  var stage = new createjs.Stage('canvas');

  stage.autoClear = true;
  stage.clear();
  console.log('begin animation');
  var userRock = new createjs.Shape();
  userRock.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  var cpuRock = new createjs.Shape();
  cpuRock.graphics.beginFill('Red').drawCircle(0, 0, 50);
  var userPaper = new createjs.Shape();
  userPaper.graphics.beginFill('DeepSkyBlue').drawRect(0, 0, 95, 110);
  var cpuPaper = new createjs.Shape();
  cpuPaper.graphics.beginFill('Red').drawRect(0, 0, 95, 110);
  var userScissors = new createjs.Shape();
  userScissors.graphics.beginFill('DeepSkyBlue').drawPolyStar(0, 0, 1.5, 5, 35);
  var cpuScissors = new createjs.Shape();
  cpuScissors.graphics.beginFill('Red').drawPolyStar(0, 0, 1.5, 5, -35);


  if (userWeapon === 'rock') {
    userRock.x = 50;
    userRock.y = 200;
    stage.addChild(userRock);

    if (cpuWeapon === 'rock') {
      cpuRock.x = 450;
      cpuRock.y = 200;
      stage.addChild(cpuRock);

      // userRock animation against cpuRock
      createjs.Tween.get(userRock, { loop: false })
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      // cpuRock animation against userRock
      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 300 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 450;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userRock, { loop: false })
        .to({x: 200 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({x: -50, y: -50}, 300, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 200);

      createjs.Tween.get(cpuPaper, { loop: false })
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 450;
      cpuScissors.y = 200;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userRock, { loop: false })
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 190 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 310 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 320 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 320 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 500, y: -50}, 400, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    // createjs.Ticker.framerate = 60;
    // createjs.Ticker.addEventListener('tick', stage);
  }
  if (userWeapon === 'paper') {
    userPaper.x = 50;
    userPaper.y = 140;
    stage.addChild(userPaper);

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 450;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 150 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
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
      cpuRock.x = 450;
      cpuRock.y = 200;
      stage.addChild(cpuRock);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 150 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 300 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        // .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 600, y: -50}, 100, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 100);
    }

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 450;
      cpuScissors.y = 200;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userPaper, { loop: false })
        .to({ x: 150 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4)) // 1
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4)) // 2 swing
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4)) // 3
        .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4)) // 4 swing
        .to({ x: 140 }, 50, createjs.Ease.getPowInOut(4)) // 5
        // .to({ x: 150 }, 50, createjs.Ease.getPowInOut(4)) // 6 swing
        .to({ x: -50, y: -50 }, 50, createjs.Ease.getPowInOut(4)) //
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 300 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4)) // 1
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4)) // 2 swing
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4)) // 3
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4)) // 4 swing
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4)) // 5
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4)) // 6 // hit away
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 400);

    }

    // createjs.Ticker.framerate = 60;
    // createjs.Ticker.addEventListener('tick', stage);

  }
  if (userWeapon === 'scissors') {
    userScissors.x = 50;
    userScissors.y = 200;
    stage.addChild(userScissors);

    if (cpuWeapon === 'scissors') {
      cpuScissors.x = 450;
      cpuScissors.y = 200;
      stage.addChild(cpuScissors);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 210 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuScissors, { loop: false })
        .to({ x: 310 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 320 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 320 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);

    }

    if (cpuWeapon === 'rock') {
      cpuRock.x = 450;
      cpuRock.y = 200;
      stage.addChild(cpuRock);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 210 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: -50, y: -50 }, 400, createjs.Ease.getPowInOut(4))
        // .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0 }, 100);

      createjs.Tween.get(cpuRock, { loop: false })
        .to({ x: 300 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 310 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);
    }

    if (cpuWeapon === 'paper') {
      cpuPaper.x = 450;
      cpuPaper.y = 140;
      stage.addChild(cpuPaper);

      createjs.Tween.get(userScissors, { loop: false })
        .to({ x: 210 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 210 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 200 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 300 }, 50, createjs.Ease.getPowInOut(4)) // win
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0.5 }, 400)
        .to({ alpha: 1 }, 400)
        .to({ alpha: 0 }, 400);

      createjs.Tween.get(cpuPaper, { loop: false })
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(4)) // meet
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4)) // hit
        .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        // .to({ x: 250 }, 50, createjs.Ease.getPowInOut(4))
        // .to({ x: 260 }, 50, createjs.Ease.getPowInOut(4))
        .to({ x: 600, y: -50 }, 400, createjs.Ease.getPowInOut(4)) // fly away
        .to({ alpha: 0 }, 50);

      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener('tick', stage);

    }

    // createjs.Ticker.framerate = 60;
    // createjs.Ticker.addEventListener('tick', stage);

  }

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener('tick', stage);

  console.log('end animation');
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
}

function nextRound() {
  hide(victoryScreen);
  show(gameScreen);
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


