// Estructuras Bases
const favoriteAction = {
  add: 1,
  remove: 2,
}


// Aca va el generador de eventos personalizados para agregar a favoritos.
function sendFavoriteEvent(elemento, action, url) {
  const miEventoPersonalizado = new CustomEvent('app:favorites', {
    detail: {
      action: action,
      url: url,
    },
    bubbles: true,
  });
  elemento.dispatchEvent(miEventoPersonalizado);
}

// Aca va la funcion para precargar imagenes a partir de una url.
function promisePreloadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Error al cargar image: ${url}`));
    img.src = url;
  });
}

// Precarga de imagenes en paralelo.
async function preloadImagesParallel(listUrls, progressCallback) {
  const totalImages = listUrls.length;
  let loadCount = 0;

  const execCallback = () => {
    if(progressCallback !== undefined) {
      progressCallback(loadCount, totalImages);
    }
  };
  const loadImage = async (url) => {
    try {
      const img = await promisePreloadImg(url);
      loadCount++;
      execCallback();
      return img;
    } catch (error) {
      console.error(error);
      loadCount++;
      execCallback();
      return img;
    }
  };

  // const imagePromises = listUrls.map(e => promisePreloadImg(e));
  const imagePromises = listUrls.map(e => loadImage(e));
  return Promise.all(imagePromises);
}


// =================================================================

const API = {
  sendFavoriteEvent: sendFavoriteEvent, //sendFavoriteEvent(elemento, action, url)
  promisePreloadImg: promisePreloadImg, //promisePreloadImg(url)
  preloadImagesParallel: preloadImagesParallel, //preloadImagesParallel(urls, cb)
};

const value = {
  favAction: favoriteAction,
}

export {API, value};