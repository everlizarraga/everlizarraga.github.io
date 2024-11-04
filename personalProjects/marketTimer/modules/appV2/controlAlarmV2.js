import * as modelsV2 from "./modelsV2.js";
import * as watch from "../appV1/watch.js";
import * as sound from "../controlSound.js";

// const classColor = modelsV2.VALUES.classColor.bgGrayLight;

const alarmList = [];

function init() {
  // sound.init();
}

function createAlarmControlStructure(nodeAlarm, callback) {
  return {
    ...nodeAlarm,
    alarmDateTime: new Date(`${nodeAlarm.datetimeLocal}`),
    alarmInterval: Object.entries(modelsV2.VALUES.timeType).find(e => e[0]== nodeAlarm.timeType)[1] * parseInt(nodeAlarm.time),
    alarmIsActive: true,
    fnCallback: (node) => {
      if(node.alarmIsActive){
        callback(node);
      } else {
        console.error('Esta alarma ya no esta activa: ', node);
      }
    },
    codexInterval: 0,
    nextAlarm: 0,
  }
}

function initialConfigAlarm(alarm) {
  // const delta = 30*1000; // Adelantando 30seg
  const delta = 0;
  const now = watch.getSnapCurrenTime();
  // const now = new Date();
  let dif = now.getTime() - alarm.alarmDateTime.getTime();
  let nIntervals;
  let time;
  if(dif >= 0) {
    console.log('Pre time');
    nIntervals = Math.floor(dif / alarm.alarmInterval);
    time = (nIntervals + 1) * alarm.alarmInterval - dif;
  } else {
    console.log('Post time');
    dif = dif * (-1);
    nIntervals = Math.floor(dif / alarm.alarmInterval);
    time = dif - nIntervals*alarm.alarmInterval;
  }
  
  time = time - delta;

  // console.log({now, dif, nIntervals, time});
  // console.log(alarm.alarmDateTime);
  setTimeout(() => {
    alarm.fnCallback(alarm);
    doSound(alarm);
    alarm.codexInterval = setInterval(() => {
      alarm.fnCallback(alarm);
      doSound(alarm);
    }, alarm.alarmInterval);
  }, time);
}

function doSound(alarm) {
  // console.log(alarm)
  sound.MARKET_SOUNDS._27metalsAlertSound();
  setTimeout(() => {sound.MARKET_SOUNDS._27metalsAlertSound()}, 200);
  // sound.SELECTED_SOUNDS.longSounds._00test();
  // sound.SELECTED_SOUNDS.longSounds._20priceAlertSound();
  // sound.SELECTED_SOUNDS.shortSounds._04pingSound();
  // sound.MARKET_SOUNDS._22profitAlertSound();
  // sound.MARKET_SOUNDS._21timeAlertSound();
  // sound.MARKET_SOUNDS._24forexAlertSound();
  // sound.MARKET_SOUNDS._23demandZoneAlertSound();
  // sound.MARKET_SOUNDS._27metalsAlertSound();
  // sound.MARKET_SOUNDS._28volatilityAlertSound();
  // sound.MARKET_SOUNDS._26stockAlertSound();
  // sound.MARKET_SOUNDS._28volatilityAlertSound();
  // sound.MARKET_SOUNDS._29marketCloseAlertSound();
  // sound.MARKET_SOUNDS._25cryptoAlertSound();
}

// ==============================================
function runAlarm(nodeAlarm, callback) {
  // console.log('Run alarm: ', nodeAlarm);
  const alarm = createAlarmControlStructure(nodeAlarm, callback);
  alarmList.push(alarm);
  initialConfigAlarm(alarm);
  console.log("RUN Alarm: ", alarm);
}


function stopAlarm(idAlarm) {
  const alarmTarget = alarmList.find(e => e.id == idAlarm);
  if(alarmTarget) {
    // if(alarmTarget.alarmIsActive) {
      //   clearInterval(alarmTarget.codexInterval);
      // }
      clearInterval(alarmTarget.codexInterval);
      alarmTarget.alarmIsActive = false;
      const index = alarmList.indexOf(alarmTarget);
      alarmList.splice(index, 1);
      // console.log('STOP Alarm - Node: ', alarmTarget);
      console.log('STOP Alarm: ', alarmTarget);
  } else {
    console.error('No deberias buscar alarmas que no estan corriendo.');
  }
}



// ==============================================


const API = {
  runAlarm: runAlarm,
  stopAlarm: stopAlarm,
};

export {init, API};
