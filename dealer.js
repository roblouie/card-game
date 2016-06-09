'use strict';

module.exports = class Dealer {
  constructor(cardArray) {
    this.cards = this.shuffle(cardArray);
  }

  dealCard() {
    return this.dealCards(1);
  }

  dealCards(numberOfCards) {
    return this.cards.splice(0, numberOfCards);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
};
