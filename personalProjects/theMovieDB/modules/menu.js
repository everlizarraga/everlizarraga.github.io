const header = document.querySelector('.header');

const btnMenu = header.querySelector('.header__btn-menu');
const menuBar = header.querySelector('.header__nav');

function init() {
  console.log('Hola MENU !!!');

  btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn-change');
    menuBar.classList.toggle('menu-effect-in');
  });

  menuBar.style.height = `${document.body.clientHeight - header.clientHeight}px`;
}






export {init};