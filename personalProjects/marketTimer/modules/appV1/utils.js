
function createCustomeEvent(eventName, info) {
  return new CustomEvent(`marketTimer:${eventName}`, {detail:info});
}


export {createCustomeEvent};