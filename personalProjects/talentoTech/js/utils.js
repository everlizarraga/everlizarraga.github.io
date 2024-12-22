function agregarFuncionalidadAlBloqueCantidad(input, btnMinus, btnPlus, inputsEnlazados, listaCallbacksUbdate) {
  const inputBox = controladorInput(input);
  btnMinus.addEventListener('click', () => {
    let valorActual = inputBox.getValue();
    if(valorActual > 1) {
      valorActual -= 1;
      inputBox.setValue(valorActual);
      if(inputsEnlazados) inputsEnlazados.forEach(e => {e.value = valorActual});
      if(listaCallbacksUbdate) {
        listaCallbacksUbdate.forEach(e => {e(valorActual)});
      }
    }
  });
  btnPlus.addEventListener('click', () => {
    let valorActual = inputBox.getValue();
    valorActual += 1;
    inputBox.setValue(valorActual);
    if(inputsEnlazados) inputsEnlazados.forEach(e => {e.value = valorActual});
    if(listaCallbacksUbdate) {
      listaCallbacksUbdate.forEach(e => {e(valorActual)});
    }
  });
}

function controladorInput(input) {
  return {
    getValue() {
      let rpta;
      const value = input.value;
      if(value != '') {
        rpta = Number.parseInt(value);
        if(rpta == 0) rpta = 1;
      } else {
        const placeHolder = input.getAttribute('placeholder');
        rpta = Number.parseInt(placeHolder);
      }
      return rpta;
    },
    setValue(nuevoValor) {
      input.value = nuevoValor;
    }
  }
}


function agregarValidadorDeCantidades(input, callbackList) {
  input.addEventListener('keydown', function (event) {
    // Lista de teclas no permitidas
    const invalidKeys = [".", ",", "-"];

    if (invalidKeys.includes(event.key)) {
        event.preventDefault(); // Bloquear la tecla
    }
  });

  input.addEventListener('input', function () {
    const inputBox = controladorInput(input);
    if(this.value != '') {
      // Si el usuario ingresa un valor inválido (por ejemplo, copia y pega texto)
      let value = parseInt(this.value);
  
      // Validar que el valor sea mayor o igual a 1
      if (value < 1 || isNaN(value)) {
          this.value = 1; // Restablecer al mínimo permitido
      }
  
      // Validar que no tenga decimales
      if (!Number.isInteger(value)) {
        this.value = Math.floor(value);
      }
      // input.value = Math.floor(value);
      this.value = Math.floor(value);

      if(value == 0) {
        this.classList.add('input-red');
      } else {
        this.classList.remove('input-red');
      }
    } else {
      this.classList.remove('input-red');
    }

    //Ejecutar las callbacks solo si hay
    if(callbackList) {
      callbackList.forEach(e => {e(inputBox.getValue())});
    }
  });
}

function enlazarInputsDeCantidad(listaDeInputs=[]) {
  // console.log(listaDeInputs);
  listaDeInputs.forEach(input => {
    const inputsHermanos = seleccionarInputsHermanos(input);
    input.addEventListener('input', () => {
      const valorDelInputActual = input.value;
      inputsHermanos.forEach(e => {
        e.value = valorDelInputActual
      });
    });
  });

  function seleccionarInputsHermanos(input) {
    return listaDeInputs.filter(e => e != input);
  }
}


function generarPedidoID() {
  const key1 = generarCodigoAleatorio();
  const key2 = generarCodigoAleatorio();
  function generarCodigoAleatorio() {
    return Math.floor(Math.random() * 100000).toString(16).padEnd(5, '0').slice(0,4);
  }

  return `${key1}${key2}`;
}



