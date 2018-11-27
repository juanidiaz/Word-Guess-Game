var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordpool = ["barney", "bart", "carl", "edna", "homer", "krusty", "lenny", "lisa", "marge", "millhouse", "moe", "ned", "ralph", "todd"];
var guessedletters = [];

var keyinput = '';
var word = "";
var guess = [];

var lives = 10;
var matches = 0;
var badguess = 0;

var miss = false;

// DEBUG FUNCTIONS --------------------------------------------

function showLog() {
    console.log("------------------------------------");
    console.log("Last selected key: " + keyinput);
    console.log("Guessed letters so far: " + guessedletters);
    console.log("------------------------------------");
}


// ------------------------------------------------------------


// Checs if the letter is in the WORD
function isKeyInWord() {
    var isinword = false;

    // Compare the KEYINPUT with the characters of the word
    for (var i = 0; i < word.length; i++) {
        if (keyinput == word[i]) {
            isinword = true;
            // Replace the guessed character in GUESS
            guess[i] = keyinput;
        }
    }

    // If KEYINPT is not a match increase a bad guess and remove a life
    if (!isinword) {
        lives--;
        badguess++;
        if (lives < 1) {
            // Display GAME OVER
            document.getElementById('guesses').innerHTML = "<h1 style=\"color: red; background-color:white;\">GAME OVER!!!</h1>";
        }
    }
    updateGame();
}

// Update the status of the game
function updateGame() {
    // Print the GUESS word
    document.getElementById('gameArea').innerHTML = guess.join(' ');
    document.getElementById('gameStats').innerHTML = "<p><b>Lives left: </b>" + lives + "</p><b>Wrong guesses: </b>" + badguess;

    if (guess.indexOf("-") == -1) {
        // Display YOU WIN!
        document.getElementById('gameArea').innerHTML = "<h1 style=\"color: red; background-color:white;\">YOU WIN!!!</h1>";
    }
    else {
        document.getElementById('gameArea').innerHTML = guess.join(' ');
    }
}

// Select randomly a the WORD from the WORDPOOL array
function getNewWord() {
    // Randomly pick a word
    word = wordpool[Math.floor(Math.random() * wordpool.length)];
    console.log("Word selected: " + word);

    document.getElementById('hintImage').innerHTML = "<h2>HINT IMAGE</h2><img src=\"./assets/images/_" + word + ".png\" alt=\"Hint image\" id=\"hintCanvas\">";

    // Create GUESS word with -
    for (var i = 0; i < word.length; i++) {
        guess.push('-');
    }

    updateGame();
}

// Validates is KEY is a valid character 
function isValidKey(key) {
    var iskey = false;

    // Comparing KEY to all characters in the LETTERS array
    for (var i = 0; i < letters.length; i++) {
        if (key == letters[i]) {
            iskey = true;           // The KEY is a valid LETTER
        }
    }

    if (iskey == false) {
        alert("DOOOOOUGGGG!!! You can ONLY use letters!")   // Alert user to type the right characters
        keyinput = '';                                      // The KEYINPUT is cleared if not valid
    }

    // The KEY is valid (TRUE) or not (FALSE)
    return iskey;
}

// Validates if the guessed letter has been used before
function isNewKey(key) {
    var isnew = true;

    // Comparing KEY to all characters in the GUESSEDLETTERS array
    for (var i = 0; i < guessedletters.length; i++) {
        if (key == guessedletters[i]) {
            isnew = false;           // The KEY is has been used before
        }
    }

    if (isnew == false) {
        alert("You tried that letter before. Try another one!")     // Alert user to try a diferent letter
        keyinput = '';                                              // The KEYINPUT is cleared if not valid
    }

    // The KEY is a new letter (TRUE) or old (FALSE)
    return isnew;
}


// When the key is released this function runs
document.onkeyup = function (event) {

    // Take the typed key as lower case
    keyinput = event.key.toLocaleLowerCase();
    console.log("Selected key: " + keyinput);

    // If the KEYINPUT is not a LETTER stop and exit
    if (!isValidKey(keyinput)) {
        console.log("The key is not a letter!")
        return;
    }

    // The KEYINPUT is a LETTER!

    // If the KEYINPUT is not a LETTER stop and exit
    if (!isNewKey(keyinput)) {
        console.log("The key has been used before!")
        return;
    }

    // The KEYINPUT is a new guess!

    guessedletters.push(keyinput);

    // Print the guessed letters
    document.getElementById('guesses').innerHTML = "Already guessed letters: " + guessedletters;

    // Check if KEYINPUT is in WORD
    isKeyInWord()
}

getNewWord();
