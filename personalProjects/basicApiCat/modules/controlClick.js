import * as favControl from "./favoriteControl.js";
import * as uiKit from "./uiTools.js";
import * as contexMenu from "./layerContextMenu.js";

const clickableElements = {
  iconFavorite: 0,
  iconOptions: 1,
  iconExpand: 2,
};

function init() {
  document.addEventListener('click', fnControl);
}

function fnControl(event) {
  const target = event.target;
  const targetType = typeElementDetect(target);
  
  switch (targetType) {
    case clickableElements.iconFavorite:
      favControl.API.manageFavorites(target);
      break;
    case clickableElements.iconOptions:
      contexMenu.API.manageOptions(target);
      break;
    case clickableElements.iconExpand:
      openNewWindow(target);
      break;
  
    default:
      console.warn('Unrecognized Element');
      break;
  }

}

function typeElementDetect(target) {
  if(uiKit.API.isIconFavorite(target)) {
    return clickableElements.iconFavorite;
  }
  if(uiKit.API.isIconOptions(target)) {
    return clickableElements.iconOptions;
  }
  if(uiKit.API.isIconExpand(target)) {
    return clickableElements.iconExpand;
  }
  console.log('Other element ....');
}


function openNewWindow(target) {
  const card = uiKit.API.detectCardOfOptionBtn(target);
  const urlImg = uiKit.API.getImgOfCard(card);
  window.open(urlImg, '_blank');
}


export {init};