


function init() {

}

function readLocalStorage() {
  return localStorage.getItem('marketTimer:saveInfoV2');
}

function writeLocalStorage(newInfoString) {
  localStorage.setItem('marketTimer:saveInfoV2', newInfoString);
}

const API = {
  readLocalStorage: readLocalStorage,
  writeLocalStorage: writeLocalStorage,
};

export {init, API};
