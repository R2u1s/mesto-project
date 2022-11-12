const page = document.querySelector('.page');
const editPopup = page.querySelector('#edit-profile');
const editPopupButton = page.querySelector('.profile__edit');
const closeEditPopupButton = editPopup.querySelector('.popup__close-button');
const newItemPopup = page.querySelector('#add-card');
const newItemPopupButton = page.querySelector('.profile__add');
const closeNewPopupButton = newItemPopup.querySelector('.popup__close-button');
//////////////////////////////////////////////////////////////////////

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editPopupButton.addEventListener('click', function () {
  openPopup(editPopup);
});

closeEditPopupButton.addEventListener('click', function () {
  closePopup(editPopup);
});

newItemPopupButton.addEventListener('click', function () {
  openPopup(newItemPopup);
});

closeNewPopupButton.addEventListener('click', function () {
  closePopup(newItemPopup);
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




