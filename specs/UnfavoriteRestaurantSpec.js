/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unfavoriting A Restaurant', () => {
  const addFaveButtonContainer = () => {
    document.body.innerHTML = '<div id="favebuttoncontainer"></div>';
  };

  const addModalContainer = () => {
    document.body.innerHTML += '<div id="modalcontainer"></div>';
  };

  beforeEach(async () => {
    addFaveButtonContainer();
    addModalContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show unfave button once the restaurant has been favorited', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="remove this restaurant from your favorite"]'),
    ).toBeTruthy();
  });

  it('should not show the fave button when the restaurant has been favorited before', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="add this restaurant as your favorite"]'),
    ).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    document
      .querySelector('[aria-label="remove this restaurant from your favorite"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="remove this restaurant from your favorite"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
