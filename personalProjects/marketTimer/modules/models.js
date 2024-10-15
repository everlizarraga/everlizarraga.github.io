
function createTimer(time, timeType, alarm = true) {
  if(typeof alarm != 'boolean') {
    throw new Error("ERROR: El parametro Alarm tiene que ser boolean");
  }
  return {
    time: time,
    timeType: timeType,
    activeAlarm: alarm,
  }
}

function createGroup(name, timeReset, colorClass, timerList = []) {
  return {
    groupName: name,
    groupReset: timeReset,
    groupColor: colorClass,
    timerList: timerList,
  }
}

function identifyTimer(timer) {
  return `${timer.time}|${timer.timeType}`;
}

function createAlarmNode(group, timer) {
  return {
    groupId: group.groupId,
    groupName: group.groupName,
    groupReset: group.groupReset,
    groupColor: group.groupColor,

    time: timer.time,
    timeType: timer.timeType,
    activeAlarm: timer.activeAlarm,

    // timesOfDay: [],
    // timesCursor: 0,

    intervalTime: null,
    actualTimeTarget: null,
    nexTimeTarget: null,
    enabledAlarm: true,

    identifyTimer: function() {return `${this.groupId}|${this.time}|${this.timeType}`},
    getInfo: function() {
      const info = {
        groupI: this.groupId,
        groupName: this.groupName,
        groupReset: this.groupReset,
        groupColor: this.groupColor,
        time: this.time,
        timeType:this.timeType,
        activeAlarm: this.activeAlarm,
        // timesOfDay: this.timesOfDay,
        // timesCursor: this.timesCursor,
        intervalTime: this.intervalTime,
        actualTimeTarget: this.actualTimeTarget,
        nexTimeTarget: this.nexTimeTarget,
        enabledAlarm: this.enabledAlarm,
      }
      return info;
    },
  }
}

const API = {
  createTimer: createTimer,
  createGroup: createGroup,
  identifyTimer: identifyTimer,
  createAlarm: createAlarmNode,
};

const VALUES = {
  timeType: {
    sec: 1000,
    min: 1000*60,
    hr: 1000*60*60,
  },
};

export {API, VALUES};