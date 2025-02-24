import * as home from "./sectionHome.js";
import * as details from "./sectionDetails.js";
import * as generic from "./sectionGeneric.js";
import * as categories from "./sectionCategories.js";

import * as menuAPI from "./menu.js";
import * as helpers from "../utils/helpers.js";

const menuOptionsNav = [...document.querySelectorAll('.header__nav-option a')];

let linkCategroy;

function init() {
  window.addEventListener('hashchange', navigator, false);
  window.addEventListener('DOMContentLoaded', navigator, false);

  linkCategroy = menuOptionsNav.find(e => e.getAttribute('href') == "#category");
  linkCategroy.addEventListener('click', function(event) {
      event.preventDefault();
      const newHash = `#category=${this.getAttribute('data-current')}`;
      location.hash = newHash;
    });
}


function navigator() {
  console.log('Cambio de HASH !!!');
  if(location.hash.startsWith('#trends')) {
    genericPage('#trends');
  } else if(location.hash.startsWith('#popular')) {
    genericPage('#popular');
  } else if(location.hash.startsWith('#upcoming')) {
    genericPage('#upcoming');
  } else if(location.hash.startsWith('#search=')) {
    genericPage('#search=');
  } else if(location.hash.startsWith('#similar=')) {
    genericPage('#similar=');
  } else if(location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if(location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

  menuAPI.API.resizeMenu();
  menuAPI.API.activeSidebar(false);
  helpers.API.autoScrollToHeader();
}

function genericPage(type) {
  hideAllPages();
  generic.API.showSection(true);

  //Resaltando el nav option seleccionado
  const typeSection = type.split('=')[0];
  hideEffectBorderOptionMenu();
  menuOptionsNav.forEach(e => {
    if(e.getAttribute('href') == typeSection) {
      e.classList.add('header__nav-option--selected');
    }
  });
}

function movieDetailsPage() {
  console.log('...Movie');
  hideAllPages();
  details.API.showSection(true);

  hideEffectBorderOptionMenu();
}

function categoriesPage() {
  hideAllPages();
  categories.API.showSection(true);

  //Resaltando el nav-option seleccionado
  const typeSection = "#category";
  hideEffectBorderOptionMenu();
  menuOptionsNav.forEach(e => {
    if(e.getAttribute('href').split('=')[0] == typeSection) {
      e.classList.add('header__nav-option--selected');
    }
  });

}

function homePage() {
  hideAllPages();
  home.API.showSection(true);
  location.hash = "#home";

  //Resaltando el nav option seleccionado
  const typeSection = "#home";
  hideEffectBorderOptionMenu();
  menuOptionsNav.forEach(e => {
    if(e.getAttribute('href') == typeSection) {
      e.classList.add('header__nav-option--selected');
    }
  });
}


function hideAllPages() {
  home.API.showSection(false);
  details.API.showSection(false);
  generic.API.showSection(false);
  categories.API.showSection(false);
}

function hideEffectBorderOptionMenu() {
  menuOptionsNav.forEach(e => {
    e.classList.remove('header__nav-option--selected');
  });
}


export { init };
