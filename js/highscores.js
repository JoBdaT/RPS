'use strict';

// GLOBAL VARIABLES
var debug = true;

var playerArray = [];
var inOrderArray = [];

var tableHeaders = ['Name', 'Score'];

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
    createTable();
  } else {
    if (debug) {
      console.log('no player data');
    }
    noPlayers.textContent('There are currently no scores to display.');
  }
}

function highToLowArray(arr) {

  while (arr.length > 0) {
    var name = '';
    var score = 0;
    var highPlayerIndex = 0;

    if (debug) {
      console.log('entered while loop');
      console.log('arr.length:', arr.length);
    }

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

function createTable() {
  var tHeadEl = document.createElement('thead');

  for (var i = 0; i < tableHeaders.length; i++) {
    createElem('th', tHeadEl, tableHeaders[i]);
    // var thEl = document.createElement('th');
    // thEl.textContent = tableHeaders[i];
    // tHeadEl.appendChild(thEl);
  }

  table.appendChild(tHeadEl);

  for (i = 0; i < inOrderArray.length; i++) {
    var trEl = document.createElement('tr');
    createElem('td', trEl, inOrderArray[i].playerName);
    createElem('td', trEl, inOrderArray[i].totalGamesWon);
    table.appendChild(trEl);
  }
}

function createElem(elem, parent, content) {
  var el = document.createElement(elem);
  el.textContent = content;
  parent.appendChild(el);
}

getStorage();
