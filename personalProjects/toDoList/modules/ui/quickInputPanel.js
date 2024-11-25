const btnAdd = document.querySelector('.floating-actions .add-button');
const btnCancel = document.querySelector('.quick-input-panel__btn-cancel');
const quickInputPanel = document.getElementById('quick-input-panel');
const form = document.querySelector('.quick-input-panel__form');
const textArea = document.querySelector('.quick-input-panel__info-todo');
// const btnSend = document.querySelector('.quick-input-panel__send');

let fnCallback = () => {console.log('__Send')};

function init() {
  btnAdd.classList.remove('disable');
  form.addEventListener('submit', fnQuickInputPanel);
  btnCancel.addEventListener('click', () => {
    controlQuickInputPanel.textArea = '';
    quickInputPanel.classList.add('disable');
    btnAdd.classList.remove('disable');
  });
  btnAdd.addEventListener('click', () => {
    btnAdd.classList.add('disable');
    quickInputPanel.classList.remove('disable');
    textArea.focus();
  });
}

function fnQuickInputPanel(event) {
  event.preventDefault();
  fnCallback();
  console.log('Submit interseptado');
}

function hidePanel() {
  quickInputPanel.classList.add('disable');
  btnAdd.classList.remove('disable');
}

const controlQuickInputPanel = {
  // get textArea() {return textArea.value.replace(/\n/g, '<br>')},
  get textArea() {return textArea.value},
  set textArea(newText) {textArea.value = newText},

  asignBtnSend(callback) {fnCallback = callback},

  hidePanel() {hidePanel()},
}

const API = controlQuickInputPanel;

export {init, API};
