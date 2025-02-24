const header = document.querySelector('.header');

const btnMenu = header.querySelector('.header__btn-menu');
const menuBar = header.querySelector('.header__nav');

function init() {
  console.log('Hola MENU !!!');

  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn-change');
    menuBar.classList.toggle('menu-effect-in');
  });

  window.addEventListener('resize', () => {
    resizeMenu();
    autoHideSidebar();
  });

  resizeMenu();
}

function currentViewport() {
  return document.body.clientWidth;
}

function resizeMenu() {
  console.log('Resizing Menu ...');
  if(currentViewport() < 960)  {
    menuBar.style.height = `${document.body.clientHeight - header.clientHeight}px`;
  } else {
    menuBar.style.height = 'auto';
  }
}

function autoHideSidebar() {
  if(menuBar.classList.contains('menu-effect-in')
  && currentViewport() >= 960) {
    activeSidebar(false);
  }
}

function activeSidebar(stateBoole) {
  if(stateBoole) {
    menuBar.classList.add('menu-effect-in');
    btnMenu.classList.add('btn-change');
  } else {
    menuBar.classList.remove('menu-effect-in');
    btnMenu.classList.remove('btn-change');
  }
}


// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

const API = {
  resizeMenu() {resizeMenu()},
  activeSidebar(stateBoole) {activeSidebar(stateBoole)},
};

export { init, API };