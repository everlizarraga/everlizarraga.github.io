import * as apiTMDB from "./apiTMDB.js"
import { MovieXd } from "./movieClass.js"
import * as helpers from "../utils/helpers.js";

// let myMemory = {};

// SECTIONS
const homeSection = document.querySelector('.home-section');
const heroContainer = document.querySelector('.home-section .hero__container');
const trendingSection = document.querySelector('.home-section .carousel--trending');
const categoriesSection = document.querySelector('.home-section .home-section__categories');
const popularSection = document.querySelector('.home-section .carousel--popular');
const upcomingSection = document.querySelector('.home-section .carousel--upcoming');

const btnTrending = trendingSection.querySelector('.carousel__btn-see-all');
const btnPopular = popularSection.querySelector('.carousel__btn-see-all');
const btnUpcoming = upcomingSection.querySelector('.carousel__btn-see-all');

// TEMPLATE CARD
const cardTemplate = trendingSection.querySelector('.card').cloneNode(true);
cardTemplate.classList.remove('disable');

// LABEL CARD ACTIVE
// const labelDetailSection = document.querySelector('.details-section .details-info__real-details .overlay__type-movie');

// CURRENT CATEGORY
const currentCategory = document.querySelector('.header__nav-option > a[href="#category"]');

function init() {
  initTrendingSection();
  initPopularSection();
  initUpcomingSection();
  initCateoriesList();
}

async function updateRunTime(movieId, callback) {
  const movieTarget = await apiTMDB.API.getDetailsMovieForId(movieId);
  callback(movieTarget.runtime);
}

function createCardElemnt({imgUrl, title}) {
  const newCard = cardTemplate.cloneNode(true);
  const imgElement = newCard.querySelector('.card__img');
  const titleElemnt = newCard.querySelector('.card__title');

  imgElement.setAttribute('src', imgUrl);
  imgElement.setAttribute('alt', title);
  titleElemnt.textContent = title;

  return newCard;
}

// function initHeroHome(movieXdNode, callbackPlay, callbackDetails) {
function initHeroHome(movieXdNode, {callbackPlay, callbackDetails} = {}) {
  const imgBase = heroContainer.querySelector('.hero__img');
  const imgW500 = heroContainer.querySelector('#home-bg-w500');
  const imgW720 = heroContainer.querySelector('#home-bg-w720');

  const heroRate = heroContainer.querySelector('.rate-section__rate');
  const heroTime = heroContainer.querySelector('.overlay__time');
  const heroLabel = heroContainer.querySelector('.overlay__type-movie');

  const heroTitle = heroContainer.querySelector('.headline__title');
  const heroDetails = heroContainer.querySelector('.headline__details');

  const btnPlayTrailer = heroContainer.querySelector('.btn--play-trailer');
  const btnDetails = heroContainer.querySelector('.btn--details');

  // Seteando componentes del hero
  imgBase.setAttribute('src', movieXdNode.imgPathW500);
  // imgBase.setAttribute('src', movieXdNode.imgBgW500);
  imgBase.setAttribute('alt', movieXdNode.title);
  imgW500.setAttribute('srcset', movieXdNode.imgBgW500);
  imgW720.setAttribute('srcset', movieXdNode.imgBgOriginal);
  heroRate.textContent = `${movieXdNode.rate}`.substring(0, 3);
  // heroTime.textContent = '1h 55m';
  heroTime.textContent = movieXdNode.runtime?? '1h 55m';
  heroLabel.textContent = movieXdNode.label?? 'TRENDING';
  heroTitle.textContent = movieXdNode.title;
  heroDetails.textContent = movieXdNode.details;

  updateRunTime(movieXdNode.id, (value) => {heroTime.textContent = value});

  if(callbackPlay) {
    btnPlayTrailer.addEventListener('click', () => {callbackPlay()});
  }
  if(callbackDetails) {
    btnDetails.addEventListener('click', () => {callbackDetails()});
  }
}

async function initCateoriesList() {
  const data = await apiTMDB.API.getGenres(); //[{},{},{}, ...]

  const genresContainer = categoriesSection.querySelector('.carousel__container-cards');
  const btnGenre = genresContainer.querySelector('button').cloneNode(true);
  genresContainer.innerHTML = '';

  data.forEach(e => {
    const newCard = btnGenre.cloneNode(true);
    newCard.textContent = e.name;
    newCard.setAttribute('data-genre-id', e.id);
    genresContainer.appendChild(newCard);

    newCard.addEventListener('click', () => {
      currentCategory.setAttribute('data-current', `${e.id}-${helpers.API.replaceCharacters(e.name, " ", "_")}`);
      location.hash = `#category=${e.id}-${helpers.API.replaceCharacters(e.name, " ", "_")}`;
    });
  });
  
}

async function initTrendingSection() {
  const data = await apiTMDB.API.getTrenndingMoviesPreview(1);
  const label = "TRENDING";

  const cardContainer = trendingSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';
  
  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW300, title: e.title});
    newCard.setAttribute('data-api-id', `${e.id}`);
    newCard.setAttribute('data-label', label);
    cardContainer.appendChild(newCard);
    asignCardToOnclick(e, newCard);
    // console.log(newCard);
  });

  btnTrending.addEventListener('click', () => {
    location.hash = `#trends`;
  });

  //Inicializando tambien el HERO-Home con el trending mas votado
  const labelAsined = 'TRENDING';
  const movieHeroSelected = data.results[0];
  movieHeroSelected.label = movieHeroSelected.label?? labelAsined;
  initHeroHome(movieHeroSelected, {
    callbackDetails: () => {
      // labelDetailSection.textContent = labelAsined;
      location.hash = `#movie=${movieHeroSelected.id}-${helpers.API.replaceCharacters(movieHeroSelected.title, " ", "_")}--${movieHeroSelected.label.toLowerCase()}`;
    },
    callbackPlay: () => {
      console.log('[FALTA] Conectar alguna API para los trailers');
    },
  });
}

async function initPopularSection() {
  const data = await apiTMDB.API.getPopularMoviesPreview(1);
  const label = "POPULAR";

  const cardContainer = popularSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';

  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW300, title: e.title});
    newCard.setAttribute('data-api-id', `${e.id}`);
    newCard.setAttribute('data-label', label);
    cardContainer.appendChild(newCard);
    asignCardToOnclick(e, newCard);
    // console.log(newCard);
  });

  btnPopular.addEventListener('click', () => {
    location.hash = `#popular`;
  });
}

async function initUpcomingSection() {
  const data = await apiTMDB.API.getUpcommingMoviesPreview(1);
  const label = "UPCOMING";

  const cardContainer = upcomingSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';

  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW300, title: e.title});
    newCard.setAttribute('data-api-id', `${e.id}`);
    newCard.setAttribute('data-label', label);
    cardContainer.appendChild(newCard);
    asignCardToOnclick(e, newCard);
  });

  btnUpcoming.addEventListener('click', () => {
    location.hash = `#upcoming`;
  });
}

function asignCardToOnclick(movie, card) {
  card.addEventListener('click', () => {
    location.hash = `#movie=${movie.id}-${helpers.API.replaceCharacters(movie.title, " ", "_")}--${card.getAttribute('data-label').toLowerCase()}`;
    // labelDetailSection.textContent = card.getAttribute('data-label')?? "MOVIE";
  });
}



// ////////////////////////////////////////////////////////////




// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
function showSection(trueFalse = true) {
  if(trueFalse) {
    homeSection.classList.remove('disable');
  } else {
    homeSection.classList.add('disable');
  }
}

const API = {
  showSection(value) {showSection(value)},
};

export { init, API };
