import RestaurantSource from '../../data/restaurant-source';
import {
  createHero,
  createRestaurantCard,
  createSkipToContent,
} from '../templates/template-creator';
import showErrorPage from '../../utils/error-page-initiator';

const home = {
  async render() {
    return `
      <section id="hero"></section>
      <section class="content">
        <div class="explore">
          <h1 class="labels" tabindex="0">
            Explore <span class="font-red">Restaurants</span>
          </h1>
          <div class="lists" id="resto__list">
          </div>
        </div>
      </section>         
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();
    const heroContainer = document.querySelector('#hero');
    const restaurantsContainer = document.querySelector('#resto__list');
    const skipContainer = document.querySelector('#skiptocontent');
    heroContainer.innerHTML = createHero();
    skipContainer.innerHTML = createSkipToContent('#resto__list');

    try {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantCard(restaurant);
      });
    } catch (error) {
      showErrorPage(error);
    }
  },
};

export default home;
