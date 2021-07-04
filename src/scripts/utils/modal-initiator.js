import { createPopupModal } from '../views/templates/template-creator';

const modalInitiator = {
  async init({ modalContainer, status, reload }) {
    this._modalContainer = modalContainer;
    this._message = this._checkStatus(status);
    this._reload = reload;

    await this.renderModal();
  },

  async renderModal() {
    await this.showModal();
  },

  async isModalExist() {
    let exist = true;
    if (this._modalContainer.innerHTML === '') {
      exist = false;
    }
    return exist;
  },

  async hideModal() {
    this._modalContainer.innerHTML = '';
    if (this._reload) {
      window.location.reload();
    }
  },

  async showModal() {
    this._modalContainer.innerHTML = createPopupModal(this._message);
    const modalButton = document.querySelector('#modalbutton');
    modalButton.addEventListener('click', async () => {
      this.hideModal();
    });
  },

  _checkStatus(status) {
    let message;
    switch (status) {
      case 'success':
        message = {
          title: 'Success!',
          content: 'You have added a review and it has successfully been sent!',
        };
        break;
      case 'fail':
        message = {
          title: 'Failed to Add Review!',
          content: 'Blimey! There\'s problem adding your review. You can try again later.',
        };
        break;
      case 'empty':
        message = {
          title: 'Failed to Add Review!',
          content:
            'It seems that you haven\'t fully filled the form for name and review message. Try filling the required forms and try again.',
        };
        break;
      case 'add':
        message = {
          title: 'Success!',
          content:
            'Congrats! You have added a restaurant to your personal favorite list.',
        };
        break;
      case 'remove':
        message = {
          title: 'Success!',
          content:
            'Congrats! You have removed a restaurant from your personal favorite list.',
        };
        break;
      default:
        message = {
          title: 'Success!',
          content:
            'Congrats! You have removed a restaurant from your personal favorite list.',
        };
        break;
    }
    return message;
  },
};

export default modalInitiator;
