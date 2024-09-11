import * as btnCount from "./modules/btnCount.js";
import * as uiKit from "./modules/uiTools.js";
import * as genCat from "./modules/generateCats.js";
import * as controlClick from "./modules/controlClick.js";
import * as storage from "./modules/storage.js";
import * as favControl from "./modules/favoriteControl.js";
import * as contextMenu from "./modules/layerContextMenu.js";

const favoritList = [];

// INICIALIZANDO
// Generalmente los init son para agregar los listeners a los botones y estructuras necesarias.

// document.addEventListener('DOMContentLoaded', () => {
// });
storage.API.init();
favControl.API.init();
btnCount.init();
genCat.init();
controlClick.init();
contextMenu.init();

