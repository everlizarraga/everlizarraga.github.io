const API_KEY = '69cbc687c32419aa77d44cddeee6cf38';

async function getTrenndingMoviesPreview(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${API_KEY}`);

  const data = await res.json();
  console.log(data);
  return data;
}

async function getPopularMoviesPreview(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  
  const data = await res.json();
  console.log(data);
  return data;
}

async function getUpcommingMoviesPreview(page) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}` + `&api_key=${API_KEY}`);
  
  const data = await res.json();
  console.log(data);
  return data;
}

async function getSearchMovies(movieName) {
  const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + `&query=${movieName}`);
  
  const data = await res.json();
  console.log(data);
  return data;
  
}

async function getGenres() {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  
  const data = await res.json();
  console.log(data);
  return data;
}

/*///////////////////////////////////////////////////////// */
/*///////////////////////////////////////////////////////// */

const API = {
  trendingMovies() {
    getTrenndingMoviesPreview();
  },
};

export {API};
