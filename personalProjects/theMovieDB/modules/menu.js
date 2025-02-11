const header = document.querySelector('.header');

const btnMenu = header.querySelector('.header__btn-menu');
const menuBar = header.querySelector('.header__nav');

function init() {
  console.log('Hola MENU !!!');

  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn-change');
    menuBar.classList.toggle('menu-effect-in');
  });

  window.addEventListener('resize', resizeMenu);

  resizeMenu();
}


function resizeMenu() {
  console.log('Resizing Menu ...');
  const currentViewport = document.body.clientWidth;
  if(currentViewport < 960)  {
    menuBar.style.height = `${document.body.clientHeight - header.clientHeight}px`;
  } else {
    menuBar.style.height = 'auto';
  }
}




export {init};