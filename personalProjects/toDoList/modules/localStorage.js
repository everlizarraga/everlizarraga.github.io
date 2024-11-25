
const API = {
  saveInfo(title, info) {localStorage.setItem(title, info)},
  loadInfo(title) {return localStorage.getItem(title)},
};

export {API};
