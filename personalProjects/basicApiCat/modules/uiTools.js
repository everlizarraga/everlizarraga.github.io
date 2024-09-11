const bgPlate = {
  class: ['bg1','bg2'],
  state: 0,
};
const cardCheck = {
  class: ['favorite-icon--checked', 'favorite-icon--unchecked'],
  checked: 0,
  unChecked: 1,
};
const cardType = {
  class:['card-auto','card-chica','card-grande'],
  auto:0,
  chica:1,
  grande:2,
};
const favoriteClassState = {
  class: ['favorite-icon--unchecked','favorite-icon--checked'],
  unChecked: 0,
  checked: 1,
}; 

const iconCat = 'https://i0.wp.com/portal.thatapicompany.com/wp-content/uploads/2024/01/theCatAPI-icon.png?resize=300%2C290&ssl=1';

const defaultImg = 'https://cdn2.thecatapi.com/images/eeg.jpg';

// Template Referencia
function getTemplateOriginalPointer() {
  const templateOriginal = document.getElementById('template-init-plate-card');
  return templateOriginal;
}

// Obtener Template plate
function getTemplatePlate() {
  const templatePlate = getTemplateOriginalPointer().cloneNode(true);
  templatePlate.removeAttribute('id');
  templatePlate.classList.remove('ele-inVisible');
  bgPlate.class.forEach(e => {
    if(templatePlate.classList.contains(e)) {
      templatePlate.classList.remove(e);
    }
  });
  templatePlate.innerHTML = "";
  return templatePlate;
}

// Obtener Tempalte card
function getTemplateCard() {
  const templateOriginal = getTemplateOriginalPointer();
  const templateCard = templateOriginal.querySelector('.card').cloneNode(true);
  const figure = templateCard.querySelector('figure');
  const img = templateCard.querySelector('figure img');
  figure.style.backgroundImage = "";
  img.src = '';
  cardType.class.forEach(e => {
    if(templateCard.classList.contains(e)) {
      templateCard.classList.remove(e);
    }
  });
  return templateCard;
}

// Crear una carta con una url apropiada
function createCard(url, type) {
  const card = getTemplateCard();
  setCardImg(card, url);
  setCardBg(card, url);
  setCardType(card, type);
  return card;
}

// Crear una carta simbolica
function createCardToy(type) {
  const card = createCard(iconCat, type);
  setCardBg(card);
  cleanCardLayer(card, 'card-hover-layer');
  addEfectCard(card, 'card-load-efect-toy');
  return card;
}

function addEfectCard(card, cssClass) {
  const img = getPointerImgOfCard(card);
  img.classList.add(cssClass);
}

function cleanCardLayer(card, layerName) {
  const layer = card.querySelector(`.${layerName}`);
  try {
    if(layer) {
      disbaleElement(layer);
    }
  } catch (error) {
    console.error('No se pude hacer querySelector() a undefined');
    console.log(e);
  }
}

function disbaleElement(element) {
  element.classList.add('ele-inVisible');
}

function enableElement(element) {
  element.classList.remove('ele-inVisible');
}

// Controlador de auto background plate
function autoSetPlateBg(plate) {
  let plateBg;
  const state = bgPlate.state;
  if(state == 0) {
    bgPlate.state = 1;
  } else {
    bgPlate.state = 0;
  }
  plateBg = bgPlate.class[state];
  plate.classList.add(plateBg);
}

// Crear Paleta
function createPlate(plateReference) {
  const plate = getTemplatePlate();
  if(plateReference !== undefined) {
    const bgReference = getPlateBg(plateReference);
    setPlateCustomBg(plate, bgReference);
  } else {
    autoSetPlateBg(plate);
  }
  return plate;
}


function getPointerFavoriteIconOfCard(card) {
  return card.querySelector('.card-hover__top >*:first-child');
}

// switcheador de favoritos
function setCardFavorite(card, fBoole) {
  const cardIcon = getPointerFavoriteIconOfCard(card);
  if(typeof(fBoole) == 'boolean') {
    if(fBoole) {
      cardIcon.classList.remove(cardCheck.class[cardCheck.unChecked]);
      cardIcon.classList.add(cardCheck.class[cardCheck.checked]);
    } else {
      cardIcon.classList.remove(cardCheck.class[cardCheck.checked]);
      cardIcon.classList.add(cardCheck.class[cardCheck.unChecked]);
    }
  } else {
    console.error('FALTA especificar true or false como segundo parametro.');
  }
}


// ===============================================

function setCardBg(card, url) {
  const cardBg = card.querySelector('figure');
  if(url === undefined) {
    cardBg.style.backgroundImage = '';
  } else {
    cardBg.style.backgroundImage = `url(${url})`;
  }
}

function setCardImg(card, url) {
  const cardImg = card.querySelector('figure img');
  cardImg.src = url;
}

function setCardType(card, type) {
  if(type === undefined) {
    console.error('Falto especificar el tipo de card');
  } else {
    cardType.class.forEach((e) => {
      if(card.classList.contains(e)) {
        card.classList.remove(e);
      }
    });
    card.classList.add(cardType.class[type]);
  }
}

function getPlateBg(plate) {
  let bgReference;
  bgPlate.class.forEach((e) => {
    if(plate.classList.contains(e)) {
      bgReference = e;
    }
  });
  return bgReference;
}

function setPlateCustomBg(plate, bgReference) {
  plate.classList.add(bgReference);
}

function simpleScroll(child) {
  child.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollContainerToTop(containerParent) {
  const scrollStep = -containerParent.scrollTop / (500 / 15);
  const scrollInterval = setInterval(function() {
    if (containerParent.scrollTop !== 0) {
      containerParent.scrollTop += scrollStep;
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
  console.log('teoricamente se apico el autoScroll');
}

// ===============================================
function selectIconFavoriteOfCard(card) {
  const iconFavorite = card.querySelector('.card-hover__top >*:first-child');
  return iconFavorite;
}

function toggleIconFavorite(card) {
  const iconFavorite = selectIconFavoriteOfCard(card);
  iconFavorite.classList.toggle('favorite-icon--unchecked');
  iconFavorite.classList.toggle('favorite-icon--checked');
}

function detectCheckedStateOfCard(card) {
  let index; 
  let rpta;
  const iconFavorite = selectIconFavoriteOfCard(card);
  favoriteClassState.class.forEach((e,i) => {
    if(iconFavorite.classList.contains(e)) index = i;
  });
  rpta =  favoriteClassState.class[index].includes('unchecke')? favoriteClassState.unChecked : favoriteClassState.checked;
  return rpta;
}

function recognizeCardFromFavoriteIcon(favoriteIcon) {
  return recognizeCardFromIcon(favoriteIcon);
}

function recognizeCardFromIcon(icon) {
  const card = icon.closest('.card');
  if(card) {
    return card;
  } else {
    console.error('Card unrecognized.');
  }
}

function isIconFavorite(target) {
  return target.classList.contains('favorite-icon');
}

function isIconOptions(target) {
  return target.classList.contains('options-icon');
}

function isIconExpand(target) {
  return target.classList.contains('expand-icon');
}

function getPointerImgOfCard(card) {
  try {
    const img = card.querySelector('.card__img');
    return img;
  } catch (error) {
    console.error('No se pudo reconocer la imagen de esta card.');
  }
}

function getImgOfCard(card) {
  const img = getPointerImgOfCard(card);
  return img.src;
}

// ===============================================
function getPointerFavoritesSection() {
  return document.querySelector('.grilla-favoritos');
}

function getPointerPrincipalCat() {
  const principalCatContainer = document.querySelector('.portada-img-section');
  return principalCatContainer.querySelector('.card');
}

function insertCardIntoFavoritesSection(card) {
  const favoritesSection = getPointerFavoritesSection();
  favoritesSection.prepend(card);
}

function setPrincipalCard(card, check) {
  const urlCard = getImgOfCard(card);
  const newCard = createCard(urlCard, value.cardType.grande);
  if(check === undefined || check === true) toggleIconFavorite(newCard);
  const cardOld = getPointerPrincipalCat();
  cardOld.replaceWith(newCard);
}

function autoRefreshPrincipalCat() {
  const favoritesChildren = getFavoritesChildren();
  if(favoritesChildren.length > 0) {
    setPrincipalCard(favoritesChildren[0]);
  } else {
    const newCard = createCard(defaultImg, value.cardType.grande);
    setPrincipalCard(newCard, false);
  }
}
function getFavoritesChildren() {
  const favoritesSection = getPointerFavoritesSection();
  return [...favoritesSection.children]; //[HTMLCollection] -> [e]
}

function cleanFavoritesSection() {
  const favoritesSection = getPointerFavoritesSection();
  favoritesSection.innerHTML = "";
}

function deleteCardOfFavoritesSection(urlImgRefernce) {
  const children = getFavoritesChildren();
  const cardList = children.filter((e) => (getImgOfCard(e) == urlImgRefernce)? true : false);
  if(cardList.length > 0) {
    cardList[0].remove();
    autoRefreshPrincipalCat();
  }
}

// ===============================================
function showCardLayerRemoveFavorites(card, show) {
  const layerRemoveFavorite = card.querySelector('.layer-delete-of-favorites');
  if(show !== undefined) {
    if(show) {
      layerRemoveFavorite.classList.remove('ele-inVisible');
    } else {
      layerRemoveFavorite.classList.add('ele-inVisible');
    }
  } else {
    console.error('Falto especificar el show');
  }
  return layerRemoveFavorite;
}

function showCardLayerOptions(card, show) {
  const layerOptions = card.querySelector('.layer-options');
  if(show !== undefined) {
    if(show) {
      layerOptions.classList.remove('ele-inVisible');
    } else {
      layerOptions.classList.add('ele-inVisible');
    }
  } else {
    console.error('Falto especificar el show');
  }
  return layerOptions;
}

function detectCardOfOptionBtn(oneOption) {
  const card = oneOption.closest('.card');
  if(card) {
    return card;
  } else {
    console.error('ERROR: detectCardOfOptionBtn');
  }
}


// ===============================================
function detectBtnTypeOfContextMenu(target) {
  let rpta = null;
  if(target.classList.contains('fn-copy-img')) {
    rpta = responseCard.optionsMenu.copyImg;
  }
  if(target.classList.contains('fn-copy-url')) {
    rpta = responseCard.optionsMenu.copyLink;
  }
  return rpta;
}

// ===============================================
function getImgNode(card) {
  return card.querySelector('.card__img');
}


// ===============================================
// ===============================================
const API = {
  createCard: createCard, //createCard(url, type)
  createCardToy: createCardToy, //createCardToy(type)
  createPlate: createPlate, //createPlate(plateReference)
  setCardFavorite: setCardFavorite, //setCardFavorite(card, fBoole)
  setCardType: setCardType, //setCardType(card, type)
  simpleScroll: simpleScroll, //simpleScroll(child)
  // simpleScroll: scrollContainerToTop, //scrollContainerToTop(containerParent)
  detectCheckedStateOfCard: detectCheckedStateOfCard, //detectCheckedStateOfCard(card)
  toggleIconFavorite: toggleIconFavorite, //toggleIconFavorite(card)
  recognizeCardFromFavoriteIcon: recognizeCardFromFavoriteIcon, // **(_)
  recognizeCardFromIcon: recognizeCardFromIcon, //...(icon)
  isIconFavorite: isIconFavorite, //isIconFavorite(target)
  isIconOptions: isIconOptions, //isIconOptions(target)
  isIconExpand: isIconExpand, //isIconExpand(target)
  getImgOfCard: getImgOfCard, //getImgOfCard(card)
  // Favorites
  insertCardIntoFavoritesSection: insertCardIntoFavoritesSection, //...(card)
  setPrincipalCard: setPrincipalCard, //...(card)
  cleanFavoritesSection: cleanFavoritesSection, //...()
  deleteCardOfFavoritesSection: deleteCardOfFavoritesSection, //...(urlImgRefernce)
  showCardLayerRemoveFavorites: showCardLayerRemoveFavorites, //...(card, show)
  showCardLayerOptions: showCardLayerOptions, //...(card, show)
  detectCardOfOptionBtn: detectCardOfOptionBtn, //...(oneOption)
  detectBtnTypeOfContextMenu: detectBtnTypeOfContextMenu, //...(target)
  getImgNode: getImgNode, //...(card)
};

const value = {
  cardType: {
    auto: cardType.auto,
    chica: cardType.chica,
    grande: cardType.grande,
  },
  check: {
    unChecked: favoriteClassState.unChecked,
    checked: favoriteClassState.checked,
  }
};

const responseCard = {
  favoriteDelete: {
    yes: 1,
    no: 0,
  },
  optionsMenu: {
    copyImg: 0,
    copyLink: 1,
    fixedImg: 2,
    expandImg: 3,
  },
}

export {API, value, responseCard};