import * as controlTimer from "./controlTimer.js";
import * as uiV1 from "./uiV1/uiV1.js";
import * as controlAlarms from "./controlAlarms.js";
import * as watch from "./watch.js";

function init() {
  uiV1.init();
  preWorkForSound();
  controlAlarms.init();
  watch.init();
}

function preWorkForSound() {
  const monitorGroups = document.querySelector('#selected-v1 .monitor__groups');
  const btnAddGroup = document.getElementById('groups__title-btn--add');
  // btnAddGroup.classList.add('disable');
  monitorGroups.classList.remove('disable');
  btnAddGroup.classList.remove('disable');
  controlTimer.init({
    advanceOfTime:{
      sec: 1500,
      min: 21*1000,
      hr: 21*1000
    },
  });
}

export {init};