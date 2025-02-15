import * as apiTMDB from "./apiTMDB.js"
import { MovieXd } from "./movieClass.js"

// SECTIONS
const heroContainer = document.querySelector('.home-section .hero__container');
const trendingSection = document.querySelector('.home-section .carousel--trending');
const categoriesSection = document.querySelector('.home-section .home-section__categories');
const popularSection = document.querySelector('.home-section .carousel--popular');
const upcomingSection = document.querySelector('.home-section .carousel--upcoming');

// TEMPLATE CARD
const cardTemplate = trendingSection.querySelector('.card').cloneNode(true);
cardTemplate.classList.remove('disable');

function init() {
  initTrendingSection();
  initPopularSection();
  initUpcomingSection();
  initCateoriesList();
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

// const xd = new MovieXd({});
function initHeroHome(movieXdNode, callbackPlay, callbackDetails) {
  const imgBase = heroContainer.querySelector('.hero__img');
  const imgW500 = heroContainer.querySelector('#home-bg-w500');
  const imgW720 = heroContainer.querySelector('#home-bg-w720');

  const heroRate = heroContainer.querySelector('.rate-section__rate');
  const heroTime = heroContainer.querySelector('.overlay__time');

  const heroTitle = heroContainer.querySelector('.headline__title');
  const heroDetails = heroContainer.querySelector('.headline__details');

  const btnPlayTrailer = heroContainer.querySelector('.btn--play-trailer');
  const btnDetails = heroContainer.querySelector('.btn--details');

  // Seteando componentes del hero
  // imgBase.setAttribute('src', movieXdNode.imgPathW500);
  imgBase.setAttribute('src', movieXdNode.imgBgW500);
  imgBase.setAttribute('alt', movieXdNode.title);
  imgW500.setAttribute('srcset', movieXdNode.imgBgW500);
  imgW720.setAttribute('srcset', movieXdNode.imgBgOriginal);
  heroRate.textContent = `${movieXdNode.rate}`.substring(0, 3);
  heroTime.textContent = '1h 55m';
  heroTitle.textContent = movieXdNode.title;
  heroDetails.textContent = movieXdNode.details;

  if(callbackPlay) {
    btnPlayTrailer.addEventListener('click', () => {callbackPlay()});
  }
  if(callbackDetails) {
    btnDetails.addEventListener('click', () => {callbackDetails()});
  }
}

async function initCateoriesList() {
  const data = await apiTMDB.API.getGenres();

  const genresContainer = categoriesSection.querySelector('.carousel__container-cards');
  const btnGenre = genresContainer.querySelector('button').cloneNode(true);
  genresContainer.innerHTML = '';

  data.genres.forEach(e => {
    const newCard = btnGenre.cloneNode(true);
    newCard.textContent = e.name;
    newCard.setAttribute('data-genre-id', e.id);
    genresContainer.appendChild(newCard);
  });

}

async function initTrendingSection() {
  const data = await apiTMDB.API.getTrenndingMoviesPreview(1);

  const cardContainer = trendingSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';
  
  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW500, title: e.title});
    cardContainer.appendChild(newCard);
    // console.log(newCard);
  });

  //Inicializando tambien el HERO-Home con el trending mas votado
  const imgHeroSelected = data.results[0];
  initHeroHome(imgHeroSelected);
}

async function initPopularSection() {
  const data = await apiTMDB.API.getPopularMoviesPreview(1);

  const cardContainer = popularSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';

  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW500, title: e.title});
    cardContainer.appendChild(newCard);
    // console.log(newCard);
  });
}

async function initUpcomingSection() {
  const data = await apiTMDB.API.getUpcommingMoviesPreview(1);

  const cardContainer = upcomingSection.querySelector('.carousel__container-cards');
  cardContainer.innerHTML = '';

  data?.results?.forEach(e => {
    const newCard = createCardElemnt({imgUrl: e.imgPathW500, title: e.title});
    cardContainer.appendChild(newCard);
    // console.log(newCard);
  });
}


export { init };
