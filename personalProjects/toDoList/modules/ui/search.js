const searchContainer = document.querySelector('.search-container');
const sectionSearch = document.querySelector('.search');
const inputSearch = document.getElementById('input-search');
const btnClean = sectionSearch.querySelector('.btn-icon-x');
const btnFilter = sectionSearch.querySelector('.btn-icon-filter');

const sectionFilter = document.querySelector('.filter-container');
// const filterBtnAll = sectionFilter.querySelector();

const iconFilterClass = ['btn-icon-filter--normal', 'btn-icon-filter--active'];

function init() {
  // btnClean.classList.add('invisible');
  btnClean.classList.add('visually-hidden-v2');
  searchContainer.addEventListener('click', administerClick);
  inputSearch.addEventListener('focus', () => {sectionSearch.classList.add('search-focus-efect')});
  inputSearch.addEventListener('blur', () => {sectionSearch.classList.remove('search-focus-efect')});
  inputSearch.addEventListener('input', () => {
    if(controlSearch.inputText != ''){
      btnClean.classList.remove('visually-hidden-v2');
    } else {
      btnClean.classList.add('visually-hidden-v2');
      inputSearch.focus();
    }
  });
}

const controlSearch = {
  get inputText() {return inputSearch.value},
  set inputText(newText) {inputSearch.value = newText},

  btnClean: {
    clean() {
      inputSearch.value = '';
      btnClean.classList.add('visually-hidden-v2');
      inputSearch.focus();
    },
  },

  btnFilter: {
    enabled: function() {
      btnFilter.classList.remove(iconFilterClass[0]);
      btnFilter.classList.add(iconFilterClass[1]);

      // sectionFilter.classList.add('invisible');
      sectionFilter.classList.remove('disable');
      sectionFilter.classList.remove('filter-container-efect--out');
      sectionFilter.classList.add('filter-container-efect--in');
    },
    disabled: function() {
      btnFilter.classList.remove(iconFilterClass[1]);
      btnFilter.classList.add(iconFilterClass[0]);

      sectionFilter.classList.remove('filter-container-efect--in');
      sectionFilter.classList.add('filter-container-efect--out');
      setTimeout(() => {
        sectionFilter.classList.add('disable');
      }, 200);
    }
  },

};


function administerClick(event) {
  const target = event.target;
  // console.log(target);
  if(target.closest('.btn-icon-x')) {
    controlSearch.btnClean.clean();
  }
  if(target.closest('.btn-icon-filter')) {
    const stateFilterBtn = btnFilter.classList.contains(iconFilterClass[0]);
    if(stateFilterBtn) {
      controlSearch.btnFilter.enabled();
      const btnListFilter = [...sectionFilter.children];
      const btnSelected = btnListFilter.find(e => e.classList.contains('filter-item--active'));
      btnSelected.focus();
      // console.log(btnSelected);
    } else {
      controlSearch.btnFilter.disabled();
    }
    // btnFilter.blur();
  }
  if(target.closest('button.filter-item')) {
    const btnTarget = target.closest('button.filter-item');
    const filterMode = btnTarget.dataset.filterMode;
    const miEventoPersonalizado = new CustomEvent('appToDoList:filterMode', {
      detail: `${filterMode}`
    });
    document.dispatchEvent(miEventoPersonalizado);
    console.log('FilterMODE: ', filterMode);

    const btnListFilter = [...sectionFilter.children];
    btnListFilter.forEach(e => {e.classList.remove('filter-item--active')});
    btnTarget.classList.add('filter-item--active');
  }
}

const API = controlSearch;


export {init, API};
