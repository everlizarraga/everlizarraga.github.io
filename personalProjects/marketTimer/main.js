import * as controlVersioner from "./modules/controlVersioner.js";
import * as controlTimer from "./modules/controlTimer.js";
import * as uiV1 from "./modules/uiV1.js";
import * as controlAlarms from "./modules/controlAlarms.js";
import * as watch from "./modules/watch.js";


document.addEventListener('DOMContentLoaded', () => {
  controlVersioner.init();
  uiV1.init();
  preWorkForSound();
  controlAlarms.init();
  watch.init();

});

function preWorkForSound() {
  const btnStart = document.getElementById('header__btn-time-start');
  const btnAddGroup = document.getElementById('groups__title-btn--add');
  btnAddGroup.classList.add('disable');
  btnStart.addEventListener('click', () => {
    btnStart.remove();
    btnAddGroup.classList.remove('disable');
    controlTimer.init({
      advanceOfTime:{
        sec: 1500,
        min: 21*1000,
        hr: 21*1000
      },
    });
  });
}