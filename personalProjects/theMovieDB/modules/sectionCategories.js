import * as apiTMDB from "./apiTMDB.js";
import * as helpers from "../utils/helpers.js";

const sectionCategories = document.querySelector('.categories-section');

const titleSection = sectionCategories.querySelector('.carousel__title');
const btnBack = sectionCategories.querySelector('.btn--go-back');

const categoriesContainer = sectionCategories.querySelector('.carousel__container-cards');
const templateCardCategory = sectionCategories.querySelector('button.details-info__category').cloneNode(true);

const galeryContainer = sectionCategories.querySelector('.categories-section__galery');
const templateCardGalery = sectionCategories.querySelector('.card').cloneNode(true);

// CURRENT CATEGORY
const currentCategory = document.querySelector('.header__nav-option > a[href="#category"]');

const classColorRed = 'bg-color-red';
const classColorGray = 'bg-color-gray';

// INTERSECTIONoBSERVER()
let observerCardImg;


// ////////////////////////////////////////////////////////////
let hashCategoryId;
let hashCategoryName;
let lastCard;
let myObserver = new IntersectionObserver(callbackScrolling, {rootMargin: '200px'});
let arrayObservers = [];
let currentPage = 1;

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////

function init(sharedObject) {
  observerCardImg = sharedObject.observerCardImg;
  templateCardGalery.classList.remove('disable');
  categoriesContainer.innerHTML = "";
  galeryContainer.innerHTML = "";
  clickDelegationCategory();
  clickDelegationGalery();
}

async function callbackScrolling(entries, observer) {
  for(const entry of entries) {
    if(entry.isIntersecting) {
      const curerntObserved = entry.target;
      observer.unobserve(curerntObserved);
      const indexTraget = arrayObservers.findIndex(e => e == curerntObserved);
      if(indexTraget >= 0) {
        arrayObservers.splice(indexTraget, 1);
      } else {
        console.error("Elem Target Observed no encontrada en el array Observed");
      }
      currentPage += 1;
      const data = await apiTMDB.API.getMoviesForGenres(hashCategoryId, currentPage);
      insertCardsToGalery(data.results);
      lastCard = [...galeryContainer.children].slice(-1)[0];
      observer.observe(lastCard);
      arrayObservers.push(lastCard);
    }
  }

}

function cleanPreviewInfo() {
  categoriesContainer.innerHTML = "";
  galeryContainer.innerHTML = "";
  titleSection.textContent = '';
}

async function procedToExecute() {
  const categoryList = await apiTMDB.API.getGenres(); //[{},{},{}, ...]
  categoryList.forEach(e => {
    const newCardCategory = templateCardCategory.cloneNode(true);
    newCardCategory.textContent = e.name;
    newCardCategory.setAttribute('data-category-id', `${e.id}`);
    categoriesContainer.appendChild(newCardCategory);
  });

  //Tendria que obtener los elementos del hash
  const currentCategoryHash = location.hash.substring(10);
  if(currentCategoryHash.split('-').length != 2) {
    console.error("Hash de categoria no valida");
    return;
  }
  hashCategoryId = currentCategoryHash.split('-')[0];
  hashCategoryName = currentCategoryHash.split('-')[1];
  
  //Luego tendria que fijarme si el hash concide con alguna category
  const targetCategory = categoryList.find(e => e.id == hashCategoryId);
  if(!targetCategory || targetCategory.name.toLowerCase() != helpers.API.replaceCharacters(hashCategoryName, "_", " ").toLowerCase()) {
    console.error('Categoria no reconocida');
    return;
  }

  //Actualizar el titulo
  titleSection.textContent = `Category: ${targetCategory.name}`;

  //Limpiar previas cargas
  arrayObservers.forEach(e => {
    myObserver.unobserve(e);
  });
  currentPage = 1;

  //Hacer las peticiones de las peliculas correspondientes a las categorias
  const data = await apiTMDB.API.getMoviesForGenres(hashCategoryId, currentPage);
  insertCardsToGalery(data.results);
  //Necesito gurdar la ultima carta dinamicamente para agregarla al InteresecptionObserver()
  lastCard = [...galeryContainer.children].slice(-1)[0];
  myObserver.observe(lastCard);
  arrayObservers.push(lastCard);

  //Guardando la categoria en el header
  currentCategory.setAttribute('data-current', `${targetCategory.id}-${helpers.API.replaceCharacters(targetCategory.name, " ", "_")}`);

  //Pintar de rojo la categoria seleccionada
  const listCardsCategory = [...categoriesContainer.children];
  const targetCardCategory = listCardsCategory.find(e => hashCategoryId == e.getAttribute('data-category-id'))
  if(targetCardCategory) {
    autoScrollToCategory(targetCardCategory);
    targetCardCategory.classList.add(classColorRed);
  }
}

function autoScrollToCategory(categoryElement) {
  // Asegúrate de seleccionar el contenedor correcto
  
  if (categoriesContainer && categoryElement) {
    // Calcular la posición del elemento dentro del contenedor
    const containerRect = categoriesContainer.getBoundingClientRect();
    const elementRect = categoryElement.getBoundingClientRect();
    
    // Calcular el desplazamiento necesario
    const scrollOffset = elementRect.left - containerRect.left + categoriesContainer.scrollLeft;

    // Aplicar el desplazamiento solo al scroll horizontal
    categoriesContainer.scrollTo({ left: scrollOffset, behavior: "smooth" });
  }
}

function insertCardsToGalery(movieList) {
  movieList.forEach(e => {
    const newCard = templateCardGalery.cloneNode(true);
    const title = newCard.querySelector('.card__title');
    const img = newCard.querySelector('.card__img');
    
    title.textContent = e.title;
    // img.setAttribute('src', e.imgPathW300);
    img.setAttribute('data-src', e.imgPathW300);
    img.setAttribute('alt', e.title);

    newCard.setAttribute('data-api-id', `${e.id}`);
    
    galeryContainer.appendChild(newCard);
    observerCardImg.observe(newCard);
  });
}

function clickDelegationCategory() {
  categoriesContainer.addEventListener('click', (event) => {
    const target = event.target.closest('.details-info__category');
    if(target) {
      location.hash = `#category=${target.getAttribute('data-category-id')}-${helpers.API.replaceCharacters(target.textContent.toLowerCase(), ' ', '_')}`;
      // console.log(location.hash);
    }
  });
}

function clickDelegationGalery() {
  galeryContainer.addEventListener('click', (event) => {
    const target = event.target.closest('.card');
    if(target) {
      const apiMovieId = target.getAttribute('data-api-id');
      const apiMoviTitle = target.querySelector('.card__title');
      location.hash = `#movie=${apiMovieId}-${helpers.API.replaceCharacters(apiMoviTitle.textContent, " ", "_")}`;
    }
  });
}


// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
function showSection(trueFalse = true) {
  if(trueFalse) {
    cleanPreviewInfo();
    sectionCategories.classList.remove('disable');
    procedToExecute();
  } else {
    sectionCategories.classList.add('disable');
  }
}

const API = {
  showSection(value) {showSection(value)},
};

export { init,  API };
