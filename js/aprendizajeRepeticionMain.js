import * as textVisibility from "./modules/aprendizajeRepeticionModules/textVisibility.js";
import * as inputMessage from "./modules/aprendizajeRepeticionModules/input.js";
import * as appTimer from "./modules/aprendizajeRepeticionModules/timer.js";
import * as botonRepeticiones from "./modules/aprendizajeRepeticionModules/botonRepeticion.js";
import * as botonReset from "./modules/aprendizajeRepeticionModules/reset.js";

import * as boxTitle from "./modules/aprendizajeRepeticionModules/boxTitle.js";

import * as logicaNegociacion from "./modules/aprendizajeRepeticionModules/logicaRepeticion.js";
import * as focusUser from "./modules/aprendizajeRepeticionModules/focusUser.js";


const toolsFunctional = {
  eleText: textVisibility, // export {init}
  eleInput: inputMessage, // export { init, ajustarTextArea, obtenerTexto, ffocus, vaciarInput }
  btnTimer: appTimer, // export { init, ffocus }
  btnMain: botonRepeticiones, // export { init, ffocus }
  btnReset: botonReset, // export { init, ffocus }
  eleTitle: boxTitle, //export {init}
  logicaN: logicaNegociacion, // export { init,negociarEntradaNoVacia, ejectuarRepeticion }
  logicFocus: focusUser // export { init, modoInicial, modoWork }
}
// {eleText, eleInput, btnTimer, btnMain, btnReset, eleTitle, logicaN}

document.addEventListener('DOMContentLoaded', () => {
  const nVeces = 8;

  toolsFunctional.eleText.init(); 
  toolsFunctional.eleInput.init(); 
  toolsFunctional.btnTimer.init(); 
  toolsFunctional.btnMain.init(); 
  toolsFunctional.btnReset.init(); 

  toolsFunctional.eleTitle.init(); 
  toolsFunctional.logicaN.init(nVeces);
  toolsFunctional.logicFocus.init();
  // toolsFunctional.logicFocus.init({
  //   fInput: toolsFunctional.eleInput,
  //   fBtnMain: toolsFunctional.btnMain,
  //   fBtnTimer: toolsFunctional.btnTimer,
  //   fBtnReset: toolsFunctional.btnReset,
  //   fBtnEye: toolsFunctional.eleText
  // });

  // ======================================================================
  const estadoApp = {
    ESTADO_INICIAL: 1,
    ESTADO_WORK: 2
  }
  let estadoActual = estadoApp.ESTADO_INICIAL;
  
  document.addEventListener('app:reiniciarTodo', () => {
    estadoActual = estadoApp.ESTADO_INICIAL;
    boxEfect.classList.remove('result-container');
    setTimeout(() => {
      toolsFunctional.logicFocus.focusInit();
    }, 10);
    // toolsFunctional.eleInput.ajustarTextArea();
  });
  
  const boxEfect = document.getElementById('resultContainer'); ///////////
  
  const evaluar = document.getElementById('evaluateButton');
  evaluar.addEventListener('click', () => {logicaMain(toolsFunctional)});

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Tab') {
      event.preventDefault();
      toolsFunctional.logicFocus.autoFocus();
      console.log('Tab:::::::');
    }
  });
  
  // ======================================================================
  function logicaMain(objetofuncional) {
    toolsFunctional.logicFocus.focusInit();
    switch (estadoActual) {
      case estadoApp.ESTADO_INICIAL:
        // if (negociarEntradaNoVacia(objetofuncional)) {
        if (objetofuncional.logicaN.negociarEntradaNoVacia(objetofuncional.eleInput)) {
          const textoReferencia = objetofuncional.eleInput.obtenerTexto();
          const miEvento = new CustomEvent('app:iniciarRepeticiones', { detail: textoReferencia });
          document.dispatchEvent(miEvento);
          estadoActual = estadoApp.ESTADO_WORK;
          boxEfect.classList.add('result-container');
        } else {
          alert('No se puede procesar texto vacio !!!');
        }
        break;
      case estadoApp.ESTADO_WORK:
        objetofuncional.logicaN.ejectuarRepeticion(objetofuncional, boxEfect);
        break;

      default:
        break;
    }
  };

  // Prueba de propagacion de EVENTO: miEventoPropagado
  // const ele_title = document.getElementById('repeticionTitleContainer');
  // const ele_contenedor = document.getElementById('resultContainer');
  // const section_work = document.getElementById('section-work');

  // ele_title.addEventListener('miEventoPropagado', (e) => {
  //   console.log('[miEventoPropagado]Capture: ele_title');
  //   // e.stopPropagation();
  // }, true);
  // ele_contenedor.addEventListener('miEventoPropagado', () => {console.log('[miEventoPropagado]Capture: ele_contenedor')}, false);
  // section_work.addEventListener('miEventoPropagado',() => {console.log('SECTION: Bubbling')});

});

