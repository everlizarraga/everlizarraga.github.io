import * as uiKit from "./uiTools.js";
import * as boxTools from "./boxTools.js";

function init() {
  // La idea es que agregar el EventListener personalizado para detectar la card, el tipo de opcion y la opcion para gestionarla.
}

function manageOptions(target) {
  const card = uiKit.API.recognizeCardFromIcon(target);
  const layerOptions = uiKit.API.showCardLayerOptions(card, true);
  layerOptions.addEventListener('click', monitoringOptionsMenu);
}

function monitoringOptionsMenu(event) {
  const target = event.target;
  console.log('<><><><><><> ', target);
  const card = uiKit.API.detectCardOfOptionBtn(target);
  if(target.tagName == 'BUTTON') {
    const option = uiKit.API.detectBtnTypeOfContextMenu(target);
    if(option !== undefined) {
      const urlImg = uiKit.API.getImgOfCard(card);
      switch (option) {
        case uiKit.responseCard.optionsMenu.copyLink:
          boxTools.API.copyImgUrl(urlImg);
          break;
        case uiKit.responseCard.optionsMenu.copyImg:
          boxTools.API.copyPreloadedImage(card);
          console.log('Copiado???');
          break;
      
        default:
          console.error('Opcion no reocnodia en ContextMenu Options');
          break;
      }
    }
    uiKit.API.showCardLayerOptions(card, false);
    target.parentElement.removeEventListener('click', monitoringOptionsMenu);
  } else {
    console.error('no se hizo match con ningun boton !!!');
  }
  
}


// =================================================
// =================================================

const API = {
  manageOptions: manageOptions, //...(target)
}

export {init, API};