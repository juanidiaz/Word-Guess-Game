#------------------------------------------------#
#                   VARIABLES
#------------------------------------------------#

# Arrays
letters     = each letter of the alphabet           (Starts = ['a' 'b' 'c' .... 'z'])
wordpool    = possible words to randombly choose    (Starts = ["string1", "string2" ... "string20"])
guessletter = list of letters already picked

# Integers
lives       = number of errors the user can have    (Starts = 10)
matches     = number of games played                (Starts =  0)

# Strings
word        = selected word
key         = key pressed by user
guess       = used to show the status of the game, starts all '-'

# Boolean
miss        = Shows if the leter matches the word   (Starts = FALSE)
win         = The user won the match


#------------------------------------------------#
# Redraw page (INITIAL)
- Page prints and display options:
    + press any letter to start playing
    + press SPACE to guess the word

# Redraw page (GAME)
- Show played games (MATCHES)
- Show lives left (LIVES)
- Show list of letters used (GUESSLETTER)
- Show the status of the game (GUESS)
- Show hint image
- Check if the guess word has any '-' left
    + if none left... YOU WIN

## Initialization ##
- a WORD is selected form the word list
- the lenght of the word is calculated and a GUESS array is created with the same lenght of WORD, filled with '-'

- data shown:
    + lives
    + guesses

## User press a letter ##
- check if LIVES is greater than 0
    + if not... ignore
- check if the KEY is a letter
    + if not a letter alerts asking for a letter only
- set letter to lower case
- returns KEY

## Probing
- get KEY
- compare the KEY to GUESSLETTER to see if it has been used before
    + if used letter, alert user to pick another letter
- compare KEY to each character of WORD
    FOR EACH:
    + if KEY is a match add KEY to GUESSLETTER array
                        replace letter position from WORD to '-'
                        replace '-' from GUESS to KEY
    + if KEY is NOT a match set MISS to TRUE
- when finishing comparing all WORD, check MISS
    + if TRUE decrease LIVES
              set MISS to FALSE
    + if FALSE increase MATCHES
- Redraw page (GAME)