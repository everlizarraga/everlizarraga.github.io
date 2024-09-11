import * as btnCount from "./btnCount.js";
import * as uiKit from "./uiTools.js";
import * as boxTools from "./boxTools.js";
import * as catAPI from "./apiCat.js";
import * as storage from "./storage.js";

let GIList;

function createGIList(startList = []) {
  let privateList = startList;
  let cardList = [];
  return {
    addList: function(list) {privateList = [...privateList, ...list.filter(e => !this.includes(e))]},
    addElement: function(e) {if(!this.includes(e)) privateList.push(e)},
    remove: function(e) {privateList = privateList.filter(item => item !== e)},
    includes: function(e) {return privateList.includes(e)},
    getList: function() {return [...privateList]},
    addCardList: function(list) {cardList = [...cardList, ...list]},
    getCardList: function() {return [...cardList]},
  }
}

const contenedor = document.getElementById('template-init-plate-card').parentElement;

const scrollFlag = document.getElementById('scroll-flag');

function init() {
  const btn = document.getElementById('btn-generate');
  btn.addEventListener('click', generateCatsV1);
  GIList = createGIList();
  document.addEventListener(boxTools.listenersName.responseFavDelete, (event) => {
    const urlImg = event.detail.urlImg;
    const option = event.detail.option;
    if(option == uiKit.responseCard.favoriteDelete.yes) {
      const cardList = GIList.getCardList();
      cardList.forEach(card => {
        if(urlImg == uiKit.API.getImgOfCard(card)) {
          uiKit.API.setCardFavorite(card, false);
          // uiKit.API.toggleIconFavorite(card);
        }
      });
    }
  });
}

function createCatPreload() {
  const catPreload = uiKit.API.createCardToy(uiKit.value.cardType.auto);
  const plate = uiKit.API.createPlate();
  plate.append(catPreload);
  return plate;
}

async function generateCatsV1() {
  //1. Obtener Count
  const count = btnCount.API.getCount();

  //2. Poner el preload de carga
  const preloadCat = createCatPreload();
  scrollFlag.after(preloadCat);
  uiKit.API.simpleScroll(scrollFlag);

  //3. Llamar a la funcion que llamara a los CATS 
  cargarCatsV1(count, preloadCat);
}

async function cargarCatsV1(count, preloadCat) {
  //1. Hacer la peticion segun el count
  const listCats = await catAPI.API.realizarPeticion(count); //[url, url, ...]
  console.log(listCats);
  
  //1.1 Antes hay que agregar a la lista GIList
  GIList.addList(listCats);

  //2. Poner en cards y palet todas las imagenes y esperar a que todas se carguen
  const listCards = await loadCardsParallel(listCats); //[card, card, ...]
  console.log(listCards);
  //2.1 Guardar tambien la card
  GIList.addCardList(listCards);

  //3. Cargar todo en un plate
  const plate = uiKit.API.createPlate(preloadCat);
  listCards.forEach((card) => {
    //3.1 Setear como favoritos a las cards que esten en favoritos
    if(storage.API.containsCard(card)) uiKit.API.setCardFavorite(card, true);
    //3.2 Agregar a la plate
    plate.append(card);
  });

  //4. Luego que todas se cargaron correctamente reemplazar el cat load por las nuevas imagenes.
  preloadCat.replaceWith(plate);
  // uiKit.API.simpleScroll(plate);
  uiKit.API.simpleScroll(scrollFlag);

  console.groupCollapsed('Urls Img favorites');
  console.log(JSON.stringify(storage.API.getFavoritesUrl()));
  console.groupEnd();
}

async function loadCardsParallel(listCats) {
  const listCards = [];

  try {
    const loadImages = await boxTools.API.preloadImagesParallel(
      listCats,
      (loaded, total) => {progressCallback('unPunteroX', loaded, total);}
    );
    console.log('Todas las imagenes se cargaron en cache !!!!');
    loadImages.forEach((img) => {
      const card = uiKit.API.createCard(img.src, uiKit.value.cardType.auto);
      listCards.push(card);
      // console.log(card);
    });
    return listCards;
  } catch (error) {
    console.error('ERROR al precargas las imagenes: ', error);
  }

}


function progressCallback(cardPreloadPointer, loaded, total) {
  console.log("Progress: %d / %d", loaded, total);
}



export {init};