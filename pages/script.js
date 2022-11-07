const page = document.querySelector('.page');
const popup = page.querySelector('#edit-profile');
const editButton = page.querySelector('.profile__edit');
const closeButton = popup.querySelector('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
  });

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

const formElement = popup.querySelector('.popup__form');
function handleFormSubmit(evt) {
  evt.preventDefault();  
  const nameInput = formElement.querySelector('[name="name"]');
  const jobInput = formElement.querySelector('[name="spec"]');
  
  page.querySelector('.profile__name').textContent = nameInput.value;
  page.querySelector('.profile__spec').textContent = jobInput.value;
  popup.classList.remove('popup_opened');
};
formElement.addEventListener('submit', handleFormSubmit); 

//////////Функция добавления карточки//////////////
const cards = page.querySelector('.cards__cards-list');

function addCard(cardTitle, cardImageLink) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = cardTitle;
  cardElement.querySelector('.cards__image').src = cardImageLink;
  
  cardElement.querySelector('.cards__like').addEventListener('click', function (evt) {
  console.log(evt);
  evt.target.classList.toggle('cards__like_active');
  });
  cards.append(cardElement); 
  console.log(cardTitle,cardImageLink);
}

//////////Заполнение страницы карточками по умолчанию//////////////
initialCards.forEach(function (item) {
  addCard(item.name,item.link);
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

////////////

