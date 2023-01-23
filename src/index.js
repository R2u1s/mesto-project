import '../pages/index.css';
import {openPopup,editSubmit,closePopupByButtons,closePopupByOverlayClick,resetPopup} from './components/modal.js';
import {cardSubmit,fillInitialCards,newItemPopup} from './components/card.js';
import {enableValidation,initializeValidation} from './components/validate.js';

export const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
export const editPopupButton = page.querySelector('.profile__edit');
export const editPopup = page.querySelector('#edit-profile');
export const nameInput = editPopup.querySelector('[name="name"]');
export const jobInput = editPopup.querySelector('[name="spec"]');
export const nameProfile = page.querySelector('.profile__name');
export const jobProfile = page.querySelector('.profile__spec');
export const newItemPopupButton = page.querySelector('.profile__add');
export const editForm = editPopup.querySelector('.popup__form');

const cardForm = newItemPopup.querySelector('.popup__form');

/* Кнопка редактирования профиля */
editPopupButton.addEventListener('click', function () {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(editPopup);
    initializeValidation(editPopup);
  });

/* Кнопка создания новой карточки */
newItemPopupButton.addEventListener('click', function () {
    resetPopup(newItemPopup);
    openPopup(newItemPopup);
    initializeValidation(newItemPopup);
});

editForm.addEventListener('submit', editSubmit);
/* Добавление карточки */
cardForm.addEventListener('submit', cardSubmit);

/* Закрытие попапов разными событиями */
closePopupByButtons();
closePopupByOverlayClick(popups);

/* Заполнение страницы карточками по умолчанию */
fillInitialCards();

/* Валидация форм */

export const inputParams = {
  allPopups: '.popup',
  formSelector: '.popup__form',
  formSet: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
} 
enableValidation(inputParams); 