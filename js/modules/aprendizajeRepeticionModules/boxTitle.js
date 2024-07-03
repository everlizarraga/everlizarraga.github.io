const boxTitle = document.getElementById('repeticion-title');

const tituloOriginal = boxTitle.textContent;
const tituloWork = `Let's Go !!!`;
// const tituloWork = 'Let\'s Go !!!';

// ==============================================================
const reiniciarTodo = () => {
  boxTitle.textContent = tituloOriginal;
}

const iniciarWork = () => {
  boxTitle.textContent = tituloWork;
}

// ==============================================================
function init() {
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
}

export { init };