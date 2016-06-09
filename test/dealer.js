const Dealer = require('../dealer');

exports['dealCards removes given number of cards from the deck'] = function(test) {
  const dealer = new Dealer(['Heart', 'Spade', 'Club', 'Diamond']);
  const dealtHandOfTwo = dealer.dealCards(2);
  const dealtHandOfOne = dealer.dealCard();
  test.equal(dealtHandOfOne.length, 1);
  test.equal(dealtHandOfTwo.length, 2);
  test.equal(dealer.cards.length, 1);
  test.done();
};