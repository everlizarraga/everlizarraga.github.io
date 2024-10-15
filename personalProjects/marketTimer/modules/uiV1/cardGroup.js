let templateCardGroup = document.getElementById('v1-template-card-group');

function init() {
  templateCardGroup.removeAttribute('id');
  templateCardGroup.remove();
  templateCardGroup.classList.remove('disable');
  // console.log(templateCardGroup);
}

function createCardGroup(groupId, groupTitle, groupInfo, classColor) {
  const newCardGroup = templateCardGroup.cloneNode(true);
  const title = newCardGroup.querySelector('.group-element__title');
  const info = newCardGroup.querySelector('.group-element__info');

  title.textContent = groupTitle;
  info.textContent = groupInfo;
  newCardGroup.classList.add(classColor);
  newCardGroup.setAttribute('data-group-id', groupId);
  
  return newCardGroup;
}

function getDataGroupId(cardGroup) {
  return cardGroup.getAttribute('data-group-id');
}

const API = {
  createCardGroup: createCardGroup,
  getDataGroupId: getDataGroupId, //...(cardGroup)
};


export {init, API};