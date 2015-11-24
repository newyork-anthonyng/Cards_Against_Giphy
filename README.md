## Inspired by [Cards Against Humanity](https://en.wikipedia.org/wiki/Cards_Against_Humanity)

## User Stories
* user should be able to create an account
* existing users should be able to login
* existing users can edit account
* existing users can delete account

### All players
* can chat
* can view current question in play
* can view own their own cards
* cannot view played cards while game is in play
* can play card
* can be assigned as judge
* can view played cards during judge review
* can view profiles
* can view current players & current judge

### Judge
* can view played cards during judging period
* can select winner

## API Routes
1. /createCards/:numberOfCards
  - route will give us all of the card images
2. /randomTerms/:numberOfTerms
  - route will give us random terms

## Game Logic
1. Round beings
- judge is selected
  - there will be an array of players. The judge will start with the first player in the array, and will be passed to the next one in the array
- cards are dealt to each player
  - 7 terms (per player) will be grabbed (randomly) from the ‘terms’ database.
  - each of these terms will hit the Giphy API and grab the image URL
  - each of these 7 terms will be pushed into the Player’s card array
2. Players Choose Their Cards
- each player selects a card and submits it into a game collection
  - each of the cards in the Player’s card array will have a “selected” boolean
  - each of the cards in the Player’s card array will have a “submitted” boolean
  - each player themselves will have a “submitted” boolean
- after all players have submitted their cards, judge starts review
   - when each player’s “submitted” boolean is true, round ends
   - when time limit is reached, all player’s “submitted” boolean is true
   - if a player hasn’t played a card when the time has run out, play a random card
   - at the end of the round, all of the selected cards are pushed into an array of User Selected Cards
3. Judges start judging
- all of the cards are revealed
    - all of the User Selected Cards are revealed
- players aren’t able to manipulate their cards
    - functionality of players to select their cards will not work
- the judge selects a winner
    - judge clicks on a Giphy Card that they want to win
- judge clicks on the card that they like, and submits
4. Winner is revealed

## Game States
roundStart
playerChooses
judging
winnerRevealed
