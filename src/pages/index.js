import '../pages/index.css';
import {openPopup,editSubmit,closePopupByButtons,closePopupByOverlayClick,resetPopup,avatarSubmit} from '../components/modal.js';
import {cardSubmit,fillInitialCards} from '../components/card.js';
import {enableValidation,initializeValidation} from '../components/validate.js';
import { getProfileInfo,getInitialCards } from '../components/api';
import { inputParams } from '../components/utils';
import {
  popups,
  editPopupButton,
  editPopup,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  newItemPopupButton,
  editForm,
  cardForm,
  editProfileAvatar,
  editAvatarPopup,
  linkAvatar,
  linkAvatarExist,
  avatarForm,
  newItemPopup
} from '../components/constants.js';

export var id;
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