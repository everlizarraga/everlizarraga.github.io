const header = document.querySelector('.header');

const btnMenu = header.querySelector('.header__btn-menu');
const menuBar = header.querySelector('.header__nav');

const menuOptionscontainer = header.querySelector('.header__nav-container');

let menuOpen = false;
let controlPushState = false;

function init() {
  console.log('Hola MENU !!!');

  btnMenu.addEventListener('click', () => {
    if(menuOpen) {
      activeSidebar(false);
      if(isMobile() && controlPushState) {
        history.back();
        controlPushState = false;
      };
    } else {
      activeSidebar(true);
      controlPushState = true;
    }
    // btnMenu.classList.toggle('btn-change');
    // menuBar.classList.toggle('menu-effect-in');
  });

  window.addEventListener('resize', () => {
    resizeMenu();
    autoHideSidebar();
  });

  [...menuOptionscontainer.querySelectorAll('a')].forEach(e => {
    e.addEventListener('click', () => {
      activeSidebar(false);
    });
  });

  window.addEventListener('popstate', function(event) {
    if(menuOpen) {
      activeSidebar(false);
      // history.pushState(null, '', '');
    }
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
    menuOpen = true;
    // Solo añadimos el estado a la historia en dispositivos móviles
    if (isMobile()) {
      history.pushState({ menuOpen: true }, '', '');
    }
  } else {
    menuBar.classList.remove('menu-effect-in');
    btnMenu.classList.remove('btn-change');
    menuOpen = false;
    // if(isMobile() && controlPushState) {
    //   history.back();
    //   controlPushState = false;
    // };
  }
}

function isMobile() {
  return window.matchMedia("(max-width: 959px)").matches;
}


// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

const API = {
  resizeMenu() {resizeMenu()},
  activeSidebar(stateBoole) {activeSidebar(stateBoole)},
};

export { init, API };