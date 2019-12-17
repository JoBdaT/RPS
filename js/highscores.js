'use strict';

// GLOBAL VARIABLES
var debug = true;

var playerArray = [];
var inOrderArray = [];

// DOM ELEMENTS
var table = document.getElementById('highscore-table');
var noPlayers = document.getElementById('no-players');


// FUNCTIONS

function getStorage() {
  if (localStorage.getItem('playerArray')) {
    playerArray = JSON.parse(localStorage.getItem('playerArray'));
    if (debug) {
      console.log('Got playerArray from storage.');
      console.log('playerArray: ', playerArray);
    }
    highToLowArray(playerArray);
  } else {
    if (debug) {
      console.log('no player data');
    }
    noPlayers.textContent('There are currently no scores to display.');
  }
}

function highToLowArray(arr) {
  var name = '';
  var score = 0;
  var highPlayerIndex = 0;


  while (arr.length > 0) {
    // going through arr to find player with current highest score
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].totalGamesWon > score) {
        name = arr[i].playerName;
        score = arr[i].totalGamesWon;
        highPlayerIndex = i;
      }
    }

    inOrderArray.push(arr.splice(highPlayerIndex, 1)[0]);
    if (debug) {
      console.log('inOrderArray: ', inOrderArray);
      console.log('arr.length: ', arr.length);
    }
  }
}

getStorage();
