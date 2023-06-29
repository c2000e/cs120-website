
const maxWordLength = 5;
let currentWord = "HELLO";
let dontReload = true;

function getGuess() {
    let textbox = document.getElementById("guess");
    return processGuess(textbox.value);
}

function setGuess(guess) {
    let textbox = document.getElementById("guess");
    textbox.value = guess;
}

function enableGuess(guess) {
    let textbox = document.getElementById("guess");
    textbox.disabled = false;
}

function disableGuess(guess) {
    let textbox = document.getElementById("guess");
    textbox.disabled = true;
}

function processGuess(guess) {
    // Convert to uppercase
    guess = guess.toUpperCase();

    // Remove all non-alphabetic characters
    guess = guess.replace(/[^A-Z]/g, '');

    // Ensure guess is not over 5 characters
    if (guess.length > maxWordLength) {
        guess = guess.slice(0, maxWordLength);
    }

    return guess;
}

function validateGuess(guess, previousGuesses) {
    const correctLength = guess.length == 5;
    const notPrevious = !previousGuesses.includes(guess);
    if (!notPrevious) {
        alert("You already guessed that!");
    }
    return correctLength && notPrevious;
}

function displayGuessInRow(guess, row) {
    // PROJECT REQUIREMENT: .forEach
    // PROJECT REQUIREMENT: an arrow function
    guess.padEnd(maxWordLength, " ").split('').forEach((letter, idx) => {
        row.children[idx].textContent = letter;
    });
}

function getWordFromAPI() {
    disableGuess();
    $.getJSON("https://random-word-api.herokuapp.com/word?length=5", function (json) {
        currentWord = json[0].toUpperCase();
        console.log("The answer is: " + currentWord);
        enableGuess();
    });
}

function createLetterHistogram(word) {
    // PROJECT REQUIREMENT: an object
    let hist = {};
    for (let letter of word.split("")) {
        if (hist[letter]) {
            hist[letter] += 1;
        }
        else {
            hist[letter] = 1;
        }
    }
    return hist;
}

function matchLetters(guess) {
    letterHistogram = createLetterHistogram(currentWord);
    // PROJECT REQUIREMENT: an array
    let remainingIndices = []
    for (let i = 0; i < maxWordLength; i++) {
        if (guess.charAt(i) == currentWord.charAt(i)) {
            currentRow.children[i].style.backgroundColor = "#6ca965";
            letterHistogram[guess.charAt(i)] -= 1;
        }
        else {
            remainingIndices.push(i);
        }
    }
    for (let i of remainingIndices) {
        let currentLetter = guess.charAt(i);
        if (letterHistogram[currentLetter] > 0) {
            currentRow.children[i].style.backgroundColor = "#c8b653";
            letterHistogram[currentLetter] -= 1;
        }
        else {
            currentRow.children[i].style.backgroundColor = "#787c7f";
        }
    }
}

function gameOver(won) {
    disableGuess();
    let button = document.getElementById("submit");
    if (won) {
        button.value = "Play Again!";
    }
    else {
        button.value = "Try Again?";
    }
    // PROJECT REQUIREMENT: an arrow function
    setTimeout(() => { dontReload = false; }, 200);
}

window.onload = function (e) {
    dontReload = true;
    previousGuesses = []; // PROJECT REQUIREMENT: an array
    currentRow = document.getElementById("board").firstElementChild;

    getWordFromAPI();

    // PROJECT REQUIREMENT: an arrow function
    // PROJECT REQUIREMENT: an event handler
    let textbox = document.getElementById("guess");
    textbox.addEventListener("input", (event) => {
        const guess = getGuess();
        setGuess(guess);
        displayGuessInRow(guess, currentRow);
    });

    // PROJECT REQUIREMENT: an arrow function
    // PROJECT REQUIREMENT: an event handler
    let form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        const guess = getGuess();

        if (validateGuess(guess, previousGuesses)) {
            const guess = getGuess();
            previousGuesses.push(guess);
            setGuess("");

            matchLetters(guess);

            if (guess === currentWord) {
                gameOver(true);
            }

            // Move onto next row
            if (currentRow.nextElementSibling) {
                currentRow = currentRow.nextElementSibling;
            }
            else {
                gameOver(false);
            }
        }
        if (dontReload) {
            event.preventDefault();
        }
    });
}