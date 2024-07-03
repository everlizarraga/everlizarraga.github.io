let recorridoInicial;
let recorridoWork;
let modoActual;

const fInput = document.getElementById('messageInput');
const fBtnMain = document.getElementById('evaluateButton');
const fBtnTimer = document.getElementById('tiempo');
const fBtnReset = document.getElementById('reset_all');
const fBtnEye = document.getElementById('toggleVisibility');

const autoFocus = () => {
  // Encontrar el índice del elemento actual
  const currentFocusIndex = modoActual.indexOf(document.activeElement); 
  console.log('Indice: ' + currentFocusIndex);

  // Calcular el índice del siguiente elemento
  let nextFocusIndex = (currentFocusIndex + 1) % modoActual.length;

  // Enfocar el siguiente elemento
  modoActual[nextFocusIndex].focus();
};

// ================================================================
const iniciarWork = () => {
  modoActual = recorridoWork;
  fInput.focus();
};

const reiniciarTodo = () => {
  modoActual = recorridoInicial;
  // fInput.focus();
};

const focusInit = () => {fInput.focus()};

// ================================================================
// function init({fInput, fBtnMain, fBtnTimer, fBtnReset, fBtnEye}) {
function init() {
  recorridoInicial = [fInput, fBtnMain];
  recorridoWork = [fInput, fBtnMain, fBtnTimer, fBtnReset, fBtnEye];

  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);

  fInput.focus();
  modoActual = recorridoInicial;
}

export { init, autoFocus, focusInit };
