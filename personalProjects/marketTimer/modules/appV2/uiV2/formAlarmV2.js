import * as modelsV2 from "../modelsV2.js";

const modalContainer = document.getElementById('v2-modal-container');
const titleModal = modalContainer.querySelector('.mode h3');

const btnDelete = modalContainer.querySelector('.mode__btn--delete');
const btnAcept = modalContainer.querySelector('.crod__btn--aceptar');
const btnCancel = modalContainer.querySelector('.crod__btn--cancelar');
const btnTimeType = modalContainer.querySelector('.select-time-type');

const times = Object.keys(modelsV2.VALUES.timeType);
let fn_confirm;
let fn_delete;

const inputTitle = document.getElementById('v2-title__input');
const inputTime = document.getElementById('v2-new-time-number');
const inputDatetime = document.getElementById('v2-ref-datetime');

function init() {
  titleModal.textContent = 'ADD  ALARM';
  btnDelete.classList.add('disable');
  btnTimeType.addEventListener('click', initFnAutoChangeValueOfBtnTimeType);
  btnCancel.addEventListener('click', (event) => {
    clearForm();
    modalContainer.classList.add('disable');
  });
  btnAcept.addEventListener('click', (event) => {fn_confirm()});
  btnDelete.addEventListener('click', (event) => {fn_delete()});
}

const controlForm = {
  inputTitle: {
    get: function() {return inputTitle.value},
    set: function(newTextValue) {inputTitle.value = `${newTextValue}`},
  },
  inputTime: {
    get: function() {return inputTime.value},
    set: function(newTextValue) {inputTime.value = `${newTextValue}`},
  },
  inputDatetime: {
    get: function() {return inputDatetime.value},
    set: function(fecha_YYYY_MM_DD, time_Hr, time_Min) {
      if(fecha_YYYY_MM_DD == '') {
        inputDatetime.value = '';
      } else {
        inputDatetime.value = `${fecha_YYYY_MM_DD}T${time_Hr.padStart(2,'0')}:${time_Min.padStart(2,'0')}`
      }
    },
    setText: function(newDateTimeLocal) {
      inputDatetime.value = newDateTimeLocal;
    },
  },
  btnTimeType: {
    get: function() {return btnTimeType.textContent},
    set: function(newTextValue) {btnTimeType.textContent = newTextValue},
  }
};

function initFnAutoChangeValueOfBtnTimeType() {
  let index = times.indexOf(controlForm.btnTimeType.get());
  index = (index + 1) % times.length;
  controlForm.btnTimeType.set(times[index]);
}

function scrollTo() {
  const header = document.getElementById('header-main');
  header.scrollIntoView({behavior: 'smooth', block: 'start'});
}

// =====================================================

function getInfo() {
  return {
    title: controlForm.inputTitle.get(),
    time: controlForm.inputTime.get(),
    timeType: controlForm.btnTimeType.get(),
    dateTimeLocal: controlForm.inputDatetime.get(),
  };
}

function showFormAddAlarm(callbackConfirm) {
  clearForm();
  titleModal.textContent = 'ADD  ALARM';
  fn_confirm = callbackConfirm;
  modalContainer.classList.remove('disable');
  btnDelete.classList.add('disable');
  scrollTo();
  controlForm.btnTimeType.set('min');
}

function showFormEditAlarm(info, callbackConfirm, callbackDelete) {
  clearForm();
  titleModal.textContent = 'EDIT  ALARM';
  fn_confirm = callbackConfirm;
  fn_delete = callbackDelete;
  modalContainer.classList.remove('disable');
  btnDelete.classList.remove('disable');

  controlForm.inputTitle.set(info.title);
  controlForm.inputTime.set(info.time);
  controlForm.inputDatetime.setText(info.datetimeLocal);
  controlForm.btnTimeType.set(info.timeType);

  scrollTo();
}

function hiddenForm() {
  clearForm();
  modalContainer.classList.add('disable');
}

function clearForm() {
  controlForm.inputTitle.set('');
  controlForm.inputTime.set('');
  controlForm.inputDatetime.set('','','');
  controlForm.btnTimeType.set(times[1]);
}

// =====================================================

const API = {
  getInfo: getInfo,
  showFormAddAlarm: showFormAddAlarm,
  showFormEditAlarm: showFormEditAlarm,
  hiddenForm: hiddenForm,
  clearForm: clearForm,
};

export {init, API};
