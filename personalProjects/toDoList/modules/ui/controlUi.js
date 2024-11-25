import * as search from "./search.js";
import * as cardToDo from "./cardTodo.js";
import * as toast from "./toast.js";
import * as quickInputPanel from "./quickInputPanel.js";

function init() {
  search.init();
  cardToDo.init();
  toast.init();
  quickInputPanel.init();
}

const API = {
  search: search.API,
  cardToDo: cardToDo.API,
  toast: toast.API,
  quickInputPanel: quickInputPanel.API,
};

export {init, API};
