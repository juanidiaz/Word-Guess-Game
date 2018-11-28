// VARIABLES --------------------------------------------

//      ARRAYS
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordpool = ["barney", "bart", "carl", "edna", "homer", "krusty", "lenny", "lisa", "marge", "millhouse", "moe", "ned", "ralph", "todd"];
var guessedletters = [];

//      STRINGS/CHAR
var keyinput = '';
var word = "";
var guess = [];

//      NUMBER/INTEGER
var lives = 10;
var matchesWin = 0;
var matchesLost = 0;
var badguess = 0;

//      BOOLEAN
var miss = false;
var gamedone = true;

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
        $(".audioDoh").trigger('play');
        lives--;
        badguess++;
        if (lives < 1) {
            matchesLost++;
            gamedone = true;
        }
    }

    // Update the labels
    updateGame();
}

// Update the status of the game
function updateGame() {
    // Print the GUESS word

    document.getElementById('gameArea').innerHTML = guess.join(' ');

    if (guess.indexOf("-") == -1) {
        // Display YOU WIN!
        console.log("Winner!!!");
        matchesWin++;
        document.getElementById('gameArea').innerHTML = "<div id=\"gameMessage\">YOU WIN!!!<hr><div id=\"sm\">Press the SPACEBAR to play again</dvi></dvi>";
        document.getElementById('guesses').innerHTML = "";
        gamedone = true;
    }
    else if (lives < 1) {
        // Display GAME OVER
        console.log("Not enough lifes left!");
        document.getElementById('gameArea').innerHTML = "<div id=\"gameMessage\">GAME OVER!!!<hr><div id=\"sm\">Press the SPACEBAR to play again</dvi></dvi>";
        document.getElementById('guesses').innerHTML = "";
    }

    // Display the game stats
    document.getElementById('gameStats').innerHTML = "<p><b>Lives left: </b>" + lives + "</p><b>Wrong guesses: </b>" + badguess + "</p><b>Games won: </b>" + matchesWin + "</p><b>Games lost: </b>" + matchesLost;
}

// Select randomly a the WORD from the WORDPOOL array
function getNewWord() {

    // Randomly pick a word
    word = wordpool[Math.floor(Math.random() * wordpool.length)];

    // Show the word to the log... for cheaters!
    console.log("Word selected: " + word);

    // Clear the GUESS and GUESSEDLETTERS arrays
    guess = [];
    guessedletters = [];

    // Reset LIVES and BADGUESSES to initial values for new game
    lives = 10;
    badguess = 0;

    // Show the image of the selected character based on WORD
    document.getElementById('hintImage').innerHTML = "<h2>HINT IMAGE</h2><img src=\"./assets/images/" + word + ".png\" alt=\"Hint image\" id=\"hintCanvas\">";

    // Create GUESS word with -
    for (var i = 0; i < word.length; i++) {
        guess.push('-');
    }

    // Set game mode OFF
    gamedone = false;
    
    // Update the labels
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
        alert("DOOOOOHH!!! You can ONLY use letters!")   // Alert user to type the right characters
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

    if (!gamedone) {
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
        document.getElementById('guesses').innerHTML = "<p style=\"font-size: 1.5rem;\">Already guessed letters:</p>" + guessedletters;

        // Check if KEYINPUT is in WORD
        isKeyInWord()

    }

    // If not in game mode and user press SPACEBAR
    else if (event.keyCode == 32 && gamedone) {
        console.log("User clicked space bar");
        getNewWord();
        return;
    }

    // If not in game mode and user press anything other than SPACEBAR
    else {
        alert("Please press the SPACE BAR to play.")
    }
}

// Play the theme song when loading the page.. .just once!
window.onload = function () { $(".audioTheme").trigger('play'); }
