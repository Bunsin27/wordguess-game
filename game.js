let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let critters = ["mongoose", "armadillo", "turtle", "porcupine", "badger", ]
let gameStarted = false; //
let currentWord; //
let wordAsDashes; //
let guessesLeft; //
let lettersGuessed; // 
let numWins = 0; // displays game state on start
let numLosses = 0; //
let getNewWord; //
let display; //
let correctGuesses; //
let wordAsArr = []; //
let dashesArray = []; //

function initialize() { //
    gameStarted = true; //
    lettersGuessed = []; //
    correctGuesses = 0; //
    display = Math.floor(Math.random() * 5); //
    currentWord = critters[display]; //    needed a lot help with this!!!--a fellow student/developer provided a LOT of assistance "TG".
    guessesLeft = 12 - currentWord.length; //
    wordAsDashes = createDashes(currentWord); //
    wordAsArr = currentWord.split(''); //
    dashesArray = wordAsDashes.split(''); // 
    document.getElementById("currentWord").innerHTML = wordAsDashes; //
    document.getElementById("lettersGuessed").innerHTML = "--"; // 
    document.getElementById("guessesLeft").innerHTML = guessesLeft; //
}

function createDashes(word) {
    let dashes = "";
    for (i = 0; i < word.length - 1; i++) {
        dashes += "_ "; //the spacing of the dash in quotes is very important-will cause an error/wrong even if word is correct.//
    }
    dashes += "_";
    return dashes;
}

function playGame(letter) {
    var letter = letter.toLowerCase();

    if (alphabet.indexOf(letter) > -1) {
        if (wordAsArr.indexOf(letter) > -1) {
            correctGuesses++;
            displayLetter(letter);
        } else {
            if (lettersGuessed.indexOf(letter) > -1) {
                return;
            } else {
                guessesLeft--;
                document.getElementById("guessesLeft").innerHTML = guessesLeft;
                lettersGuessed.push(letter);
                document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
                if (guessesLeft == 0) {
                    alert("OH NO! The correct answer is " + currentWord);
                    initialize();
                    numLosses++;
                    document.getElementById("losses").innerHTML = numLosses;
                }
            }
        }
    }
}

function displayLetter(letter) {

    for (i = 0; i < currentWord.length; i++) {
        if (letter == wordAsArr[i]) {
            dashesArray[i * 2] = letter;
            console.log(dashesArray);
        }
    }
    document.getElementById("currentWord").innerHTML = dashesArray.join("");
    checkForWin();
}

function checkForWin() {
    if (dashesArray.indexOf("_") === -1) {
        alert("Yaahhh! The Critter is " + currentWord);
        numWins++;
        document.getElementById("wins").innerHTML = numWins;
        initialize();
    }
}

document.onkeyup = function (event) {
    if (!gameStarted) {
        document.getElementById("START GAME").innerHTML = "";
        initialize();
        document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
        console.log(currentWord);
        gameStarted = true;
    } else {
        playGame(event.key);
    }
}