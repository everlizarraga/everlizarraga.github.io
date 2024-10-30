
const btnPrueba01 = document.querySelector('.prueba-1');

const scrollbarContent = document.querySelector('.custom-scrollbar-content');
const scrollbar = document.querySelector('.custom-scrollbar');
const scrollbarThumb = document.querySelector('.custom-scrollbar-thumb');

let isDragging = false;
let startX;
let startScrollLeft;
let delta;

document.addEventListener('DOMContentLoaded', () => {
  console.log('APP XD');
  console.log({location});

  btnPrueba01.addEventListener('click', () => {
    console.log('>>');
  });

  //Redimensionar el Thumb
  redimencionarThumb();

  scrollbarContent.addEventListener('scroll', () => {
    // console.log('Me scrolean xd');
    // scrollWidth  ---  100%
    // scroll left  ---    x
    const despPorcent = (scrollbarContent.scrollLeft * 100) / (API_scroll.sizeContent() - API_scroll.sizeCotnainer())
    API_scroll.desplazarThumb(Math.round(despPorcent));
  });

  scrollbar.addEventListener('mousedown', (event) => {
    if(event.target.closest('.custom-scrollbar-thumb')) {
      // delta = event.offsetX - API_scroll.getDistanceThumb();
      delta = event.offsetX;
      isDragging = true;
    }
  });
  // scrollbar.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mousemove', handleMouseMove);
  scrollbar.addEventListener('mouseup', () => {
  // document.addEventListener('mouseup', (event) => {
    // if(event.target.closest(''))
    isDragging = false;
  });


  // console.log('>>z>>zzz>: ', scrollbar.getBoundingClientRect().left);
});


// ==============================


const API_scroll = {
  sizeContent: function() {return scrollbarContent.scrollWidth},
  sizeCotnainer: function() {return scrollbarContent.clientWidth},
  thumb: {
    getSize: function() {return scrollbarThumb.clientWidth},
    setSize: function(newSize) {scrollbarThumb.style.width = `${Math.max(newSize, 20)}px`},
  },
  desplazarThumb: function(despPorcent) {
    if(despPorcent >100 || despPorcent < 0)throw new Error("Porcentaje invalido");
    const distancia = this.sizeCotnainer() - this.thumb.getSize();
    // distancia --- 100%
    //    x      --- despPorcent%
    const leftDistance = Math.round((distancia * despPorcent) / 100);
    scrollbarThumb.style.left = `${leftDistance}px`;
  },
  desplazarScroll: function(despPorcent) {
    const distnacia = this.sizeContent() - this.sizeCotnainer();
    scrollbarContent.scrollLeft = Math.round(distnacia * despPorcent / 100);
  },
  getDistanceThumb: function() {
    return parseInt(scrollbarThumb.style.left.split('px')[0]);
  },
};

console.log(API_scroll.sizeContent());
console.log(API_scroll.sizeCotnainer());

function redimencionarThumb() {
  const view = scrollbarContent.clientWidth;
  const sizeContent = scrollbarContent.scrollWidth;
  const porcentaje = view/sizeContent;
  const newSizeThumb = Math.round(porcentaje * scrollbar.clientWidth);
  scrollbarThumb.style.width = `${newSizeThumb}px`;
}


function handleMouseMove(event) {
  let distance;
  let x0;
  if(isDragging) {
    x0 = scrollbar.getBoundingClientRect().left;
    // Miesntra estea sobre el thuimb el click se calculara la distancia de cierta forma.
    const max = scrollbar.clientWidth - API_scroll.thumb.getSize();
    distance = event.clientX - x0 - delta;
    distance = clamp(distance, 0, max);
    const porcentaje = (distance / max) * 100;
    API_scroll.desplazarScroll(porcentaje);
    if(event.target.closest('.custom-scrollbar-thumb')) {
    }
    // Tengo que encontrar la manera de medir el offset x del contenedor padre
    // console.log('event.clientX: ', event.clientX);
  }
}


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}