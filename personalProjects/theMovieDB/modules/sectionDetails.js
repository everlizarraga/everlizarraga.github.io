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

// ///////////////////////////////////////////////////////
let fnBtnActionPlayTrailer = () => {console.log("PLAY TRAILER !!!")};


function init() {
  categoriesContanier.innerHTML = '';
  btnPLayTrailer.addEventListener('click', fnBtnActionPlayTrailer);
  //[FALTA] Agregar la funcionalidad del btn BACK
}


/**
 * Inserta informacion de una Movie en DETAILS-Section
 * @param {MovieXd} movie 
 */
function injectInformation(movie, callback) {
  bgMobile.setAttribute('src', movie.imgBgW500?? "");
  bgMobile.setAttribute('alt', movie.title?? "");
  bgDesktop.setAttribute('src', movie.imgBgOriginal?? "");
  bgDesktop.setAttribute('alt', movie.title?? "");
  pathImg.setAttribute('src', movie.imgPathW500?? "");
  pathImg.setAttribute('alt', movie.title?? "");

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
    categoriesContanier.appendChild(newCard);
  });

}

function cleanPreviewInfo() {
  const auxMovie = new MovieXd({});
  injectInformation(auxMovie);
  similarMovieCotnainer.innerHTML = '';
  categoriesContanier.innerHTML = '';
}

function injectSimilarMovies(movieList = []) {
  movieList.forEach(e => {
    const newCard =  cardTemplateMovie.cloneNode(true);
    const title = newCard.querySelector('.card__title');
    const img = newCard.querySelector('.card__img');

    title.textContent = e.title;
    img.setAttribute('src', e.imgPathW300);
    img.setAttribute('alt', e.title);
    newCard.setAttribute('data-api-id', `${e.id}`);

    similarMovieCotnainer.appendChild(newCard);
    
    //Asignando una Accion para las card
    newCard.addEventListener('click', () => {
      location.hash = `#movie=${e.id}-${helpers.API.replaceCharacters(e.title, " ", "_")}`;
    })
  });
}

async function procedToExecute() {
  //Obtener info del hash
  const currentHash = location.hash; // "#movie=1234-una_plei"
  const currentIdMovie = currentHash.substring(7).split('-')[0];

  //Hacer peticion a la API
  const movie = await apiTMDB.API.getDetailsMovieForId(currentIdMovie);
  // console.log(movie);
  injectInformation(movie);

  //Buscar Peliculas Similares
  const similarMovieList = await apiTMDB.API.getSimilarMoview(movie.id);
  // console.log('similarMovieList:', similarMovieList);
  injectSimilarMovies(similarMovieList.results);
}



// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
function showSection(trueFalse = true) {
  if(trueFalse) {
    detailsMovieSection.classList.remove('disable');
    cleanPreviewInfo();
    procedToExecute();
  } else {
    detailsMovieSection.classList.add('disable');
  }
}

const API = {
  showSection(value) {showSection(value)},
};

export { init, API };