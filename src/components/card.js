import { openPopup, closePopup, renderLoading } from './modal.js';
import { 
  postCard, 
  deleteCardApi, 
  addLikeCard, 
  removeLikeCard } from './api.js';
import { id } from '../pages/index.js';
import {
  cards,
  cardTemplate,
  popupImage,
  popupImageImg,
  popupImageFigcaption,
  newItemPopup,
  nameImageInput,
  linkInput
} from './constants.js';

//////////Функция создания карточки//////////////

function createCard(cardTitle, cardImageLink, cardImageAlt, ownerId, likes, cardId) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  if (cardImageAlt === undefined) {
    cardImageAlt = cardTitle;
  }
  cardElement.querySelector('.cards__title').textContent = cardTitle;
  cardElement.querySelector('.cards__image').src = cardImageLink;
  cardElement.querySelector('.cards__image').alt = cardImageAlt;
  cardElement.querySelector('#cardId').textContent = cardId;

  //Лайк
  const cardLikesQty = cardElement.querySelector('.cards__like-qty');
  cardLikesQty.textContent = likes.length.toString();
  if (
    likes.some(function (item) {
      return item._id === id;
    })
  ) cardElement.querySelector('.cards__like').classList.toggle('cards__like_active');

  //Кнопка
  cardElement.querySelector('.cards__like').addEventListener('click', function (evt) {
    if (!evt.target.classList.value.includes('cards__like_active')) {
      addLikeCard(cardId)
        .then((res) => {
          cardElement.querySelector('.cards__like-qty').textContent = res.likes.length;
          toggleQtyVisibility(cardElement);
          evt.target.classList.toggle('cards__like_active');
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      removeLikeCard(cardId)
        .then((res) => {
          cardElement.querySelector('.cards__like-qty').textContent = res.likes.length;
          toggleQtyVisibility(cardElement);
          evt.target.classList.toggle('cards__like_active');
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  });

  toggleQtyVisibility(cardElement);
  //Кнопка удаления карточки
  deleteCard(cardElement);
  if (ownerId === id) {
    cardElement.querySelector('.cards__delete').classList.add('cards__delete_active');
  }
  //Кнопка просмотра изображения
  openImage(cardElement);

  return cardElement;
}

export function toggleQtyVisibility(cardElement) {
  const cardLikesQty = cardElement.querySelector('.cards__like-qty');
  if (cardLikesQty.textContent === '0') {
    cardLikesQty.classList.remove('cards__like-qty_active');
  } else {
    if (!cardLikesQty.classList.value.includes('cards__like-qty_active')) {
      cardLikesQty.classList.toggle('cards__like-qty_active');
    }
  }
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

function addCard(cardTitle, cardImageLink, cardImageAlt, ownerId, likes, cardId) {
  cards.prepend(createCard(cardTitle, cardImageLink, cardImageAlt, ownerId, likes, cardId));
}

/* Работа кнопки удаления карточки */
const deleteCard = (cardElement) => {
  const deleteButton = cardElement.querySelector('.cards__delete');
  deleteButton.addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.cards__card');

    deleteCardApi(cardElement.querySelector('#cardId').textContent)
      .then(listItem.remove())
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  });
}

export function cardSubmit(evt) {
  evt.preventDefault();
  const nameImageInputValue = nameImageInput.value;
  const linkInputValue = linkInput.value;

  const getNewCardId = () => {
    renderLoading(evt.target, true);
    postCard(nameImageInputValue, linkInputValue)
      .then((data) => {
        addCard(nameImageInputValue, linkInputValue, '', id, [], data._id);
        closePopup(newItemPopup);
        evt.target.reset();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
      .finally(
        renderLoading(evt.target, false)
      )
  }
  getNewCardId();
}

export function fillInitialCards(array) {
  array.reverse().forEach(function (item) {
    addCard(item.name, item.link, item.alt, item.owner._id, item.likes, item._id);
  });
}