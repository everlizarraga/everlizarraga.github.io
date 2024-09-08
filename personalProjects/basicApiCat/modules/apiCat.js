// const APIurl = 'https://api.thecatapi.com/v1/favourites?api_key=c08d415f-dea7-4a38-bb28-7b2188202e46';

const APIurl = 'https://api.thecatapi.com/v1/images/search?api_key=live_nG4viIHCH3fIHogN5S3WL5QHNqC05p9hI6q1CwHmPVHce1ajsZAeCdOEpldYkPHr';

const catExample1 = 'https://cdn2.thecatapi.com/images/d_RzH-Zft.jpg';

function url(cant){
  return `${APIurl}&limit=${cant}`;
}

async function realizarPeticion(cant) {
  const res = await fetch(url(cant));
  const data = await res.json();

  //Solo string con URLs
  const rpta = onlyLinks(data);
  return rpta;
}

function onlyLinks(data) {
  const miLista = data.map((e) => e.url);
  return miLista;
}

const API = {
  realizarPeticion: realizarPeticion, //realizarPeticion(cant)
}

export {API};