import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import {
  createEmptyFavoriteNote,
  createRestaurantCard,
} from '../templates/template-creator';
import showErrorPage from '../../utils/error-page-initiator';

const favorite = {
  async render() {
    window.scrollTo(0, 0);
    return `
      <section class="content">
        <div class="explore__favorites" id="catalogues">
          <h1 class="labels" tabindex="0">
            Your Favs <span class="font-red">Restaurants</span>
          </h1>
          <div class="lists" id="resto__list">
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#resto__list');
    document.querySelector('#skiptocontent').innerHTML = '';

    if (restaurants.length === 0) {
      const noteContainer = document.querySelector('#catalogues');
      noteContainer.innerHTML += createEmptyFavoriteNote();
    } else {
      try {
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantCard(restaurant);
        });
      } catch (error) {
        showErrorPage(error);
      }
    }
  },
};

export default favorite;
