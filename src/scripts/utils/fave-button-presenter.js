import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import {
  createFaveButtonTemplate,
  createUnfaveButtonTemplate,
} from '../views/templates/template-creator';
import modalInitiator from './modal-initiator';

const FaveButtonPresenter = {
  async init({ faveButtonContainer, restaurant }) {
    this._faveButtonContainer = faveButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExisted(id)) {
      this._renderUnfave();
    } else {
      this._renderFave();
    }
  },

  async _isRestaurantExisted(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderFave() {
    this._faveButtonContainer.innerHTML = createFaveButtonTemplate();

    const faveButton = document.querySelector('#faveButton');
    faveButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      modalInitiator.init({
        modalContainer: document.querySelector('#modalcontainer'),
        status: 'add',
        reload: false,
      });
      this._renderButton();
    });
  },

  _renderUnfave() {
    this._faveButtonContainer.innerHTML = createUnfaveButtonTemplate();

    const faveButton = document.querySelector('#faveButton');
    faveButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      modalInitiator.init({
        modalContainer: document.querySelector('#modalcontainer'),
        status: 'remove',
        reload: false,
      });
      this._renderButton();
    });
  },
};

export default FaveButtonPresenter;
