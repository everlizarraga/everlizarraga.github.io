import * as btnCount from "./btnCount.js";
import * as uiKit from "./uiTools.js";
import * as boxTools from "./boxTools.js";
import * as catAPI from "./apiCat.js";

const contenedor = document.getElementById('template-init-plate-card').parentElement;

const scrollFlag = document.getElementById('scroll-flag');

function init() {
  const btn = document.getElementById('btn-generate');
  btn.addEventListener('click', generateCatsV1);
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
  // contenedor.prepend(preloadCat);
  scrollFlag.after(preloadCat);
  // uiKit.API.simpleScroll(preloadCat);
  uiKit.API.simpleScroll(scrollFlag);
  // uiKit.API.simpleScroll(contenedor);

  //3. Llamar a la funcion que llamara a los CATS 
  await cargarCatsV1(count, preloadCat);
}

async function cargarCatsV1(count, preloadCat) {
  //1. Hacer la peticion segun el count
  const listCats = await catAPI.API.realizarPeticion(count); //[url, url, ...]
  console.log(listCats);
  
  //2. Poner en cards y palet todas las imagenes y esperar a que todas se carguen
  const listCards = await loadCardsParallel(listCats); //[card, card, ...]
  console.log(listCards);

  //3. Cargar todo en un plate
  const plate = uiKit.API.createPlate(preloadCat);
  listCards.forEach((e) => {
    plate.append(e);
  });

  //4. Luego que todas se cargaron correctamente reemplazar el cat load por las nuevas imagenes.
  preloadCat.replaceWith(plate);
  // uiKit.API.simpleScroll(plate);
  uiKit.API.simpleScroll(scrollFlag);
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