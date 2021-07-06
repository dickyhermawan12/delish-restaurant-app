/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favoriting A Restaurant', () => {
  const addFaveButtonContainer = () => {
    document.body.innerHTML = '<div id="favebuttoncontainer"></div>';
  };

  const addModalContainer = () => {
    document.body.innerHTML += '<div id="modalcontainer"></div>';
  };

  beforeEach(() => {
    addFaveButtonContainer();
    addModalContainer();
  });

  it('should show the favorite button once the restaurant hasn\'t been favorited before', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="add this restaurant as your favorite"]'),
    ).toBeTruthy();
  });

  it('should not show the unfave button when the restaurant hasn\'been favorited before', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="remove this restaurant from your favorite"]'),
    ).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favebutton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#favebutton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFaveButtonPresenterWithRestaurant({});

    document.querySelector('#favebutton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
