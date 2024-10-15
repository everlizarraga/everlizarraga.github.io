let menu;
let optionList;

const uiV1 = document.getElementById('selected-v1');
const uiV2 = document.getElementById('selected-v2');
const uiV3 = document.getElementById('selected-v3');

const uiVxList = [uiV1, uiV2, uiV3];

function init() {
  menu = document.getElementById('version-select');
  optionList = [...menu.children];
  // console.log(menu.value);
  menu.addEventListener('change', (event) => {
    const valueTarget = event.target.value;
    console.log(valueTarget);
    changeVersion(valueTarget);
  });
  menu.dispatchEvent(new Event('change'));
}

function changeVersion(versionValueText) {
  uiVxList.forEach((e) => {e.classList.add('disable')});
  const targetUi = uiVxList.find((e) => e.id.includes(versionValueText));
  if(targetUi) {
    targetUi.classList.remove('disable');
    // location.hash = versionValueText; //No necesitas esto porque ya tenes el menu que controla las versiones.
  } else {
    console.error('ERROR section ui no encontrada');
  }
}


export {init};