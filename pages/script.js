const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
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
////////////////////////////////////////////////////////////////////////
const cards = page.querySelector('.cards__cards-list');
const addButton = page.querySelector('.profile__add');

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
}

for (let i = 0; i < initialCards.length; i = i + 1) {
  addCard(initialCards[i].name, initialCards[i].link);
  console.log(initialCards[i].name);
  console.log(initialCards[i].link);
}

/* addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');
  const title = document.querySelector('.input__text_type_title');

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = '';
  title.value = '';
}); */

