const DrawerInitiator = {
  init({
    button, drawer, dimmer, toggleScrolling,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, dimmer);
      toggleScrolling();
    });

    dimmer.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer, dimmer);
      toggleScrolling();
    });
  },

  _toggleDrawer(event, drawer, dimmer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    dimmer.style.display = 'block';
  },

  _closeDrawer(event, drawer, dimmer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    dimmer.style.display = 'none';
  },
};

export default DrawerInitiator;
