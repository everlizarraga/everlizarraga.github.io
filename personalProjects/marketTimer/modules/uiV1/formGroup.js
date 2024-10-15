import * as models from "../models.js";

const headerMain = document.getElementById('header-main');
const controlView = document.querySelector('#v1-modal-container .contorl-view');

const modal = document.getElementById('v1-modal-container');
const btnDeleteGroup = modal.querySelector('.mode__btn--delete');
const titleFormMode = modal.querySelector('.mode');
const titleAdd = titleFormMode.getAttribute('data-mode-add');
const titleEdit = titleFormMode.getAttribute('data-mode-edit');
const inputTitle = modal.querySelector('.title__input');
const inputReset = modal.querySelector('.reset__input');
const colorSelect = modal.querySelector('.color__btn-container');

const inputTimer = modal.querySelector('.timer-init__input');
const btnTimerType = modal.querySelector('.select-time-type');
// const timerTypeNames = btnTimerType.dataset.timerType.split('/');
const timerTypeNames = Object.keys(models.VALUES.timeType);
// console.log(timerTypeNames);
const btnTimerAdd = modal.querySelector('.timer-init__btn--add');

const timerListContainer = modal.querySelector('.set-timer__items');
let templateTimeItem = modal.querySelector('.timer-item-template');

const btnCancel = modal.querySelector('.crod__btn--cancelar');
const btnAcept = modal.querySelector('.crod__btn--aceptar');

//timer-btn--delete

let callbackFnAcept;
let callbackArgAcept;
let callbackFnDelete;

const colorsClass = [
  'color-blue',
  'color-yellow',
  'color-orange',
  'color-red',
  'color-pink',
  'color-green',
  'color-gray-dark',
  'color-gray-light',
];

function init(callbackDeleteGroup){
  // modal.remove();
  modal.classList.add('disable');
  templateTimeItem = modal.querySelector('.timer-item-template').cloneNode(true);
  timerListContainer.innerHTML = "";
  inputReset.value = '18:00';
  // console.log(getFormInfo());
  modal.setAttribute('data-group-id', '1233');
  // modal.dataset.groupId = '1234';
  // console.log(getFormInfo());
  callbackFnDelete = callbackDeleteGroup;

  // Listeners
  modal.addEventListener('click', addListeners);
  inputTimer.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {addTimer()}
  });
}

function addListeners(event) {
  if(event.target.closest('.timer-btn--delete')) {
    const elemParent = event.target.closest('.timer-item-template');
    elemParent.remove();
  }
  
  if(event.target.closest('.select-time-type') == btnTimerType) {
    let index = timerTypeNames.indexOf(btnTimerType.textContent);
    index = (index + 1) % timerTypeNames.length;
    btnTimerType.textContent = timerTypeNames[index];
  }

  if(event.target.closest('.color__btn-container') == colorSelect) {
    const btnColor = colorSelect.querySelector('button');
    const currentColor = [...btnColor.classList].find(e => e.includes('color-'));
    let index = colorsClass.indexOf(currentColor);
    index = (index + 1) % colorsClass.length;
    btnColor.classList.remove(currentColor);
    btnColor.classList.add(colorsClass[index]);
  }
  
  if(event.target.closest('.timer-init__btn--add') == btnTimerAdd) {
    addTimer();
  }
  
  if(event.target.closest('.crod__btn--cancelar') == btnCancel) {
    disableForm();
  }
  
  if(event.target.closest('.crod__btn--aceptar') == btnAcept) {
    callbackFnAcept();
    defaultForm();
  }
  
  if(event.target.closest('#selected-v1 .mode__btn--delete') == btnDeleteGroup) {
    console.log(event.target);
    callbackFnDelete();
  }
}

function addTimer() {
  if(inputTimer.value != '') { //getCurrentTimersTextList
    const time = inputTimer.value;
    const timeType = btnTimerType.textContent;
    const texVerificNoRepetTimer = `${time} ${timeType}`;
    // if(!getCurrentTimersTextList().toString().includes(texVerificNoRepetTimer)) {
    if(!getCurrentTimersTextList().find(e => e == texVerificNoRepetTimer)) {
      const newTimer = createTimerItem(time, timeType, true);
      timerListContainer.prepend(newTimer);
      blinkScroll(newTimer);
      topViewAdjust();
      inputTimer.value = '';

      //Algo de efecto
      newTimer.classList.add('timer-alarm');
      setTimeout(() => {newTimer.classList.remove('timer-alarm')},1500);
    } else {
      alert(`Ya existe este timer [ ${texVerificNoRepetTimer} ] en la lsita`);
      inputTimer.value = '';
    }
  } else {
    console.error('ERROR: ingrese una valor valido');
  }
}

function defaultForm() {
  titleFormMode.querySelector('h3').textContent = titleAdd;
  btnDeleteGroup.classList.remove('disable');
  inputTitle.value = '';
  inputReset.value = '18:00';
  inputTimer.value = '';
  timerListContainer.innerHTML = '';
  btnTimerType.textContent = timerTypeNames[1];

  const btnColor = colorSelect.querySelector('button');
  const currentColor = [...btnColor.classList].find(e => e.includes('color-'));
  if(currentColor) {
    btnColor.classList.remove(currentColor);
    btnColor.classList.add(colorsClass[0]);
  }

  setDataGroupId('');
}

function getFormInfo() {
  // Hay que retornar un object con toda la data
  let timerList = [];
  if(timerListContainer.innerHTML != '') {
    const elements = [...timerListContainer.children];
    elements.forEach((e) => {
      const [time, timeType] = e.querySelector('.timer__time').textContent.split(' ');
      const inputState = e.querySelector('input').checked;
      const newTimer = models.API.createTimer(time, timeType, inputState);
      timerList.push(newTimer);
    });
  }
  const groupName = (inputTitle.value != '')? inputTitle.value:'NONE'
  const newGroup = models.API.createGroup(groupName, inputReset.value, getClassColorSelect(), timerList);

  return newGroup;
}

function getClassColorSelect() {
  const btnColor = colorSelect.querySelector('button');
  const currentColor = [...btnColor.classList].find(e => e.includes('color-'));
  return currentColor;
}

function createTimerItem(time, timeType, alarmActive = true) {
  const newTimer = templateTimeItem.cloneNode(true);
  const timerTime = newTimer.querySelector('.timer__time');
  const alarm = newTimer.querySelector('input');

  timerTime.textContent = `${time} ${timeType}`;
  if(alarmActive) {
    alarm.setAttribute('checked', '');
  }

  return newTimer;
}

// Arreglando que los timers no se repitan:
function getCurrentTimersTextList() {
  const elements = [...timerListContainer.children];
  const lista = [];
  return elements.map(e => e.querySelector('.timer__time').textContent);
}

function simpleScroll(child) {
  child.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function blinkScroll(child) {
  child.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function activeFormAddGroup(callback) {
  defaultForm();
  btnDeleteGroup.classList.add('disable');
  titleFormMode.querySelector('h3').textContent = titleAdd;
  modal.classList.remove('disable');
  callbackFnAcept = callback;
  simpleScroll(controlView);
}

function activeFormEditGroup(callback, info) {
  defaultForm();
  btnDeleteGroup.classList.remove('disable');
  titleFormMode.querySelector('h3').textContent = titleEdit;
  modal.classList.remove('disable');
  if(info) {
    implementInfoToForm(info);
  }
  callbackFnAcept = callback;
  simpleScroll(controlView);
}

function disableForm() {
  modal.classList.add('disable');
  defaultForm();
}

function implementInfoToForm(info) {
  inputTitle.value = info.groupName;
  inputReset.value = info.groupReset;
  inputTimer.value = '';

  const btnColor = colorSelect.querySelector('button');
  const currentColor = [...btnColor.classList].find(e => e.includes('color-'));
  if(currentColor) {
    btnColor.classList.remove(currentColor);
  }
  btnColor.classList.add(info.groupColor);

  if(info.timerList.length > 0) {
    const timerList = [...info.timerList].reverse();
    timerList.forEach((e) => {
      const newTimer = createTimerItem(e.time, e.timeType, e.activeAlarm);
      timerListContainer.prepend(newTimer);
    });
  }

  if(info.groupId) {
    setDataGroupId(info.groupId);
  }
}

function getDataGroupId() {
  console.log('groupId: ',modal.dataset.groupId);
  return modal.getAttribute('data-group-id');
}

function setDataGroupId(value) {
  modal.setAttribute('data-group-id', value);
}

function topViewAdjust() {
  blinkScroll(headerMain);
}

const API = {
  getFormInfo: getFormInfo,
  activeFormAddGroup: activeFormAddGroup,
  activeFormEditGroup: activeFormEditGroup,
  disableForm: disableForm,

  getDataGroupId: getDataGroupId,
  setDataGroupId: setDataGroupId, //...(value)
};


export {init, API};