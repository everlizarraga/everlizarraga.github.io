const containerNotifications = document.querySelector('.notifications');
const toastContainer = containerNotifications.querySelector('.toasts-container');
const toastTmeplate = document.getElementById('toast-template');

function init() {
  toastTmeplate.removeAttribute('id');
  toastTmeplate.remove();
}

function controlToast(toast) {
  return {
    get toastText() {return toast.querySelector('.toast__text').textContent},
    set toastText(newText) {toast.querySelector('.toast__text').textContent = newText},

    get toastActionText() {return toast.querySelector('.toast__action').textContent},
    set toastActionText(newText) {toast.querySelector('.toast__action').textContent = newText},

    visibleIconCheck(trueFalse) {
      if(!trueFalse) {
        toast.querySelector('.toast__icon-container').classList.add('disable');
      }
    },

    visibleActionText(trueFalse) {
      if(!trueFalse) {
        toast.querySelector('.toast__action').classList.add('disable');
      }
    },
  }
}

function createToast() {
  return toastTmeplate.cloneNode(true);
}

let timerTime = 1000*3;

function disappear(card, callback) {
  setTimeout(() => {
    card.removeEventListener('click', callback);
    card.remove();
  }, timerTime);
}

// =====================================================
function notifyCopy() {
  const newToast = createToast();
  const controler = controlToast(newToast);
  controler.toastText = 'Copied';
  controler.visibleActionText(false);
  toastContainer.prepend(newToast);
  disappear(newToast);
}

function notifyAdd(callback) {
  const newToast = createToast();
  const controler = controlToast(newToast);
  controler.toastText = 'Add ToDo -';
  controler.toastActionText = 'View';

  toastContainer.prepend(newToast);
  newToast.addEventListener('click', callback);
  disappear(newToast, callback);
}

function notifyDelete(callback) {
  const newToast = createToast();
  const controler = controlToast(newToast);
  controler.toastText = 'Deleted -';
  controler.toastActionText = 'Back';

  toastContainer.prepend(newToast);
  newToast.addEventListener('click', callback);
  disappear(newToast, callback);
}

const API = {
  // notifyCopy: notifyCopy,
  notifyCopy() {
    notifyCopy();
  },
  // notifyAdd: notifyAdd,
  notifyAdd(callback) {
    notifyAdd(callback);
  },
  // notifyDelete: notifyDelete,
  notifyDelete(callback) {
    notifyDelete(callback);
  },

  get timerTime() {return timerTime},
  set timerTime(newTime) {timerTime = newTime},
};

export {init, API};
