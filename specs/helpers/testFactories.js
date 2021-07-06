/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/scripts/utils/fave-button-presenter';

const createFaveButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#favebuttoncontainer'),
    restaurant,
  });
};

export { createFaveButtonPresenterWithRestaurant };
