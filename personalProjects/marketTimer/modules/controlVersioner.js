import * as appV1 from "./appV1/appV1.js";
import * as appV2 from "./appV2/appV2.js";

let menu = document.getElementById('version-select');
let optionList;

const uiV1 = document.getElementById('selected-v1');
const uiV2 = document.getElementById('selected-v2');
const uiV3 = document.getElementById('selected-v3');

const uiVxList = [uiV1, uiV2, uiV3];

let currentFn;
const btnStart = document.getElementById('header__btn-time-start');

function init() {
  // menu = document.getElementById('version-select');
  optionList = [...menu.children];
  menu.addEventListener('change', (event) => {
    const valueTarget = event.target.value;
    console.log('valueTarget: ',valueTarget);
    changeVersion(valueTarget);
    currentFn = asignFunctionBtnStart(valueTarget);
  });
  menu.dispatchEvent(new Event('change'));

  btnStart.addEventListener('click', (event) => {
    currentFn();
  });
}

function changeVersion(versionValueText) {
  uiVxList.forEach((e) => {e.classList.add('disable')});
  const targetUi = uiVxList.find((e) => e.id.includes(versionValueText));
  if(targetUi) {
    if(versionValueText == 'v2'){
      // Esto es xq' se usara la misma interfaz de la version 1
      uiVxList[0].classList.remove('disable');
    } else {
      targetUi.classList.remove('disable');
      // location.hash = versionValueText; //No necesitas esto porque ya tenes el menu que controla las versiones.
    }
  } else {
    console.error('ERROR section ui no encontrada');    
  }
}

function asignFunctionBtnStart(valueTarget) {
  let fnRef;
  let textreplaceV = document.createElement('p');
  textreplaceV.textContent = valueTarget.toUpperCase();
  if(valueTarget == "v1") {
    fnRef = fnV1;
    // fnRef = function() {appV1.init()};
    // fnRef = () => {appV1.init()};
  }
  if(valueTarget == "v2") {
    fnRef = fnV2;
  }
  if(valueTarget == "v3") {
    fnRef = function() {console.log('Hola V3')}
  }

  return () => {
    btnStart.remove();
    menu.replaceWith(textreplaceV);
    fnRef();
  }
}

function fnV1() {
  appV1.init();
}

function fnV2() {
  appV2.init();
}

export {init};