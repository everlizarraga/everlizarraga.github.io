import { MovieXd } from "./movieClass.js";
import * as utils from "../utils/helpers.js";

const API_KEY = '69cbc687c32419aa77d44cddeee6cf38';
const templateOriginal = 'https://image.tmdb.org/t/p/original';
const templateW500 = 'https://image.tmdb.org/t/p/w500';
const templateW300 = 'https://image.tmdb.org/t/p/w300';

////////////////////////////////////////////////////////////
const api = window.axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

// console.log('axios', window.axios);

// async function exp1(page = 1) {
//   const data = await api.get(`trending/movie/day`, {
//     params: { page },
//   });
//   console.log('AXIOS:', data);
// }
// exp1(1);

////////////////////////////////////////////////////////////

async function getTrenndingMoviesPreview(page = 1) {
  // const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${API_KEY}`);
  const res = await api.get('trending/movie/day', {
    params: {page}
  });

  // const data = await res.json();
  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  // console.log(data2);
  return data2;
}

async function getPopularMoviesPreview(page = 1) {
  // const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  const res = await api.get('movie/popular', {
    params: {page}
  });
  
  // const data = await res.json();
  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  // console.log(data2);
  return data2;
}

async function getUpcommingMoviesPreview(page = 1) {
  // const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  const res = await api.get('movie/upcoming', {
    params: {page}
  });
  
  // const data = await res.json();
  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  // console.log(data2);
  return data2;
}

async function getSearchMovies(movieName, page = 1) {
  // const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${page}`);
  const res = await api.get('search/movie', {
    params: {
      query: movieName,
      page: page,
    }
  });
  
  // const data = await res.json();
  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  // console.log(data2);
  return data2;
}

async function getDetailsMovieForId(movieId) {
  const res = await api.get(`movie/${movieId}`);
  const e = res.data;
  const newMovie = new MovieXd({
    id: e.id,
    title: e.title,
    type: 'Movie',
    urlImgPathOriginal: `${templateOriginal}${e.poster_path}`,
    urlImgPathW500: `${templateW500}${e.poster_path}`,
    urlImgPathW300: `${templateW300}${e.poster_path}`,
    urlBgPathOriginal: `${templateOriginal}${e.backdrop_path}`,
    urlBgPathW500: `${templateW500}${e.backdrop_path}`,
    urlBgPathW300: `${templateW300}${e.backdrop_path}`,
    rate: e.vote_average,
    details: e.overview,
    release: e.release_date,
    categoriesIds: e.genres.map(ele => ele.id),
    categoriesFull: e.genres,
    runtime: utils.API.convertFormatTimeMovie(e.runtime) // Adicional
  });
  // console.log('DETAILS FOR ID:', newMovie);
  return newMovie;
}

async function getGenres() {
  // const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  const res = await api.get('genre/movie/list');
  
  // const data = await res.json();
  const data = res.data;
  // console.log(data);
  return data.genres;
}

async function getSimilarMoview(movieId, page = 1) {
  const res = await api.get(`movie/${movieId}/similar`, {
    params: {page},
  });

  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  return data2;
}

async function getMoviesForGenres(genreId, page = 1) {
  const res = await api.get('discover/movie', {
    params: {
      page: page,
      with_genres: genreId,
    }
  });

  const data = res.data;
  //Conversion de datos
  const data2 = await {...data, results:convertMovieClass(data.results)};
  return data2;
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
      urlImgPathW300: `${templateW300}${e.poster_path}`,
      urlBgPathOriginal: `${templateOriginal}${e.backdrop_path}`,
      urlBgPathW500: `${templateW500}${e.backdrop_path}`,
      urlBgPathW300: `${templateW300}${e.backdrop_path}`,
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
  getGenres() {return getGenres()},
  getDetailsMovieForId(moviewId) {return getDetailsMovieForId(moviewId)},
  getSimilarMoview(movieId, page) {return getSimilarMoview(movieId, page)},
  getMoviesForGenres(genreId, page) {return getMoviesForGenres(genreId, page)},
};

export {API};
