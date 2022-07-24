# Codebreaker
This is the player side of a game of mastermind, where the objective is to correctly guess the code set by the mastermind. In this game one player, the mastermind, will create a secret combination of coloured pegs. Then the second player, the codebreaker, tries to guess the code. The mastermind provides feedback to each guess of the codebreaker, indicating the number of well-placed and misplaced colours.

## Rules
1. The CodeBreaker needs to try and identify the secret code set up by the mastermind. The colours of the code are selected from `["red", "blue", "green", "orange", "purple", "yellow"]`. Duplicated colours are allowed, but the code must be exactly 4 colours in length.
2. The Codebreaker supplies an array of colours as the guess to the mastermind. When you make a guess, the mastermind will respond with a hint. For every correctly positioned colour in the guess, a `"black"` piece is added to the hint array. For each correct colour but in the wrong position, a `"white"` piece is added to the array. If the guessed colour is not on the code, nothing will be added to the array for that given element. Note that the guess should always have four elements.
3. Passing in the correct guess will result in the mastermind returning "WON!".
4. Passing an invalid colour will result in a fail and the mastermind will respond with the error `"Error: you have given an invalid colour!"`
5. Passing an invalid array length will result in a fail and the mastermind will respond with the error `"Error: you must pass 4 colours!"`
6. Guessing more than 10 times will result in a fail and the mastermind will respond with the error `"Error: you have had more than 10 tries!"`
7. The returned array elements from the Mastermind will not be in any particular order. The returned array will be shuffled.

## Tasks
Your task is to create a code that's able to play the codebreaker role of the game and correctly guess the secret code in as few tries as possible.
There

## Examples
Given the code `["blue", "red", "green", "purple"]` <br/>
When the codebreaker tries the sequence `["blue", "yellow", "purple", "orange"]` <br/>
Then returns `["white", "black"]`
 - `"white"` for the `"purple"` piece that is on the code but was guessed in the wrong position and `"black"` for the `"blue"` piece that was guessed on the correct position.
 - note that the order of the resulting array is irrelevant.

Given the code `["blue", "red", "green", "purple"]` <br/>
When the codebreaker tries the sequence `["yellow", "yellow", "yellow", "yellow"]` <br/>
Then returns an empty array since no elements match. <br/>

Given the code `["blue", "red", "green", "purple"]` <br/>
When the codebreaker tries the sequence `["green", "yellow", "red", "yellow"]` <br/>
Then returns `["white", "white"]`. <br/>

Given the code `["blue", "red", "green", "purple"]` <br/>
When the codebreaker tries the sequence `["yellow", "red", "red", "blue"]` <br/>
Then returns `["white", "white", "black"]`. <br/>
 - one `"black"` for the correctly guessed `"red."`
 - and one `"white"` for each, the `"blue"` and `"red"` on the wrong positions.
