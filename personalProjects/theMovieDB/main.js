import * as menu from "./modules/menu.js";

document.addEventListener('click', (event) => {console.log(event.target)});

document.addEventListener('DOMContentLoaded', ()=> {
  menu.init();
});

const API_KEY = '69cbc687c32419aa77d44cddeee6cf38';

async function getTrenndingMoviesPreview() {
  // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=doctor' + '&languaje=es-ES');
  const data = await res.json();

  const dataProcesada = data.results.map(e => e.title);

  console.log(data);
  console.log(dataProcesada);
}

// getTrenndingMoviesPreview();