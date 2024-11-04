import * as watch from "../appV1/watch.js";
import * as controlTimerV2 from "./controlTimerV2.js";
import * as uiV2 from "./uiV2/uiV2.js";
import * as interactions from "./interactions.js";

function init() {
  console.log('AppV2 con ui de V1');
  uiV2.init();
  preWorkForSound();
  watch.init();
  controlTimerV2.init();
  interactions.init();
}

function preWorkForSound() {
  const monitorGroups = document.querySelector('#selected-v1 .monitor__groups');
  const groupsTitle = monitorGroups.querySelector('.groups__title');
  const btnAddGroup = document.getElementById('groups__title-btn--add');
  // btnAddGroup.classList.add('disable');
  monitorGroups.classList.remove('disable');
  btnAddGroup.classList.remove('disable');
  groupsTitle.textContent = 'TIMERS';
  // controlTimerV2.init({
  //   advanceOfTime:{
  //     sec: 1500,
  //     min: 21*1000,
  //     hr: 21*1000
  //   },
  // });

}


export {init};
