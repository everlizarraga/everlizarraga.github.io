import * as monitor from "../../appV1/uiV1/monitor.js";
import * as groups from "../../appV1/uiV1/groups.js";
import * as cardAlarm from "../../appV1/uiV1/cardAlarm.js";
import * as cardGroup from "../../appV1/uiV1/cardGroup.js";
import * as formAlarm from "./formAlarmV2.js";

import * as modelsV2 from "../modelsV2.js";

function init() {
  monitor.init();
  groups.init();
  cardAlarm.init();
  cardGroup.init();
  formAlarm.init();
}


const API = {
  formAlarm: formAlarm.API,
  monitor: monitor.API,
  groups:groups.API,
  cardAlarm: cardAlarm.API,
  cardGroup: cardGroup.API,
};


export {init, API};
