import { newItemPopup } from '../index.js';
import { openPopup,closePopup } from './modal.js';

const pic1 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
const pic2 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
const pic3 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
const pic4 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
const pic5 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
const pic6 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');
//, import.meta.url - добавить в конец файла

const initialCards = [
    {
      name: 'Архыз',
      link: pic1,
      alt: 'Архыз. В горах немного снега'
    },
    {
      name: 'Челябинская область',
      link: pic2,
      alt: 'Челябинская область. Озеро, вокруг лес, немного снега, вечернее солнце'
    },
    {
      name: 'Иваново',
      link: pic3,
      alt: 'Иваново. Мрачные панельные дома'
    },
    {
      name: 'Камчатка',
      link: pic4,
      alt: 'Камчатка. Впереди сопка, немного снега'
    },
    {
      name: 'Холмогорский район',
      link: pic5,
      alt: 'Холмогорский район, железная дорога уходящая в горизонт, вокруг лес'
    },
    {
      name: 'Байкал',
      link: pic6,
      alt: 'Зимний Байкал'
    }
  ];

//////////Функция добавления удаления карточки//////////////
const page = document.querySelector('.page');
const cards = document.querySelector('.cards__cards-list');
const cardTemplate = document.querySelector('#card').content;
const popupImage = page.querySelector('#image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageFigcaption = popupImage.querySelector('.popup__figcaption');

function createCard(cardTitle, cardImageLink, cardImageAlt) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  if (cardImageAlt===undefined) {
    cardImageAlt = cardTitle;
  }
  cardElement.querySelector('.cards__title').textContent = cardTitle;
  cardElement.querySelector('.cards__image').src = cardImageLink;
  cardElement.querySelector('.cards__image').alt = cardImageAlt;
  
  //Лайк
  cardElement.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });
  
  //Кнопка удаления карточки
  deleteCard(cardElement);
  //Кнопка просмотра изображения
  openImage(cardElement);

  return cardElement;
}

//Кнопка просмотра изображения
const openImage = (cardElement) => {
  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.addEventListener('click', function (evt) {
    openPopup(popupImage);
    const imageCard = evt.target.closest('.cards__card');
    const imageTitle = imageCard.querySelector('.cards__title');
    popupImageImg.src = evt.target.src;
    popupImageFigcaption.textContent = imageTitle.textContent;
    popupImageImg.alt = evt.target.alt;
  });
}

function addCard(cardTitle, cardImageLink, cardImageAlt) {
  cards.prepend(createCard(cardTitle, cardImageLink, cardImageAlt)); 
}

/* Работа кнопки удаления карточки */
const deleteCard = (cardElement) => {
  const deleteButton = cardElement.querySelector('.cards__delete');
  deleteButton.addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.cards__card');
    listItem.remove();
  });
}

export function cardSubmit (evt) {
  const nameImageInput = newItemPopup.querySelector('[name="Name"]');
  const linkInput = newItemPopup.querySelector('[name="link"]');

  evt.preventDefault(); 
  addCard(nameImageInput.value,linkInput.value);
  nameImageInput.value = '';
  linkInput.value = '';
  closePopup(newItemPopup);
  evt.target.reset();
}

export const fillInitialCards = () => {
  initialCards.reverse().forEach(function (item) {
    addCard(item.name,item.link,item.alt);
  });
}