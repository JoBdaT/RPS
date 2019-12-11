## SOFTWARE REQUIREMENTS

### Vision
We will create a web app that allows folks to play Rock, Paper, Scissors against the computer.
This app solves no problems or pain points, unless your problem is that you don't have enough avenues for playing rock, paper, scissors. You should care about this product because painless conflict resolution makes the world a better place.

### Scope
**IN**
- collect player name data for record keeping and UI display
- transfer player name and performance data into high score page
- contain the basic rules and gameplay of rock, paper, scissors
- include an About Me page with info about the project owners

**OUT**
- our app will not be designed or optimized for mobile devices

### MVP
**Minimum Viable Product definition**
The app must be able to display, with simple animation, the rock, paper, and scissors graphics moving as the user plays against the computer
The app must have an About Me page
The app must use local storage
We will use local storage to save player names + preferences (mostly visual setting preferences), and also may use local storage to save high scores, stats pages, and CPU profile settings (stretch goals)

### Stretch goals
- Allow the user to select the number of rounds
- Allow the user to have "lives" or HP such that they can lose a certain number of times
- Allow the user to adjust both of those elements
- Allow the user to select different graphics skins to add onto the basic rock, paper, scissors graphics
ex: medieval skin, doggo skin, Pokemon skin, etc
- Create more complex and polished battle animations
- Create multiple CPU profiles with weighted preferences towards choosing one of the battle elements more than another (ex: a "rock" profile which picks rock 60% of the time)
- Create a stats page (using local storage data) that shows how often logged players choose rock/paper/scissors
Add 4th or 5th options for battle beyond just RPS (ex: dynamite, laser gun)
- Create a method for players to play against other players and not simply just the computer, either turn-based or simultaneous play

### Functional Requirements
- users can create and save profiles with names (and settings as a stretch goal)
- users can see their game performance data on a high score page
- users can play (at minimum) 3 rounds of gameplay before getting the option to reset the game

### Data flow
- When users get to the start screen, there will be a prompt to enter their names.
    - Name data will display on the UI and High Scores page. It will be saved as a player object with Score and Setting data as properties.
- After users enter their name, they will be prompted to enter the number of rounds they would like to play.
    - Round info will be displayed on the static UI and tracked in the player object.
- When the user finishes the game, name data and game performance data will be associated and saved into local storage. Data types are Name and Score (in rounds). Data will be stored as a player object.
    - The High Score page will pull from this local storage data.
    - As a stretch goal, we will have game settings information also tied to this player object.
- If the player begins the game having already played it, when they enter their name, the app will search local storage to see if the player already has a profile saved.
    - As a stretch goal, we will incorporate more complex data capture to display play pattern data on the High Scores page.
    - This data will include the # of times the player selected each weapon, the # of times the player has lost or won, and the number of rounds the player has played. 

[Domain Model/data flow & wireframe](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=RPS%20Domain%20Model#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1qsFy7ZC1622AbrokXZIPdc7PhxIug0WR%26export%3Ddownload)