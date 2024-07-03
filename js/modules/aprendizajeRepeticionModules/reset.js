const btnReset = document.getElementById('reset_all');

let listenerReset;

// ======================================================================

const funcionReset = () => {
  const eventoPersonalizado = new CustomEvent('app:reiniciarTodo');
  document.dispatchEvent(eventoPersonalizado);
};

btnReset.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    console.log('Botón activado con teclado');
    funcionReset();
  }
});

// ======================================================================
const reiniciarTodo = () => {
  btnReset.style.display = 'none';
  if(listenerReset) {
    btnReset.removeEventListener('click', funcionReset);
    listenerReset = null;
  }
};

const iniciarWork = () => {
  btnReset.style.display = 'block';
  if(!listenerReset){
    btnReset.addEventListener('click', funcionReset);
    listenerReset = funcionReset;
  }
};

const ffocus = () => btnReset.focus();

// ======================================================================
function init() {
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
}

export { init, ffocus };