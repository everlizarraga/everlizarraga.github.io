import { MovieXd } from "./movieClass.js"
import * as helpers from "../utils/helpers.js";
import * as apiTMDB from "./apiTMDB.js";

const detailsMovieSection = document.querySelector('.details-section');

const bgMobile = detailsMovieSection.querySelector('.details-bg__mobile');
const bgDesktop = detailsMovieSection.querySelector('.details-bg__desktop');
const pathImg = detailsMovieSection.querySelector('.details-info__img');

const movieRate = detailsMovieSection.querySelector('.rate-section__rate');
const movieTime = detailsMovieSection.querySelector('.overlay__time');
const movieTag = detailsMovieSection.querySelector('.overlay__type-movie');

const movieTitle = detailsMovieSection.querySelector('.details-info__title');
const movieDetails = detailsMovieSection.querySelector('.details-info__description');
const movieReleased = detailsMovieSection.querySelector('.details-info__released span');

const btnPLayTrailer = detailsMovieSection.querySelector('.btn--play-trailer');

// ///////////////////////////////////////////////////////
const categoriesContanier = detailsMovieSection.querySelector('.details-info__categories-container');
const categoryTemplate = detailsMovieSection.querySelector('.details-info__categories-container .details-info__category').cloneNode(true);

// ///////////////////////////////////////////////////////
const similarMovieCotnainer = detailsMovieSection.querySelector('.details-section__similar-movies .carousel__container-cards');
const btnSimilarMovies = detailsMovieSection.querySelector('.details-section__similar-movies .carousel__btn-see-all');
const cardTemplateMovie = detailsMovieSection.querySelector('.details-section__similar-movies .card').cloneNode(true);
cardTemplateMovie.classList.remove('disable');

// INTERSECTIONoBSERVER()
let observerCardImg;

// ///////////////////////////////////////////////////////
let fnBtnActionPlayTrailer = () => {console.log("PLAY TRAILER !!!")};
let fnViewMoreSimilarMoviesAsigned = () => {};

function init(sharedObject) {
  observerCardImg = sharedObject.observerCardImg;
  categoriesContanier.innerHTML = '';
  btnPLayTrailer.addEventListener('click', fnBtnActionPlayTrailer);
  categoriesContanier.addEventListener('click', delegateOnClickCategories);
  // btnSimilarMovies.addEventListener('click', fnViewMoreSimilarMoviesAsigned);
  btnSimilarMovies.addEventListener('click', () => {fnViewMoreSimilarMoviesAsigned()});
}


/**
 * Inserta informacion de una Movie en DETAILS-Section
 * @param {MovieXd} movie
 */
function injectInformation(movie, callback) {
  //Asignar un ID
  const idAsigned = helpers.API.generateId();
  bgMobile.setAttribute('data-idasigned', idAsigned);
  bgDesktop.setAttribute('data-idasigned', idAsigned);
  pathImg.setAttribute('data-idasigned', idAsigned);

  //Funciones de comprobacion:
  const arrayFnComprobation = [(elemImg) => elemImg.getAttribute('data-idAsigned') === idAsigned];

  // bgMobile.setAttribute('src', movie.imgBgW500?? "");
  bgMobile.setAttribute('alt', movie.title?? "");
  // bgDesktop.setAttribute('src', movie.imgBgOriginal?? "");
  bgDesktop.setAttribute('alt', movie.title?? "");
  // pathImg.setAttribute('src', movie.imgPathW500?? "");
  pathImg.setAttribute('alt', movie.title?? "");

  // Para BG_Mobile
  helpers.API.loadImgsOnElement(
    bgMobile, 
    [movie.imgBgW300, movie.imgBgW500, movie.imgBgOriginal], 
    arrayFnComprobation
  );

  // Para BG_Desktop
  helpers.API.loadImgsOnElement(
    bgDesktop,
    [movie.imgBgW300, movie.imgBgW500, movie.imgBgOriginal], 
    arrayFnComprobation
  );
  helpers.API.loadImgsOnElement(
    pathImg,
    [movie.imgPathW300, movie.imgPathW500], 
    arrayFnComprobation
  );

  // movieRate.textContent = movie.rate?? "";
  movieRate.textContent = `${movie.rate}`.substring(0, 3);
  movieTime.textContent = movie.runtime?? "";
  movieTag.textContent = helpers.API.extractLabelOfHash();

  movieTitle.textContent = movie.title?? "";
  movieDetails.textContent = movie.details?? "";
  movieReleased.textContent = movie.release?? "";

  if(callback){
    fnBtnActionPlayTrailer = callback;
  } else {
    // console.log("FALTA implementar la busque de trailers con otras APIs");
  }

  //Agregando las categorias
  movie.categoriesFull.forEach(e => {
    const newCard = categoryTemplate.cloneNode(true);
    newCard.textContent = e.name;
    newCard.setAttribute('data-category-id', e.id);
    categoriesContanier.appendChild(newCard);
  });

}

function delegateOnClickCategories(event) {
  const targetCategory = event.target.closest('.details-info__category');
  if(targetCategory) {
    // Prevenir selección de texto mientras se arrastra
    document.body.style.userSelect = 'none';
    location.hash = `#category=${targetCategory.getAttribute('data-category-id')}-${helpers.API.replaceCharacters(targetCategory.textContent, " ", "_")}`;
    document.body.style.userSelect = '';
  }
}

function cleanPreviewInfo() {
  const auxMovie = new MovieXd({
    details: '',
    id: 0,
    label: '',
    rate: '',
    release: '',
    runtime: '',
    title: '',
    type: '',
    urlBgPathOriginal: '',
    urlBgPathW300: '',
    urlBgPathW500: '',
    urlImgPathOriginal: '',
    urlImgPathW300: '',
    urlImgPathW500: '',
    categoriesFull: [],
    categoriesIds: []
  });
  injectInformation(auxMovie);
  similarMovieCotnainer.innerHTML = '';
  categoriesContanier.innerHTML = '';
  bgMobile.setAttribute('src', '');
  bgDesktop.setAttribute('src', '');
  pathImg.setAttribute('src', '');
}

function injectSimilarMovies(movieList = []) {
  movieList.forEach(e => {
    const newCard =  cardTemplateMovie.cloneNode(true);
    const title = newCard.querySelector('.card__title');
    const img = newCard.querySelector('.card__img');

    title.textContent = e.title;
    // img.setAttribute('src', e.imgPathW300);
    img.setAttribute('data-src', e.imgPathW300);
    img.setAttribute('alt', e.title);
    newCard.setAttribute('data-api-id', `${e.id}`);

    similarMovieCotnainer.appendChild(newCard);
    observerCardImg.observe(newCard);

    //Asignando una Accion para las card
    newCard.addEventListener('click', () => {
      location.hash = `#movie=${e.id}-${helpers.API.replaceCharacters(e.title, " ", "_")}`;
    })
  });
}

async function procedToExecute() {
  //Obtener info del hash
  const currentHash = location.hash.substring(7).split('-'); // "#movie=1234-una_plei"
  const currentIdMovie = currentHash[0];
  const currentNameMovie = currentHash[1];

  //Hacer peticion a la API
  const movie = await apiTMDB.API.getDetailsMovieForId(currentIdMovie);
  // console.log(movie);
  injectInformation(movie);

  //Buscar Peliculas Similares
  const similarMovieList = await apiTMDB.API.getSimilarMoview(movie.id);
  // console.log('similarMovieList:', similarMovieList);
  injectSimilarMovies(similarMovieList.results);

  //AsignarFuncionalidad al btn "SEE ALL"
  fnViewMoreSimilarMoviesAsigned = () => {
    location.hash = `#similar=${currentIdMovie}-${currentNameMovie}`;
    console.log("GO similar movies");
  };
}



// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
function showSection(trueFalse = true) {
  if(trueFalse) {
    cleanPreviewInfo();
    detailsMovieSection.classList.remove('disable');
    procedToExecute();
  } else {
    detailsMovieSection.classList.add('disable');
  }
}

const API = {
  showSection(value) {showSection(value)},
};

export { init, API };