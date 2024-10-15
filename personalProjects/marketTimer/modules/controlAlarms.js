import * as models from "./models.js";
import * as utils from "./utils.js";
import * as controlSound from "./controlSound.js";
import * as watch from "./watch.js";

const controlAlarm = {}; // Se agrega segun el grupo
const targetAlarmList = [];
let soundHrs;
let soundMins;
let soundSecs;

function init() {
  controlSound.init();
  soundHrs = controlSound.SELECTED_SOUNDS.longSounds._00test;
  soundMins = controlSound.SELECTED_SOUNDS.longSounds._20priceAlertSound;
  soundSecs = controlSound.SELECTED_SOUNDS.shortSounds._04pingSound;
}

function createTargetAlarmNode(targetTime, targetGroup, objetRefernce = []) {
  return {
    targetTime: targetTime,
    targetGroup: targetGroup,
    targetList: objetRefernce,
  }
}

function calculateReset(timeReference, reset) {
  const day = timeReference.getDate();
  const month = timeReference.getMonth();
  const year = timeReference.getFullYear();
  const [rHours, rMinutes] = reset.split(':');
  const auxTimeReset = new Date(year, month, day, rHours, rMinutes, 0);
  if(auxTimeReset > timeReference) {
    auxTimeReset.setDate(auxTimeReset.getDate() - 1);
  }
  return auxTimeReset;
}

function configInitToAlarm(nodeAlarm) {
  let rpta = -1;
  const timesReferences = Object.keys(models.VALUES.timeType);
  if(timesReferences.includes(nodeAlarm.timeType)) {
    nodeAlarm.intervalTime = models.VALUES.timeType[`${nodeAlarm.timeType}`] * nodeAlarm.time;
    const currentTime = watch.getSnapCurrenTime();
    const currentReset = calculateReset(currentTime, nodeAlarm.groupReset);
    const diffTime = currentTime.getTime() - currentReset.getTime();
    const intervalCount = Math.floor(diffTime / nodeAlarm.intervalTime);
    const aproxTime = new Date(currentReset.getTime() + intervalCount*nodeAlarm.intervalTime);
    if(currentTime > aproxTime) {
      nodeAlarm.actualTimeTarget = (new Date(aproxTime.getTime() + nodeAlarm.intervalTime)).getTime();
      nodeAlarm.nexTimeTarget = nodeAlarm.actualTimeTarget + nodeAlarm.intervalTime;
      const nextReboot = currentReset.getTime() + 24*60*60*1000;
      if(nodeAlarm.actualTimeTarget <= nextReboot) {
        if(nodeAlarm.nexTimeTarget > nextReboot) { // se acepta si coincide con la hora exacta del reset.
          nodeAlarm.nexTimeTarget = null;
        }
      } else {
        nodeAlarm.actualTimeTarget = null;
        nodeAlarm.nexTimeTarget = null;
      }
      rpta = nodeAlarm.actualTimeTarget - currentTime.getTime();
    } else {
      console.error('ERROR: Algo salio mal en las cuentas de fechas.');
    }
    // y esta diferencia se traduce en cuantos segundos, minutos u horas?
  } else {
    console.error('ERROR: No coincide el timeType del nodeAlarm con las referencias timetype.');
  }
  return rpta;
}

function doRing(nodeAlarmsList) {
  if(nodeAlarmsList.length > 0) {
    const alarmHrs = nodeAlarmsList.find(e => e.timeType == 'hr' && e.activeAlarm);
    const alarmMins = nodeAlarmsList.find(e => e.timeType == 'min' && e.activeAlarm);
    const alarmSecs = nodeAlarmsList.find(e => e.timeType == 'sec' && e.activeAlarm);
  
    const interval = 600;
    if(alarmHrs) {
      soundHrs();
      if(alarmMins) {
        setTimeout(() => {soundMins()}, interval);
        if(alarmSecs) {
          setTimeout(() => {soundSecs()}, interval*2);
        }
      }
    } else {
      if(alarmMins) {
        soundMins();
        if(alarmSecs) {
          setTimeout(() => {soundSecs()}, interval);
        }
      } else {
        if(alarmSecs) {
          soundSecs();
        } else {
          console.error('ERROR: No deberia llegar aqui. Hay un nodoAlarm que contine un timeType no reconocido');
        }
      }
    }
  }
}

function processAlarm(nodeAlarm, elementOfTargetAlarmList, timeSleep) {
  
  function callbackAlarm() {
    // if(nodeAlarm.enabledAlarm) {
    if(elementOfTargetAlarmList.targetList.find(e => e.enabledAlarm)) {
      // 1. Si la alarma aun esta habilitada, entonces procedo con el resto de la logica.
      const newGroupElement = models.API.createGroup(nodeAlarm.groupName, nodeAlarm.groupReset, nodeAlarm.groupColor, []);
      elementOfTargetAlarmList.targetList.forEach((e) => {
        if(e.enabledAlarm) {
          const newTimerNode = models.API.createTimer(e.time, e.timeType, e.activeAlarm);
          newGroupElement.timerList.push(newTimerNode);
        }
      });

      // Hacer Sonar
      doRing(elementOfTargetAlarmList.targetList.filter(e => e.enabledAlarm && e.activeAlarm));

      // 2. Avisar a las ui de las alarmas
      const myCustomEvent = utils.createCustomeEvent('addAlarm', newGroupElement);
      document.dispatchEvent(myCustomEvent); //[OBS] Comentar para denter los envios.
      // console.log('send EVENT: addAlarm');

      // 3. Eliminando el node de targetAlarmList
      const index = targetAlarmList.indexOf(elementOfTargetAlarmList);
      targetAlarmList.splice(index, 1);

      // 4. Poniendo en circulacion todos los nodeAlarms encolados
      elementOfTargetAlarmList.targetList.forEach((e) => {
        if(e.enabledAlarm) {
          if(e.nexTimeTarget) {
            setingNextIntervalAlarm(e);
            if(e.actualTimeTarget) {
              const sleep = e.actualTimeTarget - (watch.getSnapCurrenTime()).getTime();
  
              if(sleep > 0) {
                const targetAlarmExist = targetAlarmList.find(ele => ele.targetTime == e.actualTimeTarget && ele.targetGroup == e.groupId);
                if(targetAlarmExist) {
                  targetAlarmExist.targetList.push(e);
                } else {
                  const newTargetAlarmNode = createTargetAlarmNode(e.actualTimeTarget, e.groupId, [e]);
                  targetAlarmList.push(newTargetAlarmNode);
                  processAlarm(e, newTargetAlarmNode, sleep);
                }
              }
              
            }
          }
        }
      });

    } else {
      // Se tendria que descartar automaticamente
      // No se deberia ir a eliminarla de las estructuras conetenedoras, porque se supone que si esta en false, es porque ya la habian eliminado antes.
    }
  }

  setTimeout(callbackAlarm, timeSleep); 
}

function setingNextIntervalAlarm(nodeAlarm) {
  const currentTime = watch.getSnapCurrenTime();
  const currentReset = calculateReset(currentTime, nodeAlarm.groupReset);
  // const nextReset = currentReset.getTime() + 24*60*60*1000;
  const nextReset = new Date(currentReset);
  nextReset.setDate(nextReset.getDate() + 1);
  nodeAlarm.actualTimeTarget += nodeAlarm.intervalTime;
  nodeAlarm.nexTimeTarget = nodeAlarm.actualTimeTarget + nodeAlarm.intervalTime*2;
  if(nodeAlarm.actualTimeTarget <= nextReset.getTime()) {
    if(nodeAlarm.nexTimeTarget > nextReset.getTime()) {
      nodeAlarm.nexTimeTarget = null;
    }
  } else {
    nodeAlarm.actualTimeTarget = null;
    nodeAlarm.nexTimeTarget = null;
  }
}

function subscribeAlarm(nodeAlarm) {
  // console.log('Subscribe NodeAlarm: ', nodeAlarm);
  if(!(`${nodeAlarm.groupId}` in controlAlarm)) {
    controlAlarm[`${nodeAlarm.groupId}`] = [];
  }
  controlAlarm[`${nodeAlarm.groupId}`].push(nodeAlarm);
  const timeSleep = configInitToAlarm(nodeAlarm);
  if(timeSleep >= 0) {
    const targetAlarmExist = targetAlarmList.find(e => e.targetTime == nodeAlarm.actualTimeTarget && e.targetGroup == nodeAlarm.groupId);
    if(targetAlarmExist) {
      targetAlarmExist.targetList.push(nodeAlarm);
    } else {
      const newTargetAlarmNode = createTargetAlarmNode(nodeAlarm.actualTimeTarget, nodeAlarm.groupId, [nodeAlarm]);
      targetAlarmList.push(newTargetAlarmNode);
      processAlarm(nodeAlarm, newTargetAlarmNode, timeSleep);
    }
  } else {
    console.error('ERROR: Retorno valor negativo el timeSleep (%d) y Puede ser o no xq el siguiente time ([%s] %d %s) del node sobrepasa su propio reset(%s)', timeSleep, nodeAlarm.groupName, nodeAlarm.time, nodeAlarm.timeType, nodeAlarm.groupReset);
  }
}


// const controlAlarm = {}; // Se agrega segun el grupo
// const targetAlarmList = [];

function unsubscribeAlarm(nodeAlarm) {
  if((`${nodeAlarm.groupId}` in controlAlarm)) {
    const listNodesAlarm = controlAlarm[`${nodeAlarm.groupId}`];
    const targetNodeAlarm = listNodesAlarm.find(e => e.identifyTimer() == nodeAlarm.identifyTimer());
    if(targetNodeAlarm) {
      const index = listNodesAlarm.indexOf(targetNodeAlarm);
      listNodesAlarm.splice(index, 1);
      targetNodeAlarm.enabledAlarm = false;
    } else {
      console.error('ERROR: La alarma especificada no matchea con nigun nodeAlarm en controlAlarm');
    }
  } else {
    console.error('ERROR: No se encontro el grupo del nodeAlarm en el controlAlarm');
  }
}

function unsubscribeAllAlarmsFromGroup(groupId) {
  if(`${groupId}` in controlAlarm) {
    controlAlarm[`${groupId}`].forEach(e => {
      e.enabledAlarm = false;
    });
    delete controlAlarm[`${groupId}`];
  } else {
    console.error('ERROR: Group no encontrado en controlAlarm al intentar elminar Todo el grupo (%s)', `${groupId}`);
  }
}


// =========================================================
const API = {
  subscribeAlarm: subscribeAlarm,
  unsubscribeAlarm: unsubscribeAlarm,
  unsubscribeAllAlarmsFromGroup: unsubscribeAllAlarmsFromGroup,
};


export {init, API};