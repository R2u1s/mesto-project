const page = document.querySelector('.page');
const editPopup = page.querySelector('#edit-profile');
const editPopupButton = page.querySelector('.profile__edit');
const closeEditPopupButton = editPopup.querySelector('.popup__close-button');
const newItemPopup = page.querySelector('#add-card');
const newItemPopupButton = page.querySelector('.profile__add');
const closeNewPopupButton = newItemPopup.querySelector('.popup__close-button');
const nameInput = editPopup.querySelector('[name="name"]');
const jobInput = editPopup.querySelector('[name="spec"]');
const nameProfile = page.querySelector('.profile__name');
const jobProfile = page.querySelector('.profile__spec');
const saveButton = editPopup.querySelector('.popup__button');
//////////////////////////////////////////////////////////////////////

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editPopupButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

function addFormSubmit(evt) {
  evt.preventDefault();  
};

saveButton.addEventListener('click', function () {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  editPopup.addEventListener('submit', addFormSubmit);
  closePopup(editPopup);
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








