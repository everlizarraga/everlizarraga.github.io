const evaluateButton = document.getElementById('evaluateButton');

let contadorRepeticiones = 0;
let listenerEvaluarRepeticiones;

const plantillaBotonWorkHTML = () => `EVALUAR [ <span id="contadorIntentos">${contadorRepeticiones}</span> ]`;
const plantillaInicial = 'Comenzar Repeticiones';

// =============================================================
const actualizarContador = () => {
  contadorRepeticiones++;
  evaluateButton.innerHTML = plantillaBotonWorkHTML();
};

const ffocus = () => evaluateButton.focus();

// =============================================================
const reiniciarTodo = () => {
  contadorRepeticiones = 0;
  evaluateButton.innerHTML = plantillaInicial;
  if(listenerEvaluarRepeticiones) {
    evaluateButton.removeEventListener('click', actualizarContador);
    listenerEvaluarRepeticiones = null;
  }
};

const iniciarWork = () => {
  contadorRepeticiones = 0;
  evaluateButton.innerHTML = plantillaBotonWorkHTML();
  if(!listenerEvaluarRepeticiones){
    evaluateButton.addEventListener('click', actualizarContador);
    listenerEvaluarRepeticiones = actualizarContador;
  }
  // ---

};

// =============================================================
function init() {
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
}

export { init, ffocus };