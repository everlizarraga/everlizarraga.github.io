const toggleVisibility = document.getElementById('toggleVisibility');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
const textoReferenciaContainer = document.getElementById('texto_referencia_container');
const textoReferencia = document.getElementById('texto_referencia');

let textoBase;
let estaVisible;
let miListenerOjo;

// let nVeces;

function mostrarTexto() {
  textoReferenciaContainer.style.display = 'block';
}

function ocultarTexto() {
  textoReferenciaContainer.style.display = 'none';
}

// =======================================================
function cifrarTexto(unCaracter) {
  // Aca va la logica para que cada letra del texto se reemplace por lagun caracter especificado
  textoReferencia.textContent = '***********'; // De momento esto sirve
}

function decifrarTexto() {
  textoReferencia.textContent = textoBase;
}

const parpadeoOpen = () => {
  eyeOpen.style.display = 'block';
  eyeClosed.style.display = 'none';
  estaVisible = true;
  decifrarTexto();
};
const parpadeoClose = () => {
  eyeOpen.style.display = 'none';
  eyeClosed.style.display = 'block';
  estaVisible = false;
  cifrarTexto('*');
};

function parpadeoEfect() {
  if (estaVisible) {
    parpadeoClose();
  }
  else {
    parpadeoOpen();
  }

  // Prueba PROPAGACION DE EVENTO
  // console.log('Mandando el Evento: miEventoPropagado');
  // const miEvento = new CustomEvent('miEventoPropagado',{bubbles:false});
  // eyeOpen.dispatchEvent(miEvento);
}
// eyeOpen.addEventListener('miEventoPropagado', () => { console.log('LLego a destino: miEventoPropagado =========') });
eyeClosed.addEventListener('app:close_fase_practica', parpadeoClose);

toggleVisibility.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    console.log('Botón activado con teclado');
    parpadeoEfect();
  }
});

// =======================================================

function editarTextoReferencia(nuevoTexto) {
  textoBase = nuevoTexto;
  textoReferencia.textContent = nuevoTexto;
}
// =======================================================

function reiniciarTodo() {
  textoReferencia.textContent = '';
  ocultarTexto();
  textoBase = '';
  estaVisible = false;
  toggleVisibility.style.display = 'none';

  // Me aseguro de eliminar el listener actual, para volver a crearlo despues
  if (miListenerOjo) {
    toggleVisibility.removeEventListener('click', parpadeoEfect);
    miListenerOjo = null;
  }
}

function iniciarWork(evento) {
  // textoBase = evento.detail.textoIngresado;
  textoBase = evento.detail;
  mostrarTexto();
  // textoReferencia.textContent = evento.detail.textoIngresado;
  textoReferencia.textContent = evento.detail;
  toggleVisibility.style.display = 'flex';
  eyeOpen.style.display = 'block';
  eyeClosed.style.display = 'none'
  estaVisible = true;

  // Creo el listener si no existe
  if (!miListenerOjo) {
    toggleVisibility.addEventListener('click', parpadeoEfect);
    miListenerOjo = parpadeoEfect;
  }
}


function init() {
  estaVisible = false;
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', iniciarWork);
  // nVeces = veces;
}

export { init };