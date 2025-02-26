import * as menu from "./modules/menu.js";
import * as homeSection from "./modules/sectionHome.js";
import * as navigation from "./modules/navigation.js";
import * as detailsSection from "./modules/sectionDetails.js";
import * as categorySection from "./modules/sectionCategories.js";
import * as genericSection from "./modules/sectionGeneric.js";
import * as searchMovie from "./modules/searchMovie.js";
// import * as apiTMDB from "./modules/apiTMDB.js";
// import { MovieXd } from "./modules/movieClass.js"

document.addEventListener('click', (event) => {console.log(event.target)});

document.addEventListener('DOMContentLoaded', ()=> {
  menu.init();
  homeSection.init();
  navigation.init();
  detailsSection.init();
  categorySection.init();
  genericSection.init();
  searchMovie.init();
  // console.log('axios', window.axios);
  // apiTMDB.API.getSearchMovies('doc', 2);
  // apiTMDB.API.getPopularMoviesPreview(1);
  // apiTMDB.API.getTrenndingMoviesPreview(1);
  // apiTMDB.API.getUpcommingMoviesPreview(1);
  // apiTMDB.API.getGenres();

});
