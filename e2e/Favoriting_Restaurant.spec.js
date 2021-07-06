/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favoriting Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited movies', ({ I }) => {
  I.seeElement('.emptynote');
  I.see('It seems that you have not favorited any restaurants yet!', '.empty__message');
});

Scenario('favoriting and unfavoriting one restaurant', async ({ I }) => {
  I.see('It seems that you have not favorited any restaurants yet!', '.empty__message');
  I.amOnPage('/');

  I.wait(2);
  I.seeElement('.list-item');
  const firstRestaurant = locate('.list-item__name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.wait(2);
  I.seeElement('#favebutton');
  I.click('#favebutton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list-item');

  const favedRestaurantTitle = await I.grabTextFrom('.list-item__name');
  assert.strictEqual(favedRestaurantTitle, firstRestaurantTitle);

  I.wait(2);
  I.click(firstRestaurant);

  I.wait(2);
  I.seeElement('#favebutton');
  I.click('#favebutton');

  I.amOnPage('/#/favorite');
  I.seeElement('.emptynote');
  I.see('It seems that you have not favorited any restaurants yet!', '.empty__message');
});
