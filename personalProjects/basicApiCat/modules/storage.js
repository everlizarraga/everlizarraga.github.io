import * as uiKit from "./uiTools.js";

const DB = {
  keyFavCats: 'favoriteCats',
};

// function getdb

function saveToLocalStorage(card) {
  const url = uiKit.API.getImgOfCard(card);

}


const API = {
  saveCardToStorage: saveToLocalStorage, //
}

export {API};