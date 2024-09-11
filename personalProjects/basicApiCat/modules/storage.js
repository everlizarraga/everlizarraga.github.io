import * as uiKit from "./uiTools.js";
import * as boxTools from "./boxTools.js";

let favoritesList = [];

const DB = {
  keyFavCats: 'favoriteCats',
};

function init() {
  favoritesList = getFavoritesUrl();

  document.addEventListener(boxTools.listenersName.responseFavDelete, (event) => {
    const urlImg = event.detail.urlImg;
    const option = event.detail.option;
    if(option == uiKit.responseCard.favoriteDelete.yes) {
      deleteImgOfLocalstorage(urlImg);
    }
  });
}

function getCacheFavoritesList() {
  return favoritesList;
}

function getFavoritesUrl() {
  // const fav = JSON.parse(localStorage.getItem(DB.keyFavCats) || '[]');
  const storedFavorites = localStorage.getItem(DB.keyFavCats);
  return storedFavorites? JSON.parse(storedFavorites) : [];
}

function saveCard(card) {
  const imgUrl = uiKit.API.getImgOfCard(card);
  return saveImgOfLocalStorage(imgUrl);
}

function saveImgOfLocalStorage(imgUrl) {
  const fav = getCacheFavoritesList();
  let rpta;
  //1. Comprobar que la card no estea en la lista de favoritos
  if(!fav.includes(imgUrl)) {
    //2. Agregar la la lista de favoritos
    fav.push(imgUrl);
    //3. Guardarlo en localstorage
    updateLocalStorage('+');
    rpta = 1;
  } else {
    console.warn('Esta CARD ya existe en favoritos: ', imgUrl);
    rpta = 0;
  }
  //4. Devolver resultado de operacion realizada.
  return rpta;
}

function updateLocalStorage(symbol) {
  localStorage.setItem(DB.keyFavCats, JSON.stringify(favoritesList));
  if(symbol !== undefined) {
    console.log('LocalStorage UPDATE %s%s%s',symbol, symbol, symbol);
  } else {
    console.log('LocalStorage UPDATE ???');
  }
}

function deleteCard(card) {
  const imgUrl = uiKit.API.getImgOfCard(card);
  return deleteImgOfLocalstorage(imgUrl);
}

function deleteImgOfLocalstorage(imgUrl) {
  const fav = getCacheFavoritesList();
  let rpta;
  if(fav.includes(imgUrl)) {
    const index = fav.indexOf(imgUrl);
    fav.splice(index, 1);
    updateLocalStorage('-');
    rpta = 1;
  } else {
    console.error('Esta CARD no existe en favoritos guradados y no se puede eliminar algo que no esta: ', imgUrl);
    rpta = 0;
  }
  return rpta;
}


function containsUrlImg(urlImg) {
  const fav = getCacheFavoritesList();
  return fav.includes(urlImg);
}

function containsCard(card) {
  const imgUrl = uiKit.API.getImgOfCard(card);
  return containsUrlImg(imgUrl);
}

// =========================================

const API = {
  init: init, //...()
  saveCard: saveCard, //...(card)
  deleteCard: deleteCard, //...(card)
  getFavoritesUrl: getCacheFavoritesList, //...()
  containsCard: containsCard, //...(card)
}

export {API};