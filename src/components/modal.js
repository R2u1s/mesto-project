import {nameProfile,jobProfile,nameInput,jobInput,editPopup,inputParams,linkAvatar,linkAvatarExist,editAvatarPopup} from '../index.js';
import {patchProfileInfo,patchAvatar} from './api.js';

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown',closePopupByEscape);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown',closePopupByEscape);
}

export function resetPopup(popupElement) {
  if(popupElement.querySelector('.popup__form')){
    popupElement.querySelector('.popup__form').reset();
  }
}

export function editSubmit (evt) {
  evt.preventDefault(); 
  
  const changeProfileInfo = () => {
    renderLoading(evt.target,true);
    patchProfileInfo(nameInput.value,jobInput.value).then(() => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      closePopup(editPopup); 
      renderLoading(evt.target,false);
      evt.target.reset();
    })
  }
  changeProfileInfo();
}

export function avatarSubmit(evt) {
  evt.preventDefault(); 

  const changeProfileAvatar = () => {
    renderLoading(evt.target,true);
    patchAvatar(linkAvatar.value).then(() => {
      linkAvatarExist.src = linkAvatar.value;
      linkAvatarExist.alt = 'Аватар';
      closePopup(editAvatarPopup); 
      renderLoading(evt.target,false);
      evt.target.reset();
    })
  }
  changeProfileAvatar();
}

export const closePopupByButtons = () => {
  const closeButtons = document.querySelectorAll('.popup__close-button');
  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', function () {
      closePopup(popup); 
    }); 
  });
}

export const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened !== null) {
      closePopup(popupOpened);
    }
  }
}

export const closePopupByOverlayClick = (popups) => {
  popups.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.value.includes('popup_opened')) {
        closePopup(popupElement);
      }
    });
  });
}

let defaultValueButtonText ='';
export function renderLoading (popupElement, isLoading) {
  function changeButtonTextToDefault(text) {
    buttonElement.textContent = text;
  }
  const buttonElement = popupElement.querySelector(inputParams.submitButtonSelector);
  if (isLoading) {
    defaultValueButtonText = buttonElement.textContent;
    buttonElement.textContent = "Сохранение...";
  } else {
    setTimeout(changeButtonTextToDefault,300,defaultValueButtonText);
  }
}






