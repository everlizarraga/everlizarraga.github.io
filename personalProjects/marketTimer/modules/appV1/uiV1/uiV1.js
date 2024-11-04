import * as controlTimer from "../controlTimer.js";
import * as mointorSection from "./monitor.js";
import * as groupsSection from "./groups.js";
import * as cardGroup from "./cardGroup.js";
import * as cardAlarm from "./cardAlarm.js";
import * as formGroup from "./formGroup.js";
import * as watch from "../watch.js";

const colorsClass = [
  'color-blue',
  'color-gray-dark',
  'color-gray-light',
  'color-green',
  'color-orange',
  'color-pink',
  'color-red',
  'color-yellow'
];

const uiSection = document.getElementById('selected-v1');
const btnAddGroupElement = uiSection.querySelector('.groups__title-btn--add');
const btnAcetForm = uiSection.querySelector('.crod__btn--aceptar');
const btnDeleteGroup = uiSection.querySelector('.mode__btn--delete');

function init() {
  mointorSection.init();
  groupsSection.init();
  cardGroup.init();
  cardAlarm.init();
  formGroup.init(callbackDeleteGroup);

  document.addEventListener('marketTimer:GroupCRUD', workEventGroup);

  document.addEventListener('marketTimer:addAlarm', createAlarmInMonitor);

  uiSection.addEventListener('click', (event) => {
    if(event.target.closest('#selected-v1 .group-element__btn-option')) {
      console.log("3 pts");
      //1ro habria que tomar el id guardada en el dataset de la card
      const cardGroupSelec = event.target.closest('#selected-v1 .group-element__container');
      const groupId = cardGroup.API.getDataGroupId(cardGroupSelec);
      //2do hacer la peticion para obtener la info
      const groupInfo = controlTimer.API.readGroup(groupId);
      //3ro recien abrir el edit para que muestre toda la data 
      if(groupInfo) {
        formGroup.API.activeFormEditGroup(callbackEdit, groupInfo);
      } else {
        console.error('ERROR: no se pudo obtener la info del grupo(%s) core -> cardGroup', groupId);
      }
    }
    
    if(event.target.closest('.groups__title-btn--add') == btnAddGroupElement) {
      console.log('>> Add Group');
      formGroup.API.activeFormAddGroup(callbackAcept);
    }

  });
}

function callbackDeleteGroup() {
  const info = formGroup.API.getFormInfo();
  if(confirm(`¿Seguro que desea eliminar el grupo (${info.groupName})?`)) {
    const id = formGroup.API.getDataGroupId();
    controlTimer.API.deleteGroup(id);
    formGroup.API.disableForm();
  }
}

function callbackAcept() {
  const info = formGroup.API.getFormInfo();
  console.log(info);
  controlTimer.API.createGroup(info.groupName, info.groupReset, info.groupColor, info.timerList);
  formGroup.API.disableForm();
}

function callbackEdit() {
  //1. Tomar la nueva data del form
  const groupInfo = formGroup.API.getFormInfo();
  const groupId = formGroup.API.getDataGroupId();
  //2. segun el id del grupo reenviar la nueva data al core
  controlTimer.API.updateGroup(groupId, groupInfo);

  formGroup.API.disableForm();
}

function workEventGroup(event) {
  // console.log(':::::> Recibido Evento en worker');
  const workType = event.detail.modeCRUD;

  if(workType == 'CREATE') {
    const newCard = createCardGroup(event.detail.info);
    groupsSection.API.addCardGroup(newCard);
  }

  if(workType == 'DELETE') {
    const id = event.detail.info.groupId;
    const targetElement = groupsSection.API.getCardGroupElement(id);
    targetElement.remove();
  }
  
  if(workType == 'UPDATE') {
    const id = event.detail.info.groupId;
    const targetElement = groupsSection.API.getCardGroupElement(id);
    const newCard = createCardGroup(event.detail.info);
    targetElement.replaceWith(newCard);
  }
}

function createCardGroup(infoGroup) {
  const info = infoGroup;
  
  const id = info.groupId;
  const title = info.groupName;
  const color = info.groupColor;
  const timerList = info.timerList;
  let mensaje = '/';
  if(timerList.length > 0) {
    timerList.forEach(e => {
      mensaje += `${e.time}${e.timeType}/`
    });
  }
  return cardGroup.API.createCardGroup(id, title, mensaje, color);
}

function createAlarmInMonitor(event) {
  //1. Obtener la info 
  // const info = event.detail.info;
  const info = event.detail;
  // console.log('ZZZZ: ', event.detail);
  //2. Crear la card con la info
  const groupName = info.groupName;
  const alarmList = [];
  if(info.timerList.length > 0) {
    info.timerList.forEach(e => {
      const oneTime = `${e.time} ${e.timeType}`;
      alarmList.push(oneTime);
    });
  }
  const classColor = info.groupColor;
  const fecha = new Date();
  // const fechaText = `${fecha.getHours()}:${fecha.getMinutes() + 1} hs`;
  // const fechaText = `${fecha.getHours()}:${fecha.getMinutes()} hs`;
  const fechaText = watch.getSnapTimeWithFormat();
  const newCardAlarm = cardAlarm.API.createCardAlarm(groupName, alarmList, fechaText, classColor);
  //3. Agregar la card al monitor
  mointorSection.API.addCardAlarm(newCardAlarm);
}

export {init};