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

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

function cleanPreviewInfo() {
  templateCard.classList.remove('disable');
  sectionTitle.textContent = '';
  galeryContainer.innerHTML = '';
  infiniteScroll();
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

async function executeTrendsSection() {
  sectionTitle.textContent = "Trending";

  //galeryContainer
  const data1 = await apiTMDB.API.getTrenndingMoviesPreview(1);
  injectCardsIntoGalery(data1.results);
  packRequest.pageNumber = data1.page;
  packRequest.pageTotal = data1.total_pages;
  mutex = true;
  if(packRequest.pageNumber < packRequest.pageTotal) {
    isPossibleToMakeMoreRequests = true;
    packRequest.pageNumber += 1;

    packRequest.fnRequest = async function() {
      mutex = false
      const data = await apiTMDB.API.getTrenndingMoviesPreview(packRequest.pageNumber);
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

function executePopularSection() {}

function executeUpcomingSection() {}

function executeSearchSection() {}

function executeSimilarSection() {}

// ////////////////////////////////////////////////////////////

function injectCardsIntoGalery(movieList) {
  movieList.forEach(e => {
    const newCard = templateCard.cloneNode(true);
    const title = newCard.querySelector('.card__title');
    const img = newCard.querySelector('.card__img');
    title.textContent = e.title;
    img.setAttribute('src', e.imgPathW300);
    img.setAttribute('alt', e.title);
    newCard.setAttribute('data-api-id', e.id);
    galeryContainer.appendChild(newCard);
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

    //Hacer las peticiones
    // fetchMovies(currentPage);
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

export { API };
