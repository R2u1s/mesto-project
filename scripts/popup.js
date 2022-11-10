const page = document.querySelector('.page');
const popup = page.querySelector('#edit-profile');
const editButton = page.querySelector('.profile__edit');
const closeButton = popup.querySelector('.popup__close-button');

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




