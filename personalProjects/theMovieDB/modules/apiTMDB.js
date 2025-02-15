import { MovieXd } from "./movieClass.js";

const API_KEY = '69cbc687c32419aa77d44cddeee6cf38';
const templateOriginal = 'https://image.tmdb.org/t/p/original';
const templateW500 = 'https://image.tmdb.org/t/p/w500';

async function getTrenndingMoviesPreview(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${API_KEY}`);

  const data = await res.json();
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  console.log(data2);
  return data2;
}

async function getPopularMoviesPreview(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  
  const data = await res.json();
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  console.log(data2);
  return data2;
}

async function getUpcommingMoviesPreview(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  
  const data = await res.json();
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  console.log(data2);
  return data2;
}

async function getSearchMovies(movieName, page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${page}`);
  
  const data = await res.json();
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  console.log(data2);
  return data2;
}

async function getGenres() {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  
  const data = await res.json();
  console.log(data);
  return data;
}

/*///////////////////////////////////////////////////////// */
/*///////////////////////////////////////////////////////// */
function convertMovieClass(arrayMovies = []) {
  const nuewArray = arrayMovies.map(e => {
    const newMovie = new MovieXd({
      id: e.id,
      title: e.title,
      type: 'Movie',
      urlImgPathOriginal: `${templateOriginal}${e.poster_path}`,
      urlImgPathW500: `${templateW500}${e.poster_path}`,
      urlBgPathOriginal: `${templateOriginal}${e.backdrop_path}`,
      urlBgPathW500: `${templateW500}${e.backdrop_path}`,
      rate: e.vote_average,
      details: e.overview,
      release: e.release_date,
      categoriesIds: e.genre_ids
    });
    return newMovie;
  });
  return nuewArray;
}



/*///////////////////////////////////////////////////////// */
/*///////////////////////////////////////////////////////// */


const API = {
  // getTrenndingMoviesPreview(page) {getTrenndingMoviesPreview(page);},
  getTrenndingMoviesPreview(page) {return getTrenndingMoviesPreview(page);},
  getPopularMoviesPreview(page) {return getPopularMoviesPreview(page)},
  getUpcommingMoviesPreview(page) {return getUpcommingMoviesPreview(page)},
  getSearchMovies(movie, page) {return getSearchMovies(movie, page)},
  getGenres() {return getGenres()}
};

export {API};
