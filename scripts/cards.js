const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictues.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
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

function addCard(cardTitle, cardImageLink, cardImageAlt) {
  const cardTemplate = document.querySelector('#card').content;
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
    const popupImage = page.querySelector('#image');
    popupImage.classList.toggle('popup_opened');
    const buttonCloseImage = popupImage.querySelector('.popup__close-button');
    
    //Отображение картинки
    const imageCard = evt.target.closest('.cards__card');
    const imageTitle = imageCard.querySelector('.cards__title');
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__figcaption').textContent = imageTitle.textContent;

    buttonCloseImage.addEventListener('click', function () {
      popupImage.classList.remove('popup_opened');
    });
  });

  cards.prepend(cardElement); 
}

//////////Заполнение страницы карточками по умолчанию//////////////

initialCards.reverse().forEach(function (item) {
    addCard(item.name,item.link,item.alt);
  });

//////////Окно добавление карточки//////////////////
const popupAdd = page.querySelector('#add-card');
const buttonAddPopup = page.querySelector('.profile__add');

//Работа кнопок открытия/закрытия
buttonAddPopup.addEventListener('click', function () {
  popupAdd.classList.toggle('popup_opened');
});

const buttonClosePopup = popupAdd.querySelector('.popup__close-button');
buttonClosePopup.addEventListener('click', function () {
  popupAdd.classList.remove('popup_opened');
});

//Добавление карточки по кнопке "Создать"//
const buttonCreate = popupAdd.querySelector('.popup__button');
const formAddElement = popupAdd.querySelector('.popup__form');
buttonCreate.addEventListener('click', function () {
  function addFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = formAddElement.querySelector('[name="Name"]');
    const linkInput = formAddElement.querySelector('[name="Link"]');
    
    addCard(nameInput.value,linkInput.value);
    popupAdd.classList.remove('popup_opened');
  }; 
  formAddElement.addEventListener('submit', addFormSubmit); 
});  