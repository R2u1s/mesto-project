import '../pages/index.css';
import {openPopup,editSubmit,closePopupByButtons,closePopupByOverlayClick,resetPopup,avatarSubmit} from '../components/modal.js';
import {cardSubmit,newItemPopup,fillInitialCards} from '../components/card.js';
import {enableValidation,initializeValidation} from '../components/validate.js';
import { getProfileInfo,getInitialCards } from '../components/api';
import { inputParams } from '../components/utils';

export var id;

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
export const editProfileAvatar = page.querySelector('.profile__avatar');
export const editAvatarPopup = page.querySelector('#edit-avatar');
export const linkAvatar = editAvatarPopup.querySelector('[name="link"]');
export const linkAvatarExist = page.querySelector('.profile__pic');
const avatarForm = editAvatarPopup.querySelector('.popup__form');
///////////////////////////////////////////////////////////////////
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
/* Кнопка обновления аватара */
editProfileAvatar.addEventListener('click', function () {
  linkAvatar.value = linkAvatarExist.src;
  openPopup(editAvatarPopup);
  initializeValidation(editAvatarPopup);
});

/* Изменение информации пользователя */
editForm.addEventListener('submit', editSubmit);
/* Добавление карточки */
cardForm.addEventListener('submit', cardSubmit);
/* Имзменение аватара */
avatarForm.addEventListener('submit', avatarSubmit);

/* Закрытие попапов разными событиями */
closePopupByButtons();
closePopupByOverlayClick(popups);

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, cards]) => {
    /* Заполнение информации пользователя */
    nameProfile.textContent = profileData.name;
    jobProfile.textContent = profileData.about;
    linkAvatarExist.src = profileData.avatar;
    id = profileData._id;
    /* Заполнение страницы карточками при старте страницы */
    fillInitialCards(cards);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 


/* Валидация форм */
enableValidation(inputParams); 