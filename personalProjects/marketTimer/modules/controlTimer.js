import * as models from "./models.js";
import * as utils from "./utils.js";
import * as controlAlarms from "./controlAlarms.js";

let memory = {
  counterId: 2,
  groups: [
    {
      groupId: 1,
      groupName: 'FOREX',
      groupReset: '18:00',
      groupColor: 'color-blue',
      timerList: [
        {
          time: 4,
          timeType: 'hr',
          activeAlarm: true,
        },
        {
          time: 30,
          timeType: 'min',
          activeAlarm: true,
        },
        {
          time: 4,
          timeType: 'sec',
          activeAlarm: true,
        },
      ],
    },
  ],
};

let preWarningTime = {
  sec: 1000,
  min: 20*1000,
  hr: 20*1000
}

function init({advanceOfTime}) {
  const infoSaved = loadInfo();
  if(advanceOfTime) {preWarningTime = advanceOfTime};
  console.log('>> ',preWarningTime);
  if(infoSaved) {memory = JSON.parse(infoSaved)};
  // console.log('infoSaved', infoSaved);
  initializeMemory();
}




// ===================================================
// ===================================================
function saveInfo() {
  const infoSaved = JSON.stringify(memory);
  localStorage.setItem('marketTimer:saveInfo', infoSaved);
}

function loadInfo() {
  return localStorage.getItem('marketTimer:saveInfo');
}

function getIdGroup() {
  const groupId = memory.counterId;
  memory.counterId += 1;
  return groupId;
}

function createTimer(time, timeType, activeAlarm) {
  return models.API.createTimer(time, timeType, activeAlarm);
}

function initializeMemory() {
  if(memory.groups.length > 0) {
    memory.groups.forEach(g => {
      notifyChangesOfGroupToUi('CREATE', g)
      subscribeAlarmsFronGroup(g);
    });
  }
}

// =====================================================

function createGroup(name, timerReset, colorClass, timerList) {
  const newGroup = models.API.createGroup(name, timerReset, colorClass, timerList);
  const id = getIdGroup();
  const nodeGroup = {...newGroup, groupId: id};
  memory.groups.push(nodeGroup);
  saveInfo();

  
  subscribeAlarmsFronGroup(nodeGroup);
  
  //Logica para avisar a las UI para crear group cards
  notifyChangesOfGroupToUi('CREATE', nodeGroup);
}

function findGroupPointer(groupId) {
  return memory.groups.find(g => g.groupId == groupId);
}

function subscribeAlarmsFronGroup(group) {
  // Solo agregar alarmas si hay timers en la lista
  if(group.timerList.length > 0) {
    group.timerList.forEach(e => {
      const nodeAlarm = models.API.createAlarm(group, e);
      controlAlarms.API.subscribeAlarm(nodeAlarm);
    });
  }
}

function updateGroup(groupId, groupInfo) {
  const targetGroup = findGroupPointer(groupId);
  if(targetGroup) {
    //Pisar la info vieja por la nueva
    targetGroup.groupName = groupInfo.groupName;
    targetGroup.groupReset = groupInfo.groupReset;
    targetGroup.groupColor = groupInfo.groupColor;
    targetGroup.timerList = groupInfo.timerList;
    //Enviar cada uno de los alarms para eliminar al modulo alarms.js
    controlAlarms.API.unsubscribeAllAlarmsFromGroup(groupId);
    //Avias al modulo alarms.js de las nuevas alarmas
    subscribeAlarmsFronGroup(targetGroup);

    notifyChangesOfGroupToUi('UPDATE', targetGroup);
    saveInfo();
  } else {
    console.error('ERROR: Terrible. No se encontro un group (%s) que se queria actualizar', groupId);
  }
}

function deleteGroup(groupId) {
  const targetGroup = findGroupPointer(groupId);
  if(targetGroup) {
    notifyChangesOfGroupToUi('DELETE', targetGroup);
    const index = memory.groups.indexOf(targetGroup);
    memory.groups.splice(index, 1);
    //Avisar al modulo alarms.js para elminar alarmas correspondientes
    controlAlarms.API.unsubscribeAllAlarmsFromGroup(targetGroup.groupId);

    saveInfo();
  } else {
    console.error('ERROR: Grupo(%s) no encontrado para elminar.', groupId);
  }
}

function readGroup(groupId) {
  const targetGroup = memory.groups.find(g => g.groupId == groupId);
  let rpta = null;
  if(targetGroup) {
    rpta = {...targetGroup};
  }
  return rpta;
}

function alarmTimeEfectInMiliSec() {
  // return 20000;
  return preWarningTime;
}

function notifyChangesOfGroupToUi(modeCRUD, info) {
  const myCustomEvent = utils.createCustomeEvent('GroupCRUD', {modeCRUD: modeCRUD, info});
  document.dispatchEvent(myCustomEvent);
  // console.log('Evento [GroupCRUD]%s => Enviado', modeCRUD);
  // console.log(myCustomEvent.detail);
}

// ===========================================================

const API = {
  createGroup: createGroup, //name, colorClass, timerList
  readGroup: readGroup, //groupId
  updateGroup: updateGroup, //...(groupId, groupInfo)
  deleteGroup: deleteGroup, //groupId
  alarmTimeEfectInMiliSec: alarmTimeEfectInMiliSec,
};

export {init, API};