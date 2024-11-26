import * as ui from "./ui/controlUi.js";
import * as db from "./localStorage.js";

// let filterModes = [...document.querySelector('.filter-container').children].map(e => e.getAttribute('data-filter-mode'));
let filterModes = [...document.querySelector('.filter-container').children].map(e => e.getAttribute('data-filter-mode')).reduce((acc, curr, index) => {
  acc[curr] = index + 1;
  return acc;
}, {});
const htmlToDoList = document.querySelector('.cards-list');
const searchContainer = document.querySelector('.search-container');
const inputSearch = searchContainer.querySelector('.input-search');
const btnX = searchContainer.querySelector('.btn-icon-x');

let currentFilterMode = filterModes['all'];

let memory = {
  contId: 3,
  cardsList: [
    {
      id: 1,
      title: '19:44 hs',
      subTitle: '08/11/2024',
      text: 'Hacer ToDo List Project en primera instancia solo el diseño',
      stateCheck: true,
    },
    {
      id: 2,
      title: '08:34 hs',
      subTitle: '22/11/2024',
      text: 'Hacer ToDo List Project en segunda instancia hacer el código',
      stateCheck: false,
    },
  ],
};

const nodesToDoList = [];

function init() {
  ui.init();
  document.addEventListener('appToDoList:filterMode', (event) => { //appToDoList:filterMode
    if(Object.hasOwn(filterModes, event.detail)) {
      controlListFromFilter(event.detail);
    } else {
      console.error(`ERROR: El filterMode [${event.detail}] no coincide con los modos establecidos`);
    }
  });

  document.addEventListener('click', administerUserClick);
  btnX.addEventListener('click', () => {
    setTimeout(() => {
      runSearch();
    }, 50);
  });

  const infoSaved = db.API.loadInfo('appToDoList:memory');
  if(infoSaved) {
    memory = JSON.parse(infoSaved);
  }

  generateCardsSaved();

  // asignFunctionToBtnSend();
  ui.API.quickInputPanel.asignBtnSend(asignFunctionToBtnSend);

  inputSearch.addEventListener('input', runSearch);
}

function getId() {
  const rpta = memory.contId;
  memory.contId += 1;
  return rpta;
}

function saveMemory() {
  db.API.saveInfo('appToDoList:memory', JSON.stringify(memory));
  console.log(memory);
}

function generateCardsSaved() {
  if(memory.cardsList.length == 0) return;
  
  memory.cardsList.forEach(e => {
    const newCard = createNewCardFromMemoryToDo(e);
    const newNode = createNodeToDo(e, newCard);
    nodesToDoList.push(newNode);
    htmlToDoList.prepend(newNode.cardToDo);
  });

}

function createMemoryToDo(id, text, title, subTitle, stateCheck) {
  return {id, text, title, subTitle, stateCheck}
}

function createNewCardFromMemoryToDo(memoryToDo) {
  const newCard = ui.API.cardToDo.createCardManual(
    memoryToDo.id,
    memoryToDo.text,
    memoryToDo.title,
    memoryToDo.subTitle,
    memoryToDo.stateCheck
  );
  return newCard;
}

function createNodeToDo(memoryToDo, newCard) {
  return {
    ...memoryToDo,
    cardToDo: newCard,
    isNew: false,
    // textPlane: '',
    textPlain: newCard.querySelector('.card__text p').textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
    applyEffect: () => {},
  }
}

// console.log(createMemoryToDo(12,'s','S','A', true));

function asignFunctionToBtnSend() {

  const unId = getId();
  const textToDo = ui.API.quickInputPanel.textArea;
  const auxToDo = ui.API.cardToDo.createCardToDo(unId, textToDo);
  const cardToDo = auxToDo.card;

  const memoryToDo = ui.API.cardToDo.getInfoRelevant(cardToDo);
  const nodeToDo = createNodeToDo(memoryToDo, cardToDo);
  nodeToDo.applyEffect = auxToDo.applyEffect;

  memory.cardsList.push(memoryToDo);
  nodesToDoList.push(nodeToDo);

  ui.API.quickInputPanel.textArea = '';
  ui.API.quickInputPanel.hidePanel();

  showToDoCard(nodeToDo);

  saveMemory();

  // ui.API.toast.notifyAdd(() => {simpleScroll(nodeToDo.cardToDo)});
  ui.API.toast.notifyAdd(() => {scrollWithOffset(nodeToDo.cardToDo, highSearch())});

  nodeToDo.applyEffect(nodeToDo.cardToDo);
}

function highSearch() {
  return searchContainer.clientHeight;
}

function controlListFromFilter(filter) {
  currentFilterMode = filterModes[filter];
  let listSelected;
  if(currentFilterMode == filterModes['all']) {
    listSelected = nodesToDoList.map(e => e.cardToDo);
  }
  if(currentFilterMode == filterModes['todo']) {
    listSelected = nodesToDoList.filter(e => !e.stateCheck).map(e => e.cardToDo);
  }
  if(currentFilterMode == filterModes['done']) {
    listSelected = nodesToDoList.filter(e => e.stateCheck).map(e => e.cardToDo);
  }
  // publicCardsSelected(listSelected);
  
  const searchText = ui.API.search.inputText;
  if(searchText != '') {runSearch()}
  else {publicCardsSelected(listSelected)}
}

function showToDoCard(nodeTodo) {
  if(currentFilterMode != filterModes['done']) {
    htmlToDoList.prepend(nodeTodo.cardToDo);
  }
}

function publicCardsSelected(listCards = []) {
  htmlToDoList.innerHTML = '';
  listCards.forEach(e => {htmlToDoList.prepend(e)});
}

function administerUserClick(event) {
  const target = event.target;
  const cardElement = detectCardFromInternalClick(target);
  if(target.closest('.btn-icon-close')) {
    processDeleteCard(cardElement);
  }
  if(target.closest('.btn-icon-check')) {
    processCheckChange(cardElement);
  }

  if(target.closest('.btn-copy')) {
    processCopyBtnCard(cardElement);
  }
}

function processDeleteCard(cardElement) {
  console.log('delete');
  const info = ui.API.cardToDo.getInfoRelevant(cardElement)
  const id = info.id;
  // const targetNode = searchElemFromNodeListById(id);
  cardElement.remove();
  runToastDelete(() => {
    deleteFromMemory(id);
    deleteFromNodeList(id);
  });
}

function processCheckChange(cardElement) {
  console.log('Change Check');
  const currentCheck = ui.API.cardToDo.btnIsChecked(cardElement);
  const info = ui.API.cardToDo.getInfoRelevant(cardElement);
  ui.API.cardToDo.btnCheckedChange(cardElement, !currentCheck);
  const target = searchElemFromMemoryById(info.id);
  const targetNode = searchElemFromNodeListById(info.id);
  if(!target) {console.error(`[ERROR] Id(${info.id}) no encontrado en memoria.`); return}
  if(!targetNode) {console.error(`[ERROR] Id(${info.id}) no encontrado en NodeList`); return}
  target.stateCheck = !currentCheck;
  targetNode.stateCheck = !currentCheck;
  
  // Guardar memory
  saveMemory();

  // Evaluar si la card modificada debe estar en el filtro activo
  evalCardForCurrentFilter(cardElement);
}

function evalCardForCurrentFilter(cardToDo) {
  const currentCheck = ui.API.cardToDo.btnIsChecked(cardToDo);
  if(currentCheck) {
    if(currentFilterMode == filterModes['todo']) {
      cardToDo.remove();
    }
  } else {
    if(currentFilterMode == filterModes['done']) {
      cardToDo.remove();
    }
  }
}

function searchElemFromMemoryById(id) {
  return memory.cardsList.find(e => e.id == id);
}
function searchElemFromNodeListById(id) {
  return nodesToDoList.find(e => e.id == id);
}

function deleteFromMemory(id) {
  const aux = memory.cardsList.find(e => e.id == id);
  if(aux) {
    const index = memory.cardsList.indexOf(aux);
    memory.cardsList.splice(index, 1);
  } else {
    console.error(`ID[${id}] no encontrado en MEMORY`);
  }
}

function deleteFromNodeList(id) {
  const aux = nodesToDoList.find(e => e.id == id);
  if(aux) {
    const index = nodesToDoList.indexOf(aux);
    nodesToDoList.splice(index, 1);
  } else {
    console.error(`ID[${id}] no encontrado en NodesToDoList`);
  }
}

function processCopyBtnCard(cardElement) {
  console.log('copy');
  const id = ui.API.cardToDo.getInfoRelevant(cardElement).id;
  const targetNode = searchElemFromNodeListById(id);
  // copyText(targetNode.textPlain);
  copyText(targetNode.text);
  ui.API.cardToDo.btnCopyApplyEffect(cardElement);
  ui.API.toast.notifyCopy();
}

function detectCardFromInternalClick(target) {
  return target.closest('.card');
}

function runToastDelete(callback) { //[FALTA]
  let runDelete = true;
  ui.API.toast.notifyDelete(() => {
    runDelete = false;
    controlListFromFilter(Object.entries(filterModes).find(([key, value]) => value === currentFilterMode)?.[0]);
    console.log('Click: toast');
  });

  const time = ui.API.toast.timerTime;
  function permanenteDelete() {
    if(runDelete) {
      callback();
      saveMemory();
      console.log('Card Borrada');
    }
  }

  setTimeout(permanenteDelete, time+50);
}

function simpleScroll(child) {
  child.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollWithOffset(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function runSearch() {
  console.log('RUN serach');
  const text = ui.API.search.inputText;
  searchText(text);
}

function searchText(text) {
  const textLowerCase = text.toLowerCase();
  let listSelected = nodesToDoList.filter(e => e.textPlain.toLowerCase().includes(textLowerCase));

  if(currentFilterMode == filterModes['done']) {
    listSelected = listSelected.filter(e => e.stateCheck);
  }
  if(currentFilterMode == filterModes['todo']) {
    listSelected = listSelected.filter(e => !e.stateCheck);
  }
  listSelected = listSelected.map(e => e.cardToDo);
  publicCardsSelected(listSelected);

}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Texto Copiado: [%s]', text);
  } catch (error) {
    console.error('no se pudo copiar el Texto: ', error);
  }
}

export {init};