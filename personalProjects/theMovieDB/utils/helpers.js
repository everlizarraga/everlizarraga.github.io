const header = document.querySelector('.header');
const labelSave = "theMovieDB:APP";

function convertFormatTimeMovie(minutos) {
  if (typeof minutos !== "number" || minutos < 0) return "0h 00m";
  
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  return `${horas}h ${mins.toString().padStart(2, "0")}m`;
}

function replaceCharacters(text, targetChar, replacementChar) {
  return text.split(targetChar).join(replacementChar).toLowerCase();
}

function autoScrollToHeader() {
  header.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function autoScrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function extractLabelOfHash() {
  const partsHash = location.hash.substring(7).split('-');
  let label;
  if(partsHash.length >= 3) {//['13112', 'nombre_de_la_peli', 'popular']
    const aux = partsHash[partsHash.length - 1].toUpperCase();
    // console.log('AUX:', aux);
    if(aux== "TRENDING" || aux == "POPULAR" || aux ==  "UPCOMING") {
      label = aux;
      // console.log('MATCH:', label);
    }
  }

  if(!label) {
    label = 'MOVIE';
  }

  return label;
}


const API = {
  convertFormatTimeMovie(oneNumber) {return convertFormatTimeMovie(oneNumber)},
  replaceCharacters(text, targetChar, replacementChar) {return replaceCharacters(text, targetChar, replacementChar)},
  autoScrollToHeader() {autoScrollToHeader()},
  autoScrollToElement(element) {autoScrollToElement(element)},
  extractLabelOfHash() {return extractLabelOfHash()},
};


export { API };