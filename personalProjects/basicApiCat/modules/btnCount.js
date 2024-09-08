const MAX_COUNT = 12;
let count = 1;

function getCountPointer() {
  const botonera = document.getElementById('btn-count-section');
  return botonera;
}

function init() {
  const botonera = getCountPointer();
  botonera.setAttribute('data-count', 1);
  botonera.addEventListener('click', controlNumericoV2);
}

function controlNumericoV1(event) {
  const botonera = getCountPointer();
  const btnPlus = botonera.querySelector('.count-result__plus');
  const btnMinus = botonera.querySelector('.count-result__minus');
  const number = botonera.querySelector('.count-result__number');
  const maxMessage = botonera.querySelector('.limit-max');

  let count = parseInt(botonera.dataset.count);
  if(isNaN(count)){
    console.error('ERROR al convertir a numero el data-count');
  }

  if(event.target == btnPlus) {count+=1}
  if(event.target == btnMinus) {count-=1}

  if(count > MAX_COUNT) count = 12;
  if(count < 1) count = 1;

  if(count == MAX_COUNT) maxMessage.classList.remove('ele-inVisible');
  if(count != MAX_COUNT) {
    if(!maxMessage.classList.contains('ele-inVisible')){
      maxMessage.classList.add('ele-inVisible');
    }
  }

  botonera.dataset.count = count;
  number.textContent = count;
  // console.log(count);
}

function controlNumericoV2(event) {
  const botonera = getCountPointer();
  const btnPlus = botonera.querySelector('.count-result__plus');
  const btnMinus = botonera.querySelector('.count-result__minus');
  const number = botonera.querySelector('.count-result__number');
  const maxMessage = botonera.querySelector('.limit-max');

  if(event.target == btnPlus) {count+=1}
  if(event.target == btnMinus) {count-=1}

  if(count > MAX_COUNT) count = 12;
  if(count < 1) count = 1;

  if(count == MAX_COUNT) maxMessage.classList.remove('ele-inVisible');
  if(count != MAX_COUNT) {
    if(!maxMessage.classList.contains('ele-inVisible')){
      maxMessage.classList.add('ele-inVisible');
    }
  }

  number.textContent = count;
}

function getCount() {
  const botonera = document.getElementById('btn-count-section');
  const number = botonera.querySelector('.count-result__number');
  const value = parseInt(number.textContent);
  if(!isNaN(value)){
    return value;
  }
}

function getCountV2() {
  return count;
}

const API = {
  getCount: getCountV2 //getCount()
};

export {init, API};