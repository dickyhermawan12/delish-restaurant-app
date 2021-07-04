import RestaurantSource from '../data/restaurant-source';
import { reviewCards } from '../views/templates/template-creator';
import modalInitiator from './modal-initiator';

const addReview = {
  post(url) {
    const submitButton = document.querySelector('#submit');
    const reviewerName = document.querySelector('#reviewername');
    const reviewContent = document.querySelector('#reviewmessage');

    submitButton.addEventListener('click', async () => {
      let fetchStatus;
      const newReview = {
        id: url.id,
        name: reviewerName.value,
        review: reviewContent.value,
      };
      if (!!newReview.name && !!newReview.review) {
        try {
          const response = await RestaurantSource.addReview(newReview);
          RestaurantSource.detailRestaurant(url.id);
          const reviewContanier = document.querySelector('#customerReview');
          reviewContanier.innerHTML = reviewCards(response.customerReviews);

          fetchStatus = 'success';
        } catch (error) {
          fetchStatus = 'fail';
        }
      } else {
        fetchStatus = 'empty';
      }

      this._emptyForm();

      modalInitiator.init({
        modalContainer: document.querySelector('#modalcontainer'),
        status: fetchStatus,
        reload: false,
      });
    });
  },

  _emptyForm() {
    document.querySelector('#reviewername').value = '';
    document.querySelector('#reviewmessage').value = '';
  },
};

export default addReview;
