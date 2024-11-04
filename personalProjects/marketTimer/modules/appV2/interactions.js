import * as ui from "./uiV2/uiV2.js";
import * as models from "./modelsV2.js";
import * as controlTimer from "./controlTimerV2.js";

// const btnAddGroup = document.getElementById('groups__title-btn--add');


function init() {
  document.addEventListener('click', administerClick);
}

function administerClick(event) {
  if(event.target.closest('#groups__title-btn--add')){
    console.log('+');
    interactionAddAlarm(event);
  }
  if(event.target.closest('.group-element__btn-option')) {
    console.log('...')
    interactionEditAlarm(event);
  }
}

function interactionAddAlarm(event) {
  ui.API.formAlarm.showFormAddAlarm(() => {
    const info = ui.API.formAlarm.getInfo();
    controlTimer.API.createTimer(info.title, info.time, info.timeType, info.dateTimeLocal, true);
    ui.API.formAlarm.clearForm();
    ui.API.formAlarm.hiddenForm();
  });
}


function interactionEditAlarm(event) {
  const targetCardGroup = event.target.closest('.group-element__container');
  // const oldId = ui.API.cardGroup.getDataGroupId(targetCardGroup);
  const oldId = parseInt(ui.API.cardGroup.getDataGroupId(targetCardGroup));
  const info = controlTimer.API.readTimer(oldId);
  // console.log(info);
  ui.API.formAlarm.showFormEditAlarm(
    info,
    () => { //callbackConfirm
      const info = ui.API.formAlarm.getInfo();
      controlTimer.API.deleteTimer(oldId);
      targetCardGroup.remove();
      controlTimer.API.createTimer(info.title, info.time, info.timeType, info.dateTimeLocal, true);
      ui.API.formAlarm.clearForm();
      ui.API.formAlarm.hiddenForm();
    },
    () => { //callbackDelete
      controlTimer.API.deleteTimer(oldId);
      targetCardGroup.remove();
      ui.API.formAlarm.clearForm();
      ui.API.formAlarm.hiddenForm();
    }
  );
}


export {init};