import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const categoriesList = (categories) => {
  let restaurantCategory = '';
  categories.forEach((category) => {
    restaurantCategory += `
      <h4 class="restaurant__category">${category.name}</h4>
    `;
  });
  return restaurantCategory;
};

const menuList = (foods) => {
  let foodMenu = '';
  foods.forEach((food) => {
    foodMenu += `
      <li>${food.name}</li>
    `;
  });
  return foodMenu;
};

const reviewCards = (reviews) => {
  let customerReview = '';
  reviews.forEach((review) => {
    customerReview += `
    <div class="review__card">
      <div class="review__header">
        <h2 class="reviewer__name">${review.name}</h2>
        <p class="review__date">${review.date}</p>
      </div>
      <p class="review__main">
        "${review.review}"
      </p>
    </div>      
    `;
  });
  return customerReview;
};

const createHero = () => `
  <div class="hero__inner">
    <h1 class="hero__title">Stay Delish in Every Occasion</h1>
    <p class="hero__tagline">
      Exploring restaurants near your area have never been this easy.
    </p>
  </div>
`;

const createRestaurantCard = (restaurant) => `
  <a href="/#/details/${restaurant.id}" title="Go to ${restaurant.name} page" class="list-item">
    <div class="list-item__upper">
      <div class="list-item__citylabel">
        <p>${restaurant.city}</p>
      </div>
      <img
        class="lazyload list-item__thumbnail"
        data-src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}"
        alt="${restaurant.name}}"
        height="250px"
        width="110%"
      />
    </div>
    <div class="list-item__content">
      <p class="list-item__rating">Rating : ${restaurant.rating}</p>
      <h1 class="list-item__name">
        ${restaurant.name}
      </h1>
      <p class="list-item__description">
      ${restaurant.description}
      </p>
    </div>
  </a>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant__main">
    <div class="restaurant__picture">
      <img
        src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}"
        alt="${restaurant.name}"
        width="100%"
        height="410px"
      />
    </div>
    <div class="details">
      <h1 class="restaurant__name">${restaurant.name}</h1>
      <div class="restaurant__categories">
        ${categoriesList(restaurant.categories)}
      </div>
      <hr>
      <div class="restaurant__address flex-inline">
        <img
          src="./web_icons/venue.svg"
          alt="venue icon"
          class="sm-icon"
        />
        <p class="address">${restaurant.address}, ${restaurant.city}</p>
      </div>
      <div class="restaurant__rating flex-inline">
        <img src="./web_icons/star.svg" alt="rating icon" class="sm-icon" />
        <p class="rating">${restaurant.rating}</p>
      </div>
    </div>
  </div>

  <h1 class="labels">Menus</h1>
  <div class="restaurant__menus">
    <div class="foods">
      <h2 class="foods__title">Foods</h2>
      <ul class="foods__list">
        ${menuList(restaurant.menus.foods)}
      </ul>
    </div>
    <hr>
    <div class="drinks">
      <h2 class="drinks__title">Drinks</h2>
      <ul class="drinks__list">
        ${menuList(restaurant.menus.drinks)}
      </ul>
    </div>
  </div>

  <h1 class="labels">Customer Review</h1>
  <div class="customer__reviews" id="customerReview">
    ${reviewCards(restaurant.customerReviews)}
  </div>
`;

const createNewReview = () => `
  <h1 class="labels">Add New Review</h1>
  <div class="customer__reviews">
    <div class="review__form">
      <div class="input__form">
        <div class="review-form__header flex-inline">
          <label class="form-label" for="name">Name</label> <br />
          <input type="text" name="name" id="reviewername" />
        </div>

        <div class="review-form__main flex-inline">
          <label class="form-label" for="content">Review</label> <br />
          <textarea name="content" id="reviewmessage"></textarea>
        </div>
      </div>
      <button class="submit" id="submit" aria-label="Submit my review">
        Add Review
      </button>
    </div>
  </div>
`;

const createSkipToContent = (content) => `
  <a href="${content}" class="skip__link">Menuju ke konten</a>
`;

const createPopupModal = (data) => `
  <div class="modal" id="modal">
    <div class="modal__content">
      <div class="modal__body">
        <h2>${data.title}</h2>
        <p>${data.content}</p>
      </div>
      <button class="modal__button" id="modalbutton">Got it!</button>
    </div>
  </div>  
`;

const createEmptyFavoriteNote = () => `
  <div id="emptynote">
    <div class="empty__container">
      <h2 class="empty__alert">Oops...</h2>
      <p class="empty__message">It seems that you have not favorited any restaurants yet!</p>
      <a href="/#">Add some restaurant here</a>
    </div>
</div>
`;

const createFaveButtonTemplate = () => `
  <button aria-label="add this restaurant as your favorite" id="favebutton" class="fave">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfaveButtonTemplate = () => `
  <button aria-label="remove this restaurant from your favorite" id="favebutton" class="fave">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createErrorPage = (errorMessage) => `
  <div class="error__container">
    <img src="./web_icons/exclamation-mark.svg" alt="error logo">
    <h2 class="error__title">Blimey!</h2>
    <p class="error__message">${errorMessage}</p>
  </div>
`;

export {
  reviewCards,
  createHero,
  createRestaurantCard,
  createSkipToContent,
  createRestaurantDetailTemplate,
  createNewReview,
  createPopupModal,
  createEmptyFavoriteNote,
  createFaveButtonTemplate,
  createUnfaveButtonTemplate,
  createErrorPage,
};
