const watch = document.querySelector('#header-main .time-literal');

function init() {
  runWatch();
}

const controlWatch = {
  set: function(text) {watch.textContent = text},
  get: function() {return watch.textContent},
};

function runWatch() {
  setInterval(() => {
    controlWatch.set(getSnapTimeWithFormat());
  },1000);
}

function getSnapTimeWithFormat() {
  const currentTime = getSnapCurrenTime();
  const hrs = `${currentTime.getHours()}`.padStart(2,'0');
  const mins = `${currentTime.getMinutes()}`.padStart(2,'0');
  const secs = `${currentTime.getSeconds()}`.padStart(2,'0');
  return `${hrs}:${mins}:${secs}`;
}

function getSnapCurrenTime() {
  const currentTime = new Date();
  currentTime.setSeconds(currentTime.getSeconds() + 30);
  // const rpta = new Date(currentTime.getTime() + 30*1000);
  return currentTime;
}


export {init, getSnapTimeWithFormat, getSnapCurrenTime}; //getSnapTimeWithDate
