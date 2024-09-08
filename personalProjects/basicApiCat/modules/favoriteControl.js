import * as uiKit from "./uiTools.js";

function manageFavorites(iconFavorite) {
  const card = uiKit.API.recognizeCardFromFavoriteIcon(iconFavorite);
  const stateCard = uiKit.API.detectCheckedStateOfCard(card);
  if(stateCard == uiKit.value.check.unChecked) {
    console.log('Agregado a favoritos');
  }
  console.log(card);
  uiKit.API.toggleIconFavorite(card);
}


const API = {
  manageFavorites: manageFavorites //
};


export {API};