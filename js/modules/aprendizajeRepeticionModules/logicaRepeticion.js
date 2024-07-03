let textoReferencia = '';
let nVecesBase;
let nVeces;
let fasePractica = true;

const timerControl = document.getElementById('tiempo');

// ===========================================================================================

function compareWords(word1, word2) {
  const length1 = word1.length;
  const length2 = word2.length;
  let matches = 0;
  let errors = 0;

  for (let i = 0; i < Math.max(length1, length2); i++) {
    if (word1[i] === word2[i]) {
      matches++;
    } else {
      errors++;
    }
  }

  const errorRate = errors / Math.max(length1, length2);
  return errorRate <= 0.4;
}

function evaluateText(text) {
  // Aquí es donde se evaluará el texto ingresado
  console.log('Texto a evaluar:', text);

  const text1 = textoReferencia.toLowerCase().split(/\s+/);
  const text2 = text.toLowerCase().split(/\s+/);

  let correctWords = 0;
  let totalWords = text1.length;

  text1.forEach((word, index) => {
    if (text2[index] && compareWords(word, text2[index])) {
      correctWords++;
    }
  });

  const correctPercentage = (correctWords / totalWords) * 100;
  return correctPercentage >= 70;
}

function hacerEfecto(boxEfect, estado) {
  // Aplicar la clase CSS correspondiente
  if (estado) {
    boxEfect.classList.add('success');
  } else {
    boxEfect.classList.add('error');
  }

  // Eliminar la clase después de 1 segundo
  setTimeout(() => {
    boxEfect.classList.remove('success', 'error');
  }, 700);
}

// ===========================================================================================

const reiniciarTodo = () => {
  textoReferencia = '';
};

const iniciarWork = (evento) => {
  textoReferencia = evento.detail;
  nVeces = nVecesBase;
  fasePractica = true;
};

// ===========================================================================================
function negociarEntradaNoVacia(eleInput) {
  let rpta = false;
  const textoNuevo = eleInput.obtenerTexto();
  if (textoNuevo.length > 0) { rpta = true; }
  return rpta;
}

function ejectuarRepeticion({eleText, eleInput, btnTimer, btnMain, btnReset, eleTitle, logicaN}, boxEfect) {
  const textoIngresado = eleInput.obtenerTexto();
  hacerEfecto(boxEfect, evaluateText(textoIngresado));
  eleInput.vaciarInput();
  if(fasePractica){
    nVeces--;
    if(nVeces === 0){
      fasePractica = false;
      const eyeClosed = document.getElementById('eyeClosed');
      eyeClosed.dispatchEvent(new CustomEvent('app:close_fase_practica'));
    }
  }

  timerControl.dispatchEvent(new CustomEvent('app:siEstasPausadoDespausate'));
}

function init(veces) {
  document.addEventListener('app:reiniciarTodo', reiniciarTodo);
  document.addEventListener('app:iniciarRepeticiones', (evento) => {iniciarWork(evento)});
  nVecesBase = veces;
}


export { init,negociarEntradaNoVacia, ejectuarRepeticion };