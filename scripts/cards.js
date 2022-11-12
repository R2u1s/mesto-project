const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз. В горах немного снега'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область. Озеро, вокруг лес, немного снега, вечернее солнце'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново. Мрачные панельные дома'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка. Впереди сопка, немного снега'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район, железная дорога уходящая в горизонт, вокруг лес'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Зимний Байкал'
    }
  ];

//////////Функция добавления удаления карточки//////////////
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
  console.log(evt);
  evt.target.classList.toggle('cards__like_active');
  });
  
  //Кнопка удаления карточки
  const deleteButton = cardElement.querySelector('.cards__delete');
  deleteButton.addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.cards__card');
    listItem.remove();
  });
  
  //Кнопка просмотра изображения
  const cardImage = cardElement.querySelector('.cards__image')
  cardImage.addEventListener('click', function (evt) {
    //Открытие попапа
    openPopup(popupImage);
    
    //Отображение картинки
    const imageCard = evt.target.closest('.cards__card');
    const imageTitle = imageCard.querySelector('.cards__title');
    popupImageImg.src = evt.target.src;
    popupImageFigcaption.textContent = imageTitle.textContent;

  });

  return cardElement;
}

function addCard(cardTitle, cardImageLink, cardImageAlt) {
  cards.prepend(createCard(cardTitle, cardImageLink, cardImageAlt)); 
}

//////////Заполнение страницы карточками по умолчанию//////////////

initialCards.reverse().forEach(function (item) {
    addCard(item.name,item.link,item.alt);
  });

//Добавление карточки по кнопке "Создать"//
const nameImageInput = newItemPopup.querySelector('[name="Name"]');
const linkInput = newItemPopup.querySelector('[name="Link"]');
const buttonCreate = newItemPopup.querySelector('.popup__button');
buttonCreate.addEventListener('click', function () {
  addCard(nameImageInput.value,linkInput.value);
  newItemPopup.addEventListener('submit', addFormSubmit);
  nameImageInput.value = '';
  linkInput.value = '';
  closePopup(newItemPopup);
});  