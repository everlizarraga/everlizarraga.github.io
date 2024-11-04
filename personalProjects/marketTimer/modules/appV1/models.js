
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

function sortTimerList(timerList) {
  let rpta = [];
  if(timerList.length > 0) {
    const secList = timerList.filter(e => identifyTimer(e).includes('sec'));
    const minList = timerList.filter(e => identifyTimer(e).includes('min'));
    const hrList = timerList.filter(e => identifyTimer(e).includes('hr'));
    
    function timerSort(myList) {
      myList.sort((a, b) => parseInt(`${a.time}`) - parseInt(`${b.time}`));
    }

    timerSort(secList);
    timerSort(minList);
    timerSort(hrList);

    const rpta = [...secList, ...minList, ...hrList];
    return rpta;
  }

  return rpta;
}

const API = {
  createTimer: createTimer,
  createGroup: createGroup,
  identifyTimer: identifyTimer,
  createAlarm: createAlarmNode,
  sortTimerList: sortTimerList,
};

const VALUES = {
  timeType: {
    sec: 1000,
    min: 1000*60,
    hr: 1000*60*60,
  },
};

export {API, VALUES};