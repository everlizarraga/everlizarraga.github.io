import * as menu from "./modules/menu.js";
import * as apiTMDB from "./modules/apiTMDB.js";

document.addEventListener('click', (event) => {console.log(event.target)});

document.addEventListener('DOMContentLoaded', ()=> {
  menu.init();
  apiTMDB.API.trendingMovies();
});

