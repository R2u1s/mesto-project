import {nameProfile,jobProfile,nameInput,jobInput,editPopup,inputParams} from '../index.js';

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
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopup); 
  evt.target.reset();
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







