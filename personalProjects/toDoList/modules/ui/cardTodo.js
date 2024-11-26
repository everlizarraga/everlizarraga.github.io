const cardsList = document.querySelector('.cards-list');
const cardToDoTemplate = document.getElementById('template-card');

const pendingCards = new Map();
let observer;

function init() {
  cardToDoTemplate.removeAttribute('id');
  cardToDoTemplate.remove();
  cardToDoTemplate.classList.remove('disable');
  initIntersectionObserver();
  // console.log(cardToDoTemplate);
}

function controlToDo(cardTodo) {
  const unToDo = cardTodo;
  return {
    get title() {return unToDo.querySelector('.card__time').textContent},
    set title(newTitle) {unToDo.querySelector('.card__time').textContent = newTitle},

    get subTitle() {return unToDo.querySelector('.card__date').textContent},
    set subTitle(newSubTitle) {unToDo.querySelector('.card__date').textContent = newSubTitle},

    // get textContent() {return unToDo.querySelector('.card__text p').innerText},
    get textContent() {return unToDo.querySelector('.card__text p').textContent},//innerHTML
    set textContent(newText) {
      unToDo.querySelector('.card__text p').textContent = newText; 
    },

    activeBtnCheck(trueFalse) {
      if(trueFalse) {
        unToDo.classList.add('btn-icon-check__checked');
        unToDo.classList.remove('btn-icon-check__unchecked');
      } else {
        unToDo.classList.add('btn-icon-check__unchecked');
        unToDo.classList.remove('btn-icon-check__checked');
      }
    },
    
    btnIsChecked() {
      return unToDo.classList.contains('btn-icon-check__checked');
    },

    getId() {
      // document.body.getAttribute();
      return unToDo.getAttribute('data-todo-id');
    },

    btnCopyApplyEffect() {
      const btnCopy = unToDo.querySelector('.btn-copy');
      btnCopy.classList.remove('btn-copy--normal');
      btnCopy.classList.add('btn-copy--copied');
      setTimeout(() => {
        btnCopy.classList.add('btn-copy--normal');
        btnCopy.classList.remove('btn-copy--copied');
      }, 2000);
    },
  }
}

function createCardToDo(id, todoText) {
  const newCard = cardToDoTemplate.cloneNode(true);
  const controlCard = controlToDo(newCard);
  controlCard.textContent = todoText;
  
  const now = new Date();
  const splitNow = now.toLocaleString().split(', '); //['29/10/2024', '10:16:36']
  const fecha = splitNow[0];
  const time = splitNow[1].slice(0, 5);

  controlCard.title = `${time} hs`;
  controlCard.subTitle = fecha;

  newCard.setAttribute('data-todo-id', `${id}`);

  // cardsList.prepend(newCard);
  
  return newCard;
}

function applyEffectObserver(cardToDo) {
  pendingCards.set(cardToDo, true);
  observer.observe(cardToDo);
}

function fnAPICreateToDo(id, todoText) {
  const newCard = createCardToDo(id, todoText);
  return {
    card: newCard,
    applyEffect(ele) {
      // applyEffectObserver(this.card);
      applyEffectObserver(ele);
    },
  }
}

function initIntersectionObserver() {
  const opciones = { // Configuracion del observer
    root: null, // null = viewport
    threshold: 0.9, // 90% del elemento visible
  };
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting && pendingCards.has(entry.target)) {
        applyEffect(entry.target);
        observer.unobserve(entry.target);
        pendingCards.delete(entry.target);
      }
    });
  }, opciones);
}

function applyEffect(cardToDo) {
  cardToDo.classList.add('card-add-effect');
  setTimeout(() => {
    cardToDo.classList.remove('card-add-effect');
  }, 1200*3);
}



function btnCheckedChange(cardToDo, trueFalse) {
  const control = controlToDo(cardToDo);
  control.activeBtnCheck(trueFalse);
}

function btnIsChecked(cardToDo) {
  const control = controlToDo(cardToDo);
  return control.btnIsChecked();
}

function getInfoRelevant(cardToDo) {
  const control = controlToDo(cardToDo);
  const id = control.getId();
  if(!id) {
    console.error('No se encontro el ID de la cardToDo');
  }
  const text = control.textContent;
  const title = control.title;
  const subTitle = control.subTitle;
  const stateCheck = control.btnIsChecked();
  return { //id, text, title, subTitle, stateCheck
    id,
    text,
    title,
    subTitle,
    stateCheck,
  }
}

function createCardManual(id, todoText, title, subTitle, checkState) {
  const newCard = createCardToDo(id, todoText);
  const control = controlToDo(newCard);
  control.title = title;
  control.subTitle = subTitle;
  control.activeBtnCheck(checkState);
  return newCard;
}

const API = {
  createCardToDo(id, todoText) {return fnAPICreateToDo(id, todoText)},
  createCardManual(id, todoText, title, subTitle, checkState) {return createCardManual(id, todoText, title, subTitle, checkState)},
  btnCheckedChange(cardToDo, trueFalse) {btnCheckedChange(cardToDo, trueFalse)},
  btnIsChecked(cardToDo) {return btnIsChecked(cardToDo)},
  getInfoRelevant(cardToDo) {return getInfoRelevant(cardToDo)},
  btnCopyApplyEffect(cardToDo) {controlToDo(cardToDo).btnCopyApplyEffect()}
};

export {init, API};


// const cardManager = {
//   cardsPendientes: new Map(),

//   init() {
//     const opciones = { // Configuracion del observer
//       root: null, // null = viewport
//       threshold: 0.1, // 10% del elemento visible
//     };
//     if(this.observer) return;
//     this.observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach((entry) => {
//         if(entry.isIntersecting && this.cardsPendientes.has(entry.target)) {
//           this.applyEffect(entry.target);
//           this.observer.unobserve(entry.target);
//           this.cardsPendientes.delete(entry.target);
//         }
//       });
//     }, opciones);
//   },

//   createCardToDo(id, todoText) {
//     const newCard = cardToDoTemplate.cloneNode(true);
//     const controlCard = controlToDo(newCard);
//     controlCard.textContent = todoText;
    
//     const now = new Date();
//     const splitNow = now.toLocaleString().split(', '); //['29/10/2024', '10:16:36']
//     const fecha = splitNow[0];
//     const time = splitNow[1].slice(0, 5);

//     controlCard.title = `${time} hs`;
//     controlCard.subTitle = fecha;

//     newCard.setAttribute('id', `${id}`);
//     // cardsList.prepend(newCard);

//     this.cardsPendientes.set(newCard, true);
//     this.observer.observe(newCard);

//     return newCard;
//   },

//   applyEffect(newCard) {
//     newCard.classList.add('card-add-effect');
//     setTimeout(() => {
//       newCard.classList.remove('card-add-effect');
//     }, 1200*3);

//   },
// };