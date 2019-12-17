# RPS - The Classic Game of Rock, Paper, Scissors

## Wireframe
[Domain Model & Wireframe](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=RPS%20Domain%20Model#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1qsFy7ZC1622AbrokXZIPdc7PhxIug0WR%26export%3Ddownload)

**Title Name Entry**
![title-game](./img-README/title-name.png)

**Title Round Select**
![title-round](./img-README/title-round.png)

**Title Main Game Screen**
![main game screen](./img-README/game-main.png)

***All title screens are one page, with hidden/displayed elements***  
  
**High Scores**
![high scores](./img-README/high-scores.png)

**About Us**
![about us](./img-README/about-us.png)


[Project Management Board](https://github.com/JoBdaT/RPS/projects/1?add_cards_query=is%3Aopen)

The project was a team assignment. We selected something simple to work on - the ageold game of Rock, Paper, Scissors.
The game was built with HTML, JavaScript, CSS, used EaselJS and TweenJS for the animation functions and other resources mantioned at the end of this readme.

# Purpose: 

For entertainment and amusement.

**Authors:**  Clayton Jones, Daniel Nguyen, Thomas Bhagirath Bhatt
**Last Updated:** December 03, 2019
**Deployed Site:** [Link]()

## Features:

**Name Entry**

The first page is a form to create a user data/profile. The checkUser function was used to verify if the user data existed, and if not created the profile and stored in local storage.

**Round Select Screen**

Featured three buttons with options to select 3, 5, or 7 rounds. Additionally we added a next and a back button. The next button advanced the game to the next round while the back button would takw the player back to the name selection screen, essentially to start the game over. The rounds data was put into a constructor which moved it to a player constructor object.

**Main Game Screen**

The screen featured the weapons choice buttons, Rock, Paper, Scissors. The user selectedd their weapon by clickong the button of their weapon choice, the CPU weapon was selecteted randomly and stored as a variable. Fight feature dispjlayed the battel animation and 

 Display the front page to begin the fight
 A reset stats button
 Created animation for playing rock paper scissors
 
 

RESOURCES:

How to determine if Javascript array contains an object with an attribute that equals a given value?
https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e


WindowOrWorkerGlobalScope.setTimeout()

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout


Switch statement reference

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch


EaselJS and TweenJS docs used in creating animations

https://www.createjs.com/docs/easeljs/modules/EaselJS.html
https://www.createjs.com/docs/tweenjs/modules/TweenJS.html

How to check if JavaScript Object is empty (Example)

https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
