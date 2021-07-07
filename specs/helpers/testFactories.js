/* eslint-disable import/prefer-default-export */
import FaveButtonPresenter from '../../src/scripts/utils/fave-button-presenter';

const createFaveButtonPresenterWithRestaurant = async (restaurant) => {
  await FaveButtonPresenter.init({
    faveButtonContainer: document.querySelector('#favebuttoncontainer'),
    restaurant,
  });
};

export { createFaveButtonPresenterWithRestaurant };
