const root = document.getElementById('root');

var numberOfColumns = 5;
var numberOfLines = 4;
var flippedCardImageElements = [];

const images = [
  'cat.png',
  'dog.png',
  'elephant.png',
  'habbit.png',
  'monkey.png',
  'bear.png',
  'pig.png',
  'tiger.png',
  'turtle.png',
  'lion.png'
];

var flipCardBackImage = '../images/back_blue.png';

var removedCards;

const delay = async function(ms) {
  return new Promise(res => setTimeout(res, ms));
}

const init = function() {
  removedCards = [];
  
  setCards(shuffle());
}

const shuffle = function() {
  var cards = selectImagesForThisRound();

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

const selectImagesForThisRound = function() {
  var imagesForThisRound = [...images];
  
  var difference = ((images.length) - (numberOfCards() / 2));
  if (difference > 0)
    imagesForThisRound = randomlyRemoveImagesThatWontBeUsed(difference, imagesForThisRound);

  return [...imagesForThisRound, ...imagesForThisRound];
}

const randomlyRemoveImagesThatWontBeUsed = function(numberOfImagesToRemove, imagesForThisRound) {
  for (var i = 0; i < numberOfImagesToRemove; i++) {
    var item = imagesForThisRound[Math.floor(Math.random() * imagesForThisRound.length)];

    imagesForThisRound.splice(imagesForThisRound.indexOf(item), 1);
  }

  return imagesForThisRound;
}

const setCards = function(cardImages) {
  resetGrid();

  var counter = 0;
  for (var i = 0; i < numberOfLines; i++) {
    var cards = '';

    for (var j = 0; j < numberOfColumns; j++) {      
      var image = `../images/${cardImages[counter]}`;

      cards += `
        <div id="flip-card-${counter}" class="flip-card">
          <div class="flip-card-inner" data-id-related="card-image-${counter}">
            <div class="flip-card-front">
            <img src="${flipCardBackImage}" class="card-image" />
            </div>
            <div class="flip-card-back">
              <img src="${image}" data-trigger-remove="flip-card-${counter}" id="card-image-${counter}" class="card-image" />
            </div>
          </div>
        </div>
      `; 

      counter++;
    }

    var template = `
      <div class="cards">
        ${cards}
      </div>
    `;

    root.innerHTML += template;

    setCardsEvents();
  }
}

const resetGrid = function() {
  root.innerHTML = '';
}

const setCardsEvents = function() {
  [...document.getElementsByClassName('flip-card-inner')].forEach(el => {
    el.addEventListener('click', flipCard)
  });
}

const flipCard = async function(element) {
  if (flippedCardImageElements.length == 2)
    return;

  var elementRelatedId = element.currentTarget.getAttribute('data-id-related');
  var cardImageElement = document.getElementById(elementRelatedId);

  flippedCardImageElements.push(
    cardImageElement
  );
  
  element.currentTarget.classList.add('flipped-card');

  if (flippedCardImageElements.length == 2) {
    await delay(1000);
      
    if (flippedCardImageElements.every(el => el.src == flippedCardImageElements[0].src)) {
      removeCards(flippedCardImageElements);
    }

    flippedCardImageElements = [];
    unflipCards();
  }
}

const removeCards = function(elements) {
  elements.forEach(element => {
    var idCardToRemove = element.getAttribute('data-trigger-remove');

    document.getElementById(idCardToRemove).classList.add('removed');

    removedCards.push(element);
  });

  if (gameIsFinished())
    displayWinnerMessage();
}

const gameIsFinished = function() {
  if (removedCards.length == numberOfCards())
    return true;

  return false;
}

const displayWinnerMessage = function() {
  generateModal();
}

const numberOfCards = function() {
  return numberOfColumns * numberOfLines;
}

const unflipCards = function() {
  var flipCardInnerList = [].slice.call(document.getElementsByClassName('flip-card-inner'));
 
  flipCardInnerList.forEach(element => element.classList.remove('flipped-card'));
}

document.addEventListener('DOMContentLoaded', function() {
  init();  
});