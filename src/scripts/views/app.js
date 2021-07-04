import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, dimmer, body,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._dimmer = dimmer;
    this._body = body;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      dimmer: this._dimmer,
      toggleScrolling: () => {
        this._body.classList.toggle('stop__scrolling');
      },
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
