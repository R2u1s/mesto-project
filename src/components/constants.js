const page = document.querySelector('.page');
const popups = document.querySelectorAll('.popup');
const editPopupButton = page.querySelector('.profile__edit');
const editPopup = page.querySelector('#edit-profile');
const nameInput = editPopup.querySelector('[name="name"]');
const jobInput = editPopup.querySelector('[name="spec"]');
const nameProfile = page.querySelector('.profile__name');
const jobProfile = page.querySelector('.profile__spec');
const newItemPopupButton = page.querySelector('.profile__add');
const editForm = editPopup.querySelector('.popup__form');
const cards = document.querySelector('.cards__cards-list');
const cardTemplate = document.querySelector('#card').content;
const popupImage = page.querySelector('#image');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageFigcaption = popupImage.querySelector('.popup__figcaption');
const newItemPopup = page.querySelector('#add-card');
const nameImageInput = newItemPopup.querySelector('[name="Name"]');
const linkInput = newItemPopup.querySelector('[name="link"]');
const cardForm = newItemPopup.querySelector('.popup__form');
const editProfileAvatar = page.querySelector('.profile__avatar');
const editAvatarPopup = page.querySelector('#edit-avatar');
const linkAvatar = editAvatarPopup.querySelector('[name="link"]');
const linkAvatarExist = page.querySelector('.profile__pic');
const avatarForm = editAvatarPopup.querySelector('.popup__form');

export {
    page,
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
    cards,
    cardTemplate,
    popupImage,
    popupImageImg,
    popupImageFigcaption,
    newItemPopup,
    nameImageInput,
    linkInput
}