
var playerState = {
  deck: [],
  hand: []
}
var gameOptions = {
  DECK_SIZE: 60,
  MAX_HAND_SIZE: 7
}

function gameStart() {
  initDeck(playerState);
  drawStartHand(playerState, 7);
  printCards(playerState.hand);
};

gameStart();


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

function initDeck(player) {
  for (var i = 0; i < gameOptions.DECK_SIZE; i++) {
    addCardToDeck(player.deck);
  }
}

function addCardToDeck(deck) {
  var card = newRandomCard();
  deck.push(card);
}

function newRandomCard() {
  // whats in the card
  var cardDefaults = {
    type: ['creature', 'land'],
    color: ['white', 'black', 'red', 'green', 'blue']
  }

  var card = {};

  card.type = grabRandom(cardDefaults.type);
  card.color = grabRandom(cardDefaults.color);
  card.name = card.color + " " + card.type;

  return card;
}

function grabRandom(arr) {
  var randomIndex = Math.floor(arr.length * Math.random())
  return arr[randomIndex]
}


/******************************************************************************

 ******************************************************************************/
