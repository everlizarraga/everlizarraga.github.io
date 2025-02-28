import * as apiTMDB from "./apiTMDB.js";
import * as helpers from "../utils/helpers.js";

const formSearchHeader = document.querySelector('.search-header');
const searchHeader = formSearchHeader.querySelector('.search__input');

const formSearchMenu = document.querySelector('.search-menu');
const searchMenu = formSearchMenu.querySelector('.search__input');

// INTERSECTIONoBSERVER()
let observerCardImg;

function init(sharedObject) {
  observerCardImg = sharedObject.observerCardImg;
  formSearchHeader.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('formSearchHeader');
    executeSearch(searchHeader);
  });
  formSearchMenu.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('formSearchMenu');
    executeSearch(searchMenu);
  });
}

function executeSearch(inputText) {
  const movieSearch = inputText.value;
  if(movieSearch.length == 0) {alert('Input vacio');}
  inputText.value = '';
  location.hash = `#search=${helpers.API.replaceCharacters(movieSearch, " ", "_")}`;
}


export { init };