import home from '../views/pages/home';
import favorite from '../views/pages/favorite';
import details from '../views/pages/details';

const routes = {
  '/': home,
  '/favorite': favorite,
  '/details/:id': details,
};

export default routes;
