import * as favControl from "./favoriteControl.js";
import * as uiKit from "./uiTools.js";

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
      
      break;
    case clickableElements.iconExpand:
      
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
  console.log('Other element ....');
}


export {init};