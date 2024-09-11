import * as uiKit from "./uiTools.js";
import * as storage from "./storage.js";
import * as boxTools from "./boxTools.js";

function init() {
  // 1. Pedir la lista de favoritos al storage
  const favoritesList = storage.API.getFavoritesUrl();
  // 2. Crear las crad correspondiente y agregarlos a favoritos section
  if(favoritesList.length > 0) {
    uiKit.API.cleanFavoritesSection();
    const listCard = [];
    favoritesList.forEach((e) => {
      const card = uiKit.API.createCard(e, uiKit.value.cardType.chica);
      listCard.unshift(card);
      if(uiKit.API.detectCheckedStateOfCard(card) == uiKit.value.check.unChecked) uiKit.API.toggleIconFavorite(card);
      uiKit.API.insertCardIntoFavoritesSection(card);
      uiKit.API.setPrincipalCard(listCard[0]);
    });
  };

  document.addEventListener(boxTools.listenersName.responseFavDelete, (event) => {
    const urlImg = event.detail.urlImg;
    const option = event.detail.option;
    if(option == uiKit.responseCard.favoriteDelete.yes) {
      uiKit.API.deleteCardOfFavoritesSection(urlImg);
    }
    console.log('EVENT: [%s][%s]', boxTools.listenersName.responseFavDelete, option);
  });

  document.addEventListener(boxTools.listenersName.responseOptions, (event) => {
    //[FALTA]
  });
}

function manageFavorites(iconFavorite) {
  const card = uiKit.API.recognizeCardFromFavoriteIcon(iconFavorite);
  const stateCard = uiKit.API.detectCheckedStateOfCard(card);
  if(stateCard == uiKit.value.check.unChecked) {
    // Iniciar elproceso de agregado a favoritos:
    // 1. guardar card en storage Y verificar si se pudo o no
    if(storage.API.saveCard(card) > 0) {
      // 2. cread la card en modo favorito
      const urlImg = uiKit.API.getImgOfCard(card);
      const newCard = uiKit.API.createCard(urlImg, uiKit.value.cardType.chica);
      // 3. agregar la newCard en favoritos
      uiKit.API.insertCardIntoFavoritesSection(newCard);
      // 4. cambiar el icono de card a favoritos.
      uiKit.API.toggleIconFavorite(card);
      uiKit.API.toggleIconFavorite(newCard);
      // 4. Por ahora los recien agregados, van primeros en la portada.
      uiKit.API.setPrincipalCard(newCard);
    } else {
      console.warn('Esta Card Ya existe en favoritos: ', card);
    }
  } else {
    // Si ya estaba en favoritos y lo esta desmarcando de favoritos:
    // 1. Generar capa de confirmacion de eliminacion de favoritos.
    const layerReomveFavorites = uiKit.API.showCardLayerRemoveFavorites(card,true);
    // 2. Agregar listener para que envie evento de seleccion de oopcion
    layerReomveFavorites.addEventListener('click', monitoringOptionDeleteFavorites);
  }
}

function monitoringOptionDeleteFavorites(event) {
  // Solo si seleeciona una opcion (button)
  const target = event.target;
  if(target.tagName == 'BUTTON') {
    const card = uiKit.API.detectCardOfOptionBtn(target);
    const urlImg = uiKit.API.getImgOfCard(card);
    //1. Logica para enviar evento personalizado de la respuesta
    let option;
    if(target.classList.contains('btn-confirm')) {
      option = uiKit.responseCard.favoriteDelete.yes;
    } else {
      option = uiKit.responseCard.favoriteDelete.no;
    }
    boxTools.API.sendFavoriteDeleteEvent(urlImg, option);
    //2. Esconder devuelta el layer
    uiKit.API.showCardLayerRemoveFavorites(card, false);
    target.parentElement.removeEventListener('click', monitoringOptionDeleteFavorites);
  }
}

function monitoringOptionOptions() {}


const API = {
  init: init, //...()
  manageFavorites: manageFavorites //...(iconFavorite)
};


export {API};