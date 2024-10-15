let monitorContainer;
let monitorTitle;
let monitorList;

function init() {
  monitorContainer = document.getElementById('v1-monitor');
  monitorTitle = monitorContainer.querySelector('.monitor__title');
  monitorList = monitorContainer.querySelector('.monitor__log-container');
}

function addCardAlarm(cardAlarm) {
  monitorList.prepend(cardAlarm);
}

const API = {
  addCardAlarm: addCardAlarm, //...cardAlarm
};

export {init, API};
