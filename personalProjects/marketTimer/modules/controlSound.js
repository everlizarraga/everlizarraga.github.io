// let audioContext = new (window.AudioContext || window.webkitAudioContext)();
// let audioContext = new (window.AudioContext)();
let audioContext;


function init() {
  const container = document.getElementById('selected-v1');
  // playNotification();

  // audioContext = new (window.AudioContext)();
  // const soundsList = Object.entries(SOUNDS);
  // soundsList.reverse().forEach(([fnName, fn]) => {
  //   const btn = document.createElement('button');
  //   btn.textContent = fnName;
  //   container.prepend(btn);
  //   btn.addEventListener('click', fn);
  // });

  const marketSoundList = Object.entries(MARKET_SOUNDS);
  marketSoundList.reverse().forEach(([fnName, fn]) => {
    const btn = document.createElement('button');
    btn.textContent = fnName;
    container.prepend(btn);
    btn.addEventListener('click', fn);
  });

  // const selectdSoundLongList = Object.entries(SELECTED_SOUNDS.longSounds);
  // const selectdSoundLongListContainer = document.createElement('div');
  // container.prepend(selectdSoundLongListContainer);
  // selectdSoundLongList.reverse().forEach(([fnName, fn]) => {
  //   const btn = document.createElement('button');
  //   btn.textContent = fnName;
  //   selectdSoundLongListContainer.prepend(btn);
  //   btn.addEventListener('click', fn);
  // });

  // const selectdSoundShortList = Object.entries(SELECTED_SOUNDS.shortSounds);
  // const selectdSoundShortListContainer = document.createElement('div');
  // container.prepend(selectdSoundShortListContainer);
  // selectdSoundShortList.reverse().forEach(([fnName, fn]) => {
  //   const btn = document.createElement('button');
  //   btn.textContent = fnName;
  //   selectdSoundShortListContainer.prepend(btn);
  //   btn.addEventListener('click', fn);
  // });
}



// Función para inicializar el contexto de audio
function initAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// Función para reproducir el sonido de notificación
function playNotification() {
    // Asegúrate de que el contexto de audio esté inicializado
    if (!audioContext) {
        initAudioContext();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // La 440Hz
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
}

function beepSound() {
  if (!audioContext) {
    initAudioContext();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

function chirpSound() {

  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function boopSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.15);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.15);
}

function pingSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

function dingSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(900, audioContext.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

function blipSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(500, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);
}

function buzzSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

function chimeSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator1.type = 'sine';
  oscillator2.type = 'sine';
  oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator2.frequency.setValueAtTime(1000, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  oscillator1.start();
  oscillator2.start();
  oscillator1.stop(audioContext.currentTime + 0.5);
  oscillator2.stop(audioContext.currentTime + 0.5);
}

function popSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.05);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function trillSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);

  // Crear un efecto de trino
  for (let i = 0; i < 10; i++) {
    const time = audioContext.currentTime + i * 0.03;
    oscillator.frequency.setValueAtTime(400, time);
    oscillator.frequency.setValueAtTime(500, time + 0.015);
  }

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

// ================================================================
// ================================================================

function priceAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // Nota A5
  oscillator.frequency.setValueAtTime(1760, audioContext.currentTime + 0.1); // Nota A6

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

function timeAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Nota A4

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);

  // Repetir después de una breve pausa
  setTimeout(() => {
    // oscillator.start(audioContext.currentTime + 0.2);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, 200);
}

function profitAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Nota C5
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Nota E5
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Nota G5

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.4);
}

function demandZoneAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(300, audioContext.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

function forexAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

function cryptoAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);

  // Repetir rápidamente para un efecto "digital"
  setTimeout(() => {
    // oscillator.start(audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.15);
  }, 100);
}

function stockAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.2);
  oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.4);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.4);
}

function metalsAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(700, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

function volatilityAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sawtooth';
  
  // Crear un efecto de "sube y baja" rápido
  for (let i = 0; i < 5; i++) {
    const time = audioContext.currentTime + i * 0.1;
    oscillator.frequency.setValueAtTime(300, time);
    oscillator.frequency.linearRampToValueAtTime(600, time + 0.05);
  }

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

function marketCloseAlertSound() {
  if (!audioContext) {
    initAudioContext();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Nota A4
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);

  // Repetir dos veces más
  setTimeout(() => {
    oscillator.start(audioContext.currentTime + 0.3);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, 300);

  setTimeout(() => {
    oscillator.start(audioContext.currentTime + 0.6);
    oscillator.stop(audioContext.currentTime + 0.8);
  }, 600);
}

// ================================================================
// ================================================================

const TEST_SOUNDS = {
  _00test: playNotification,
  _01beepSound: beepSound,
  _02chirpSound: chirpSound,
  _03boopSound: boopSound,
  _04pingSound: pingSound,
  _05dingSound: dingSound,
  _06blipSound: blipSound,
  _07buzzSound: buzzSound,
  _08chimeSound: chimeSound,
  _09popSound: popSound,
  _10trillSound: trillSound,
};

const MARKET_SOUNDS = {
  _20priceAlertSound: priceAlertSound,
  _21timeAlertSound: timeAlertSound,
  _22profitAlertSound: profitAlertSound,
  _23demandZoneAlertSound: demandZoneAlertSound,
  _24forexAlertSound: forexAlertSound,
  _25cryptoAlertSound: cryptoAlertSound,
  _26stockAlertSound: stockAlertSound,
  _27metalsAlertSound: metalsAlertSound,
  _28volatilityAlertSound: volatilityAlertSound,
  _29marketCloseAlertSound: marketCloseAlertSound,
};

const SELECTED_SOUNDS = {
  shortSounds: {
    // _01beepSound: beepSound,
    // _21timeAlertSound: timeAlertSound,

    // _25cryptoAlertSound: cryptoAlertSound,
    _04pingSound: pingSound,
  },
  longSounds: {
    _00test: playNotification,
    // _05dingSound: dingSound,
    // _08chimeSound: chimeSound,
    _20priceAlertSound: priceAlertSound,
    // _22profitAlertSound: profitAlertSound,
    // _27metalsAlertSound: metalsAlertSound,
  }
};

export {init, TEST_SOUNDS, MARKET_SOUNDS, SELECTED_SOUNDS};