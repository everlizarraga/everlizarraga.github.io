
function createNodeAlarm(
  title,
  time,
  timeType,
  datetimeLocal,
  activeAlarm,
) {
  return {
    title: title,
    time: time,
    timeType: timeType,
    datetimeLocal: datetimeLocal,
    // datetimeLocal: new Date(`${datetimeLocal}`),
    activeAlarm: activeAlarm,
    // interval: Object.entries(VALUES.timeType).find(e => e[0]== this.timeType)[1] * parseInt(this.time),
  }
}

const API = {
  createNodeAlarm:createNodeAlarm,
};

const VALUES = {
  timeType: {
    // sec: 1000,
    min: 1000*60,
    hr: 1000*60*60,
  },
  classColor: {
    bgBlue: 'color-blue',
    bgGrayDark: 'color-gray-dark',
    bgGrayLight: 'color-gray-light',
    bgGreen: 'color-green',
    bgOrange: 'color-orange',
    bgPink: 'color-pink',
    bgRed: 'color-red',
    bgYellow: 'color-yellow',
  },
  classColorSelectd: function() {return this.classColor.bgGrayDark},
};

export {API, VALUES};
