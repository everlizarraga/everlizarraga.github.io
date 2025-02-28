import * as apiTMDB from "./apiTMDB.js";
import * as helpers from "../utils/helpers.js";

const genericSection = document.querySelector('.generic-section');

const sectionTitle = genericSection.querySelector('.carousel__title');
const galeryContainer = genericSection.querySelector('.categories-section__galery');
const templateCard = galeryContainer.querySelector('.card').cloneNode(true);

const btnBack = genericSection.querySelector('.btn--go-back');

let mutex = false;
let isPossibleToMakeMoreRequests = false;
const packRequest = {
  fnRequest: () => {},
  pageNumber: 1,
  pageTotal: 1,
};
let fnApiRequestsAsigned = async () => {};

// INTERSECTIONoBSERVER()
let observerCardImg;

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

function init(sharedObject) {
  observerCardImg = sharedObject.observerCardImg;
  clickDelegationGalery();
  infiniteScroll();
}

function clickDelegationGalery() {
  galeryContainer.addEventListener('click', (event) => {
    const target = event.target.closest('.card');
    if(target) {
      const movieTitle = target.querySelector('.card__title').textContent.toLowerCase();
      const movieId = target.getAttribute('data-api-id');
      location.hash = `#movie=${movieId}-${helpers.API.replaceCharacters(movieTitle, " ", "_")}`;
    }
  });
}

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

function cleanPreviewInfo() {
  templateCard.classList.remove('disable');
  sectionTitle.textContent = '';
  galeryContainer.innerHTML = '';
  // infiniteScroll();
}

function procedToExecute() {
  //ver que tipo de hash tengo
  const currentHash = location.hash;

  if(currentHash.startsWith("#trends")) {
    executeTrendsSection();
  } else if(currentHash.startsWith("#popular")) {
    executePopularSection();
  } else if(currentHash.startsWith("#upcoming")) {
    executeUpcomingSection();
  } else if(currentHash.startsWith('#search=')) {
    executeSearchSection();
  } else if(currentHash.startsWith("#similar=")) {
    executeSimilarSection();
  } else {
    console.error('Nunca deberias llegar aquí.');
  }
}

async function executeCurrentSection() {
  const data1 = await fnApiRequestsAsigned(1);
  injectCardsIntoGalery(data1.results);
  packRequest.pageNumber = data1.page;
  packRequest.pageTotal = data1.total_pages;
  mutex = true;
  if(packRequest.pageNumber < packRequest.pageTotal) {
    isPossibleToMakeMoreRequests = true;
    packRequest.pageNumber += 1;

    //ESto es para el scroll infinito
    packRequest.fnRequest = async function() {
      mutex = false
      const data = await fnApiRequestsAsigned(packRequest.pageNumber);
      injectCardsIntoGalery(data.results);
      if(packRequest.pageNumber < packRequest.pageTotal) {
        packRequest.pageNumber += 1;
      } else {
        isPossibleToMakeMoreRequests = false;
      }
      mutex = true;
    };
  } else {
    isPossibleToMakeMoreRequests = false;
  }
}


function executeTrendsSection() {
  sectionTitle.textContent = "Trending";
  fnApiRequestsAsigned = async function(page) {
    return apiTMDB.API.getTrenndingMoviesPreview(page);
  }
  executeCurrentSection();
}

function executePopularSection() {
  sectionTitle.textContent = "Popular";
  fnApiRequestsAsigned = async function(page) {
    return apiTMDB.API.getPopularMoviesPreview(page);
  }
  executeCurrentSection();
}

function executeUpcomingSection() {
  sectionTitle.textContent = "Upcoming";
  fnApiRequestsAsigned = async function(page) {
    return apiTMDB.API.getUpcommingMoviesPreview(page);
  }
  executeCurrentSection();
}

function executeSearchSection() {
  const currentHash = location.hash?? ''; //'#search=name_movie'
  const hashQuery = currentHash.split("#search=")[1]; //['','name_movie']
  sectionTitle.textContent = `Search: ${helpers.API.replaceCharacters(hashQuery, "_", " ")}`;
  const movie = helpers.API.replaceCharacters(hashQuery, "_", "%20");
  fnApiRequestsAsigned = async function(page) {
    return apiTMDB.API.getSearchMovies(movie, page);
  }
  executeCurrentSection();
}

function executeSimilarSection() {
  const currentHash = location.hash.substring(9).split('-'); //'#similar=1234-name_movie'
  const hashId = currentHash[0];
  const hashName = currentHash[1];
  sectionTitle.textContent = `Similar: ${helpers.API.replaceCharacters(hashName, "_", " ")}`;
  fnApiRequestsAsigned = async function(page) {
    return apiTMDB.API.getSimilarMoview(hashId, page);
  }
  executeCurrentSection();
}

// ////////////////////////////////////////////////////////////

function injectCardsIntoGalery(movieList) {
  movieList.forEach(e => {
    const newCard = templateCard.cloneNode(true);
    const title = newCard.querySelector('.card__title');
    const img = newCard.querySelector('.card__img');
    title.textContent = e.title;
    // img.setAttribute('src', e.imgPathW300);
    img.setAttribute('data-src', e.imgPathW300);
    img.setAttribute('alt', e.title);
    newCard.setAttribute('data-api-id', e.id);
    galeryContainer.appendChild(newCard);
    observerCardImg.observe(newCard);
  });
}

function infiniteScroll() {
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    //Comprobaciones
    if(!isHashAcceptable()) {return}
    if (!(scrollTop + clientHeight >= scrollHeight - 300)) {return}
    if(!isPossibleToMakeMoreRequests) {return}
    if(!mutex) {return}
    packRequest.fnRequest();
    console.log('SCROLLING !!!');

  });
}

function isHashAcceptable() {
  const currentHash = location.hash;
  let isCorrect = false;
  if(currentHash.startsWith("#trends") || currentHash.startsWith("#popular") || currentHash.startsWith("#upcoming") || currentHash.startsWith('#search=') || currentHash.startsWith("#similar=")) {
    isCorrect = true;
  }
  return isCorrect;
}



// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
function showSection(trueFalse = true) {
  if(trueFalse) {
    cleanPreviewInfo();
    genericSection.classList.remove('disable');
    procedToExecute();
  } else {
    genericSection.classList.add('disable');
  }
}

const API = {
  showSection(value) {showSection(value)},
};

export { init, API };
