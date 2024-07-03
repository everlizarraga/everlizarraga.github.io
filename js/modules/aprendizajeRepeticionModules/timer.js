const cronometro = document.getElementById('tiempo');

let corriendo = null;
let tiempoAcumulado = 0;
let listenerCronometro;

// =======================================================
const reiniciarCronometro = () => {
  if (corriendo) {
    clearInterval(corriendo);
    corriendo = null;
  }
  tiempoAcumulado = 0;
};

const actualizarCronometro = (elementoCronometro, unValor) => {
  const horas = Math.floor(unValor / 3600).toString().padStart(2, '0');
  const minutos = Math.floor((unValor % 3600) / 60).toString().padStart(2, '0');
  const segundos = (unValor % 60).toString().padStart(2, '0');
  elementoCronometro.textContent = `${horas}:${minutos}:${segundos}`;
}

const iniciarPausarCronometro = () => {
  if (!corriendo) { // Si el cronómetro no está corriendo
    corriendo = setInterval(() => {
      tiempoAcumulado++;
      actualizarCronometro(cronometro, tiempoAcumulado);
    }, 1000); // Iniciar el intervalo
  } else {
    clearInterval(corriendo); // Detener el intervalo
    corriendo = null; // Limpiar la referencia al intervalo
  }
};

cronometro.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    console.log('Botón activado con teclado');
    iniciarPausarCronometro();
  }
});

// =======================================================
const iniciarWork = () => {
  cronometro.style.display = 'block';
  iniciarPausarCronometro();

  if (!listenerCronometro) {
    cronometro.addEventListener('click', iniciarPausarCronometro);
    listenerCronometro = iniciarPausarCronometro;
  }
};

const reiniciarTodo = () => {
  reiniciarCronometro();
  cronometro.textContent = '00:00:00';
  cronometro.style.display = 'none';

  if (listenerCronometro) {
    cronometro.removeEventListener('click', iniciarPausarCronometro);
    listenerCronometro = null;
  }
};

const ffocus = () => cronometro.focus();

// =======================================================
function init() {
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
}


export { init, ffocus };