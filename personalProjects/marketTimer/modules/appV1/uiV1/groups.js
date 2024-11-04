const groupsContainer = document.querySelector('#selected-v1 .monitor__groups');
const groupsList = groupsContainer.querySelector('.groups__group-list-container');
let groupsTitle;
let groupsBtn;

function init() {
  groupsTitle = groupsContainer.querySelector('.groups__title');
  groupsBtn = groupsContainer.querySelector('.groups__title-btn--add');
}

function addCardGroup(cardGroup) {
  groupsList.prepend(cardGroup);
}

function getCardGroupElement(groupId) { //data-group-id
  const elementsList = [...groupsList.children];
  return elementsList.find(e => e.getAttribute('data-group-id') == groupId);
}

const API = {
  addCardGroup: addCardGroup, //...cardGroup
  getCardGroupElement: getCardGroupElement, //...groupId
};

export {init, API};
