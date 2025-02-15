import * as menu from "./modules/menu.js";
import * as homeSection from "./modules/home.js";
// import * as apiTMDB from "./modules/apiTMDB.js";
// import { MovieXd } from "./modules/movieClass.js"

document.addEventListener('click', (event) => {console.log(event.target)});

document.addEventListener('DOMContentLoaded', ()=> {
  menu.init();
  homeSection.init();
  // apiTMDB.API.getSearchMovies('doc', 2);
  // apiTMDB.API.getPopularMoviesPreview(1);
  // apiTMDB.API.getTrenndingMoviesPreview(1);
  // apiTMDB.API.getUpcommingMoviesPreview(1);
  // apiTMDB.API.getGenres();

});
