// Run the game!!
gameStart();

/******************************************************************************
 Game options
 ******************************************************************************/

var playerState = {
  deck: [],
  hand: [],
  colorChoices: []
}
var gameOptions = {
  DECK_SIZE: 60,
  MAX_HAND_SIZE: 7
}

/******************************************************************************
 Main Game Loop
 ******************************************************************************/

function gameStart() {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var util = require('util');
  console.log("How many colors will your deck have?");
  var colors = [];
  getInput(colors, 0, 0, continueGame);
  function continueGame() {
    initDeck(playerState, colors);
    drawStartHand(playerState, 7);
    printCards(playerState.hand);
    process.exit();
  }
};

// Lol recursive inputs riiight...
function getInput(colors, inputCount, colorCount, callback) {
  process.stdin.once('data', function(input) {
    if (inputCount == 0) {
      colorCount = parseInt(input, 10);
      console.log("What color" + (colorCount > 1 ? "s" : "") + "? One color per line please!");
      getInput(colors, inputCount + 1, colorCount, callback);
    } else if (inputCount <= colorCount) {
      var color = input.trim();
      colors.push(color);
      if (inputCount === colorCount) {
        var colorString = colors.join(", ");
        console.log("Thanks! Constructing a " + colorString + " deck");
        callback();
      } else {
        getInput(colors, inputCount + 1, colorCount, callback);
      }
    }
  });
}

/******************************************************************************
 Testing
 ******************************************************************************/

function printCards(cardArr) {
  for (var i = 0; i < cardArr.length; i++) {
    printCard(cardArr[i]);
  }
}

function printCard(card) {
  console.log(card.name);
}


/******************************************************************************
 Hand Management
 ******************************************************************************/


function drawStartHand(player, handSize) {
  for (var i = 0; i < handSize; i++) {
    draw(player.hand, player.deck)
  }
}

function draw(hand, deck) {
  var drawnCard = deck.shift();
  hand.push(drawnCard);
}
/******************************************************************************
 Deck Inititializtion
 ******************************************************************************/

function initDeck(player, colors) {
  for (var i = 0; i < gameOptions.DECK_SIZE; i++) {
    addCardToDeck(player.deck, colors);
  }
}

function addCardToDeck(deck, colors) {
  var randomColor = grabRandom(colors);
  var card = newRandomCard(randomColor);
  deck.push(card);
}

function newRandomCard(color) {
  // whats in the card
  var cardDefaults = {
    type: ['creature', 'land'],
    color: ['white', 'black', 'red', 'green', 'blue']
  }

  var card = {};

  card.type = grabRandom(cardDefaults.type);
  card.color = color ? color : grabRandom(cardDefaults.color);
  card.name = card.color + " " + card.type;

  return card;
}

function grabRandom(arr) {
  var randomIndex = Math.floor(arr.length * Math.random())
  return arr[randomIndex]
}