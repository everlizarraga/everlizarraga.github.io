import * as uiKit from "./uiTools.js";

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


// Enviar un evento personalizado generico.
function sendEventPersonalized(elementOrigin, nameEvent, info) {
  const unEvento = new CustomEvent(nameEvent, {
    detail: info,
    bubbles: true,
  });
  elementOrigin.dispatchEvent(unEvento);
}

// Aca va el generador de eventos personalizados para eliminar de favoritos.
function sendFavoriteDeleteEvent(urlImg, option) {
  sendEventPersonalized(
    document, 
    listenersName.responseFavDelete, 
    {
      urlImg: urlImg,
      option: option,
    }
  );
}

// Aca va la funcion para precargar imagenes a partir de una url.
function promisePreloadImg(url) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const img = new Image();
    img.onload = () => {
      const endTime = performance.now();
      const difTime = endTime - startTime;
      const rpta = {
        img,
        time: {
          start: startTime,
          end: endTime,
          load: difTime,
        }
      };
      resolve(rpta);
    };
    img.onerror = () => reject(new Error(`Error al cargar image: ${url}`));
    img.src = url;
  });
}

// Precarga de imagenes en paralelo.
async function preloadImagesParallel(listUrls, progressCallback) {
  const totalImages = listUrls.length;
  let loadCount = 0;

  const execCallback = (time) => {
    if(progressCallback !== undefined) {
      progressCallback(loadCount, totalImages);
      console.log('Time: [%f | %f] > %f',time.start, time.end, time.load);
      // console.log('=====');
    }
  };
  const loadImage = async (url) => {
    try {
      const {img, time} = await promisePreloadImg(url);
      loadCount++;
      execCallback(time);
      return img;
    } catch (error) {
      console.error(error);
      loadCount++;
      execCallback(time);
      return img;
    }
  };

  // const imagePromises = listUrls.map(e => promisePreloadImg(e));
  const imagePromises = listUrls.map(e => loadImage(e));
  return Promise.all(imagePromises);
}


// =================================================================
// Copiar url de la imagen en el portapapeles para poder compartirlo
async function copyImgUrl(urlImg) {
  try {
    await navigator.clipboard.writeText(urlImg);
    console.log('URL Copiada: [%s]', urlImg);
    alert('URL copiada !!!');
  } catch (error) {
    console.error('no se pudo copiar la URL: ', error);
  }
}

// Copiar img precargada en el portapapeles para poder compartirlo
async function copyPreloadedImageV1(card) {
  console.log('entro en funcion copy img');
  const nodeImg = uiKit.API.getImgNode(card);
  const urlImg = uiKit.API.getImgOfCard(card);
  if (nodeImg) {
    const img = nodeImg;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    
    try {
      // Determinar el tipo MIME basado en la extensión del archivo
      const fileExtension = urlImg.split('.').pop().toLowerCase();
      let mimeType;
      switch(fileExtension) {
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        default:
          mimeType = 'image/png'; // Usar PNG como formato por defecto
      }
      
      // Crear el blob con el tipo MIME apropiado
      const blob = await new Promise(resolve => canvas.toBlob(resolve, mimeType));
      
      // Crear y escribir el ClipboardItem
      const clipboardItem = new ClipboardItem({ [mimeType]: blob });
      await navigator.clipboard.write([clipboardItem]);
      
      console.log(`Imagen copiada al portapapeles como ${mimeType}`);
    } catch (err) {
      console.error('Error al copiar la imagen: ', err);
    }
  } else {
    console.error('La imagen no está precargada');
  }
}

// =================================================================
// =================================================================

const API = {
  sendFavoriteEvent: sendFavoriteEvent, //sendFavoriteEvent(elemento, action, url)
  promisePreloadImg: promisePreloadImg, //promisePreloadImg(url)
  preloadImagesParallel: preloadImagesParallel, //preloadImagesParallel(urls, cb)
  sendFavoriteDeleteEvent: sendFavoriteDeleteEvent, //...(urlImg)
  sendEventPersonalized: sendEventPersonalized, //...(elementOrigin, nameEvent, info)
  copyImgUrl: copyImgUrl, //...(urlImg)
  copyPreloadedImage: copyPreloadedImageV1, //...(urlImg)
};

const value = {
  favAction: favoriteAction,
}

const listenersName = {
  responseFavDelete: 'APP:OptionResponseDeleteFavorite',
  responseOptions: 'APP:OptionResponseOptions',
}

export {API, value, listenersName};