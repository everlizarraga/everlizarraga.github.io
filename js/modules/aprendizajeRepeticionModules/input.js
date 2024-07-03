const messageInput = document.getElementById('messageInput');

function adjustTextareaHeight(textarea) {
  // Ajustar la altura del textarea automáticamente
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

const ajustarTextArea = () => {adjustTextareaHeight(messageInput)}
const obtenerTexto = () => messageInput.value;

// =============================================================
const vaciarInput = () => {
  messageInput.value = '';
  ajustarTextArea();
}

const iniciarWork = () => {
  messageInput.value = '';
  ajustarTextArea();
};

const reiniciarTodo = () => {vaciarInput()};

const ffocus = () => messageInput.focus();

const obtenerReferenciaInput = () => messageInput;
// function obtenerReferenciaInput() {
//   return messageInput;
// }

// =============================================================
function init() {
  ajustarTextArea();
  messageInput.addEventListener('input', () => {ajustarTextArea()});
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
}

export { init, ajustarTextArea, obtenerTexto, ffocus, vaciarInput, obtenerReferenciaInput };