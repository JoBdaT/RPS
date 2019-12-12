'use strict';

function displayRounds(event) {
    event.preventDefault();
    hide(nameScreen);
    show(roundsScreen);

}

function hide(elem){
    elem.style.display = 'none';
}

function show(elem){
    elem.style.display = 'block';
}

var nameForm = document.getElementById('name-form');
var nameScreen = document.getElementById('name-screen');
var roundsScreen = document.getElementById('rounds-screen');

nameForm.addEventListener('submit', displayRounds);