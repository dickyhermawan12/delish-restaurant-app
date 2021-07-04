import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  createNewReview,
  createRestaurantDetailTemplate,
} from '../templates/template-creator';
import FaveButtonPresenter from '../../utils/fave-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import addNewReview from '../../utils/add-review';
import showErrorPage from '../../utils/error-page-initiator';

const details = {
  async render() {
    window.scrollTo(0, 0);
    return `
      <div class="container" id="restaurant-details__container"></div>
      <div id="favebuttoncontainer"></div>
      <div id="modalcontainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await this._getRestaurantData(url.id);
    const detailContainer = document.querySelector('#restaurant-details__container');
    document.querySelector('#skiptocontent').innerHTML = '';

    try {
      detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      detailContainer.innerHTML += createNewReview();
      addNewReview.post(url);

      FaveButtonPresenter.init({
        faveButtonContainer: document.querySelector('#favebuttoncontainer'),
        restaurant,
      });
    } catch (error) {
      showErrorPage(error);
    }
  },

  async _getRestaurantData(url) {
    let restaurant;
    try {
      restaurant = await RestaurantSource.detailRestaurant(url);
    } catch (error) {
      restaurant = await FavoriteRestaurantIdb.getRestaurant(url);
    }
    return restaurant;
  },
};

export default details;
