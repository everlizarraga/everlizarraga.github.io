const header = document.querySelector('.header');
const labelSave = "theMovieDB:APP";
const btnGoUp = document.getElementById('btn--go-up');

function convertFormatTimeMovie(minutos) {
  if (typeof minutos !== "number" || minutos < 0) return "0h 00m";
  
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  return `${horas}h ${mins.toString().padStart(2, "0")}m`;
}

function replaceCharacters(text, targetChar, replacementChar) {
  return text.split(targetChar).join(replacementChar).toLowerCase();
}

function autoScrollToHeader() {
  header.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function autoScrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function extractLabelOfHash() {
  const partsHash = location.hash.substring(7).split('-');
  let label;
  if(partsHash.length >= 3) {//['13112', 'nombre_de_la_peli', 'popular']
    const aux = partsHash[partsHash.length - 1].toUpperCase();
    // console.log('AUX:', aux);
    if(aux== "TRENDING" || aux == "POPULAR" || aux ==  "UPCOMING") {
      label = aux;
      // console.log('MATCH:', label);
    }
  }

  if(!label) {
    label = 'MOVIE';
  }

  return label;
}

// /////////////////////////////////////////////////////////////////

function assignGaleryShadowLateralEfefct(galery) {
  const carouselContainer = galery.querySelector('ul.carousel__container-cards');
  //carouselContainer.clientWidth // cuadro visible
  //carouselContainer.scrollWidth // scroll completo
  //carouselContainer.scrollLeft // Desplazamiento lateral
  //carouselContainer.scrollTo(300,0) // Desplazamiento contorlado por coordenadas
  function calcScrolling() {
    const widthView = carouselContainer.clientWidth;
    const scrollWidth = carouselContainer.scrollWidth;
    const scrollLeft = carouselContainer.scrollLeft;
    galery.classList.add('shadow-left');
    galery.classList.add('shadow-right');

    if(scrollLeft <= 20) galery.classList.remove('shadow-left');
    if(Math.abs((scrollLeft + widthView) - scrollWidth) < 20) galery.classList.remove('shadow-right');
  }
  carouselContainer.addEventListener('scroll', calcScrolling);
  // calcScrolling();
  galery.classList.remove('shadow-left');
}

// /////////////////////////////////////////////////////////////////

function controlScrollGalery(scrollGalery) {
  const galery = scrollGalery;
  return {
    mmoveToPorcentValue(valueDecimal) {
      const {scrollWidth, clientWidth} = galery;
      galery.scrollLeft = scrollWidth*valueDecimal - 0.5*clientWidth;
    },
  };
}

function assignCustomScrollToGalery(galeryContainer) {
  // Elementos DOM
  const galeriaWrapper = galeryContainer.querySelector('.viewfinder');
  const galeria = galeryContainer.querySelector('.custom-scrollbar-content');
  const scrollbarThumb = galeryContainer.querySelector('.custom-scrollbar-thumb');
  const scrollbarContainer = galeryContainer.querySelector('.custom-scrollbar');
  const controlGalery = controlScrollGalery(galeria);

  // Variables para el arrastre del scrollbar
  let isDragging = false;
  let startPositionX = 0;
  let scrollLeft = 0;

  //MutationObserver
  // function changeChildDetected(mutacions) {}
  const observadorMutaciones = new MutationObserver(function(mutaciones, observador) {
    mutaciones.forEach(function(mutation) {
      if(mutation.addedNodes.length > 0) {
        actualizarScrollbarThumb();
      }
    });
  });
  const configurationObserver = {childList:true,};
  observadorMutaciones.observe(galeria, configurationObserver);

  // Función para actualizar la posición y tamaño del thumb del scrollbar
  function actualizarScrollbarThumb() {
    // Calcula el tamaño del thumb basado en la proporción de lo visible respecto al total
    const proporcion = galeriaWrapper.clientWidth / galeria.scrollWidth;
    const thumbWidth = Math.max(20, proporcion * 100); // Al menos 20% de ancho para que sea visible
    
    scrollbarThumb.style.width = thumbWidth + '%';
    
    // Calcula la posición del thumb
    const scrollProportion = galeria.scrollLeft / (galeria.scrollWidth - galeriaWrapper.clientWidth);
    const thumbPosition = scrollProportion * (scrollbarContainer.clientWidth - scrollbarThumb.clientWidth);
    
    // Aplica la posición
    scrollbarThumb.style.left = thumbPosition + 'px';
  }

  // Inicializa la visualización del scrollbar
  actualizarScrollbarThumb();
  
  // Evento de scroll en la galería para actualizar el scrollbar
  galeria.addEventListener('scroll', function() {
      actualizarScrollbarThumb();
  });

  // Evento click en el container del scrollbar (para mover al punto clickeado)
  scrollbarContainer.addEventListener('click', function(e) {
    // Solo ejecutar si el click no fue directamente en el thumb
    if (e.target !== scrollbarThumb) {
        // Calcular la posición proporcional en el container
        const clickPosition = e.clientX - scrollbarContainer.getBoundingClientRect().left;
        const containerWidth = scrollbarContainer.clientWidth;
        const scrollProportion = clickPosition / containerWidth;
        
        // Calcular y aplicar la nueva posición de scroll
        const newScrollPosition = scrollProportion * (galeria.scrollWidth - galeriaWrapper.clientWidth);
        galeria.scrollLeft = newScrollPosition;
    }
  });

  // Eventos para arrastrar el thumb del scrollbar
  scrollbarThumb.addEventListener('mousedown', function(e) {
      isDragging = true;
      startPositionX = e.clientX - scrollbarThumb.getBoundingClientRect().left;
      scrollLeft = galeria.scrollLeft;
      
      // Prevenir selección de texto mientras se arrastra
      document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // Calcular nueva posición mientras se arrastra
    const cursorPosition = e.clientX - scrollbarContainer.getBoundingClientRect().left;
    const thumbPosition = cursorPosition - startPositionX;
    
    // Asegurar que el thumb no se salga del scrollbar
    const maxThumbPosition = scrollbarContainer.clientWidth - scrollbarThumb.clientWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, thumbPosition));
    
    // Calcular y aplicar la nueva posición de scroll en la galería
    const scrollProportion = boundedPosition / maxThumbPosition;
    galeria.scrollLeft = scrollProportion * (galeria.scrollWidth - galeriaWrapper.clientWidth);
  });

  document.addEventListener('mouseup', function() {
      isDragging = false;
      document.body.style.userSelect = '';
  });

  // Eventos para dispositivos táctiles
  scrollbarThumb.addEventListener('touchstart', function(e) {
      isDragging = true;
      startPositionX = e.touches[0].clientX - scrollbarThumb.getBoundingClientRect().left;
      scrollLeft = galeria.scrollLeft;
      
      // Prevenir scroll de la página
      e.preventDefault();
  });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    // Calcular nueva posición mientras se arrastra
    const cursorPosition = e.touches[0].clientX - scrollbarContainer.getBoundingClientRect().left;
    const thumbPosition = cursorPosition - startPositionX;
    
    // Asegurar que el thumb no se salga del scrollbar
    const maxThumbPosition = scrollbarContainer.clientWidth - scrollbarThumb.clientWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, thumbPosition));
    
    // Calcular y aplicar la nueva posición de scroll en la galería
    const scrollProportion = boundedPosition / maxThumbPosition;
    galeria.scrollLeft = scrollProportion * (galeria.scrollWidth - galeriaWrapper.clientWidth);
    
    // Prevenir scroll de la página
    // e.preventDefault();
  });

  document.addEventListener('touchend', function() {
      isDragging = false;
  });

  // Recalcular cuando cambia el tamaño de la ventana
  window.addEventListener('resize', actualizarScrollbarThumb);
}


// /////////////////////////////////////////////////////////////////
function isMobile() {
  return window.matchMedia("(max-width: 959px)").matches;
}

function generateId() {
  return Math.random().toString(36).slice(2).padStart(6, '0');
}

function preloadImage(urlImg) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img)
    };
    img.error = () => {
      reject(new Error(`No se pudo cargar la imagen de: ${url}`));
    };
    img.src = urlImg; // Inicia la carga
  });
}

/**
 * Cargar imagenes secuencialmente usando promesas
 * @param {HTMLImageElement} elementImg 
 * @param {Array<string>} arrayUrls 
 * @param {Array<Function>} arrayConditionsFn 
 */
async function loadImgsOnElement(elementImg, arrayUrls = [], arrayConditionsFn = []) {
  if(arrayUrls.length == 0) {
    console.error('No hay URLs de referencia para cargar preimagenes');
    return;
  }

  try {
    // //Comenzar la 1ra carga
    // elementImg.src = arrayUrls[0];

    // //Esperar a que la primera imagen se cargue
    // if(!elementImg.complete) {
    //   await new Promise((resolve, reject) => {
    //     elementImg.onload = resolve;
    //     elementImg.onerror = () => reject(new Error(`Error al cargar: ${arrayUrls[0]}`));
    //   });
    // }

    //Cargar secuencialmente el resto de imagenes
    for (let index = 0; index < arrayUrls.length; index++) {
      try {
        //Intentar precargar la siguiente imagen
        await preloadImage(arrayUrls[index]);
        // Si se cargó correctamente, actualizar la imagen visible
        if(arrayConditionsFn.length > 0) {
          const meetsTheConditions = arrayConditionsFn.every(fn => fn(elementImg));
          if(meetsTheConditions) {
            elementImg.src = arrayUrls[index];
          }
        } else {
          elementImg.src = arrayUrls[index];
        }
        
      } catch (error) {
        console.error(`Error al cargar imagen #${i}:`, error.message);
        //Por defecto continuamos con la sgte, sin mostrar la imagen fallida
        continue;
      }
    }
    
  } catch (error) {
    console.error("Error al cargar la 1ra imagen:", error.message);
  }

}

// /////////////////////////////////////////////////////////////////
let isEnableBtnGoUp = false;
btnGoUp.addEventListener('click', () => {
  autoScrollToHeader();
});
document.addEventListener('scroll', () => {
  // console.log(`allowedDistance: ${allowedDistance()}`);
  if(allowedDistance() && isEnableBtnGoUp) {
    showBtnGoUp(true);
  } else {
    showBtnGoUp(false);
  }
});

function showBtnGoUp(trueFalse = false) {
  if(trueFalse) {
    btnGoUp.classList.remove('disable');
    // console.log('Mostrando');
  } else {
    btnGoUp.classList.add('disable');
    // console.log('Ocultando');
  }
}

function enableBtnGoUp(trueFalse) {
  if(trueFalse) {
    isEnableBtnGoUp = true;
    // showBtnGoUp(trueFalse);
    // console.warn('HABILITADO BTN-go-up !!!');
  } else {
    isEnableBtnGoUp = false;
    showBtnGoUp(false);
    // console.warn('DESHABILITADO Btn-go-up :(');
  }
}

function allowedDistance() {
  return document.documentElement.scrollTop > 100;
}

// /////////////////////////////////////////////////////////////////


const API = {
  convertFormatTimeMovie(oneNumber) {return convertFormatTimeMovie(oneNumber)},
  replaceCharacters(text, targetChar, replacementChar) {return replaceCharacters(text, targetChar, replacementChar)},
  autoScrollToHeader() {autoScrollToHeader()},
  autoScrollToElement(element) {autoScrollToElement(element)},
  extractLabelOfHash() {return extractLabelOfHash()},
  assignGaleryShadowLateralEfefct(galery) {assignGaleryShadowLateralEfefct(galery)},
  assignCustomScrollToGalery(galery) {assignCustomScrollToGalery(galery)},
  loadImgsOnElement(elementImg, arrayUrls, arrayConditionsFn) {loadImgsOnElement(elementImg, arrayUrls, arrayConditionsFn)},
  generateId() {return generateId()},
  isMobile() {return isMobile()},
  enableBtnGoUp(trueFalse) {enableBtnGoUp(trueFalse)},
};


export { API };
