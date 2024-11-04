import * as models from "./modelsV2.js";
import * as controlAlarm from "./controlAlarmV2.js";
import * as ui from "./uiV2/uiV2.js";
import * as db from "./localStorageV2.js";
import * as watch from "../appV1/watch.js";

let memory = {
  countId: 3,
  listTimers: [
    {
      id: 1,
      title: 'FOREX',
      time: 1,
      timeType: 'min',
      datetimeLocal: '2024-11-01T08:12',
      activeAlarm: true,
    },
    {
      id: 2,
      title: 'LA',
      time: 2,
      timeType: 'min',
      datetimeLocal: '2024-11-01T08:12',
      activeAlarm: true,
    },
  ],
};

function init() {
  const auxMemory = db.API.readLocalStorage();
  if(auxMemory) {
    memory = JSON.parse(auxMemory);
  } else {
    db.API.writeLocalStorage(JSON.stringify(memory));
  }

  executeSavedInfo();
  controlAlarm.init();
}

function getId() {
  const value = memory.countId;
  memory.countId += 1;
  return value;
}

function createNodeTimer(title, time, timeType, datetimeLocal, activeAlarm) {
  return {
    ...models.API.createNodeAlarm(title,time, timeType, datetimeLocal, activeAlarm),
    id: getId(),
  }
}

function searchTimerRefernce(timerId) {
  return memory.listTimers.find(e => e.id == timerId);
}

function executeSavedInfo() {
  if(memory.listTimers.length > 0) {
    memory.listTimers.forEach(e => {
      //1. execute alarms
      controlAlarm.API.runAlarm(e, callbackAlarm);
      //2. Add cards group
      addCardGroup(e);
    });
  }
}

// UI=================================================
function callbackAlarm(node) {
  // const xaxa = models.API.createNodeAlarm();
  const now = watch.getSnapTimeWithFormat();
  const cardAlarm = ui.API.cardAlarm.createCardAlarm(
    node.title,
    [`${node.time} ${node.timeType}`],
    now,
    models.VALUES.classColor.bgGrayDark
  );
  ui.API.monitor.addCardAlarm(cardAlarm);
}

function addCardGroup(node) {
  // const exp = createNodeTimer();
  const info = `${node.datetimeLocal}`;
  const newCardGroup = ui.API.cardGroup.createCardGroup(node.id, node.title, info, models.VALUES.classColorSelectd());
  ui.API.groups.addCardGroup(newCardGroup);
}

// =================================================
function createTimer(title, time, timeType, datetimeLocal, activeAlarm) {
  const newTimer = createNodeTimer(title, time, timeType, datetimeLocal, activeAlarm);
  // Agregar a memory
  memory.listTimers.push(newTimer);
  // Guardar en localstorage
  db.API.writeLocalStorage(JSON.stringify(memory));
  // Ejecutar alarma
  controlAlarm.API.runAlarm(newTimer, callbackAlarm);

  // Como se guarda directamente, se necesita agregar el cardGroup(alarm)
  addCardGroup(newTimer);

  console.log("CreateTimer: ", newTimer);
}

function readTimer(timerId) { // Se usaria para verificar que no se repita ???
  let rpta = null;
  const targetTimer = searchTimerRefernce(timerId);
  if(targetTimer) {
    rpta = {...targetTimer};
  }
  return rpta;
}

function updateTimer(timerId, newNode) {
  const targetTimer = searchTimerRefernce(timerId);
  if(targetTimer) {
    console.log("EDIT_Timer: ", targetTimer);
    //Borra el viejo
    controlAlarm.API.stopAlarm(timerId);
    deleteTimer(timerId);
    //Agrega el nuevo
    createTimer(newNode.title, newNode.time, newNode.timeType, newNode.datetimeLocal, newNode.activeAlarm);
  }
}

function deleteTimer(timerId) {
  const targetTimer = searchTimerRefernce(timerId);
  if(targetTimer) {
    const index = memory.listTimers.indexOf(targetTimer);
    memory.listTimers.splice(index, 1);
    db.API.writeLocalStorage(JSON.stringify(memory));
    controlAlarm.API.stopAlarm(timerId);

    console.log("DelteTimer: ", targetTimer);
  } else {
    console.error('ERROR: No se puede eliminar un timer que no esta en MEMORY');
  }
}

// =================================================

const API = {
  createTimer: createTimer, //...(title, time, timeType, datetimeLocal, activeAlarm)
  readTimer: readTimer, //...(timerId)
  updateTimer: updateTimer, //...(timerId, newNode)
  deleteTimer: deleteTimer, //...(timerId)
};

export {init, API};
