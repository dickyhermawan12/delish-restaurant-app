import { createErrorPage } from '../views/templates/template-creator';

const showErrorPage = (error) => {
  const mainContainer = document.querySelector('#maincontent');
  let errorMessage;
  if (error.message === 'Failed to fetch') {
    errorMessage = 'Data fetching failed! Please ensure you have internet connectivity and try again.';
  } else {
    errorMessage = 'Oops, something wrong has happened.';
  }
  mainContainer.innerHTML = createErrorPage(errorMessage);
};

export default showErrorPage;
