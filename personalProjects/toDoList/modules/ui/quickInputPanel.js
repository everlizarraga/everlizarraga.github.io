const btnAdd = document.querySelector('.floating-actions .add-button');
const btnCancel = document.querySelector('.quick-input-panel__btn-cancel');
const quickInputPanel = document.getElementById('quick-input-panel');
const form = document.querySelector('.quick-input-panel__form');
const textArea = document.querySelector('.quick-input-panel__info-todo');
// const btnSend = document.querySelector('.quick-input-panel__send');

const bodyMain = document.querySelector('.body__main');

let fnCallback = () => {console.log('__Send')};
let visibleTextArea = false;

function init() {

  btnAdd.classList.remove('disable');
  form.addEventListener('submit', fnQuickInputPanel);
  btnCancel.addEventListener('click', () => {
    controlQuickInputPanel.textArea = '';
    quickInputPanel.classList.add('disable');
    btnAdd.classList.remove('disable');
    visibleTextArea = false;
    reestoreMarginBottomToViewQuickPanel();
  });

  btnAdd.addEventListener('click', () => {
    btnAdd.classList.add('disable');
    quickInputPanel.classList.remove('disable');
    textArea.focus();
    viewQuickInputPanel();
    visibleTextArea = true;
    addMarginBottomToViewQuickPanel();
  });
  
  textArea.addEventListener('focus', () => {
    viewQuickInputPanel();
  });
}

function fnQuickInputPanel(event) {
  event.preventDefault();
  fnCallback();
  console.log('Submit interseptado');
  visibleTextArea = false;
  reestoreMarginBottomToViewQuickPanel();
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

function simpleScroll(child) {
  child.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function viewQuickInputPanel() {
  simpleScroll(quickInputPanel);
  // timerOfCallback(100, simpleScroll(quickInputPanel));
  let value = 20;
  while(value > 0) {
    value -= 1;
    timerOfCallback(50+value*40, () => {simpleScroll(quickInputPanel)});

  }
  timerOfCallback(900, () => {simpleScroll(quickInputPanel)});
}

function addMarginBottomToViewQuickPanel() {
  if(visibleTextArea) {
    if(bodyMain.clientHeight > window.innerHeight) {
      const cardsList = document.querySelector('.cards-list');
      const heightPanel = quickInputPanel.clientHeight;
      cardsList.style.paddingBottom = `${heightPanel - 84+10}px`;
    }
  }
}

function reestoreMarginBottomToViewQuickPanel() {
  const cardsList = document.querySelector('.cards-list');
  cardsList.style.paddingBottom = `0px`;
}

function timerOfCallback(timeout, callback) {
  setTimeout(() => {
    callback();
    // console.log(`Timeout: ${timeout}`);
  }, timeout);
  console.log('setTimeout OK [%d]', timeout);
}


const API = controlQuickInputPanel;

export {init, API};
