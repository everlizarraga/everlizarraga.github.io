import * as controlTimer from "./../controlTimer.js";

let tmeplateCardAlarm = document.getElementById('v1-template-card-alarm');
let tmeplateTimeAlarm = tmeplateCardAlarm.querySelector('.log-time').cloneNode(true);

//class: timer-alarm

function init() {
  tmeplateCardAlarm.removeAttribute('id');
  tmeplateCardAlarm.classList.remove('disable');
  tmeplateCardAlarm.remove();
  tmeplateCardAlarm.querySelector('.log__times-container').innerHTML = "";
  // console.log(tmeplateCardAlarm);
}

function createCardAlarm(groupName, alarmList, fecha, classColor) {
  const newCardAlarm = tmeplateCardAlarm.cloneNode(true);
  const colorAlarm = newCardAlarm.querySelector('.log__color');
  const groupNameAlarm = newCardAlarm.querySelector('.log__group span');
  const alarmListContainer = newCardAlarm.querySelector('.log__times-container');
  const fechaAlarm = newCardAlarm.querySelector('.log__local-time span');

  colorAlarm.classList.add(classColor);
  groupNameAlarm.textContent = groupName;
  fechaAlarm.textContent = fecha;
  alarmList.forEach((e) => {
    const newLogTime = createLogTime(e);
    alarmListContainer.prepend(newLogTime)
  });
  newCardAlarm.classList.add('timer-alarm');
  setTimeout(() => {
    newCardAlarm.classList.remove('timer-alarm');
  }, controlerTimeSleep(alarmList));

  return newCardAlarm;
}

function createLogTime(logTimeText) {
  const newLogTime = tmeplateTimeAlarm.cloneNode(true);
  newLogTime.querySelector('span').textContent = logTimeText;
  return newLogTime;
}

function controlerTimeSleep(alarmTextList) {
  const timeAlarm = controlTimer.API.alarmTimeEfectInMiliSec();
  let rpta;
  const textAnalice = alarmTextList.toString();
  if(textAnalice.includes('hr')) {
    rpta = timeAlarm.hr;
  } else {
    if(textAnalice.includes('min')) {
      rpta = timeAlarm.min;
    } else {
      if(textAnalice.includes('sec')) {
        rpta = timeAlarm.sec;
      } else {
        console.error('No deberia llega aqui !!!');
      }
    }
  }

  return rpta;
}

const API = {
  createCardAlarm: createCardAlarm,
};

export {init, API};
