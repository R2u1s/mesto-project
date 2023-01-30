import {nameProfile,jobProfile,linkAvatarExist} from '../index.js';
import {fillInitialCards,toggleQtyVisibility} from './card.js';

export var id='';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'f666a8fe-ebaf-4340-9b7e-5a965925e3c4',
    'Content-Type': 'application/json'
  }
}

/* Получение информации о пользователе и заполнение её на странице */
export const fillProfileInfo = () =>{
    fetch(`${config.baseUrl}/users/me`, {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      nameProfile.textContent = res.name;
      jobProfile.textContent = res.about;
      linkAvatarExist.src = res.avatar;
      id = res._id;
    })
    .catch((res) => {
      nameProfile.textContent = 'Имя пользователя';
      jobProfile.textContent = 'Профессия';
      linkAvatarExist.src = '';
    });
};

/* Получение инфмормации о карточках и отображение их на странице */
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    return res;
  })
}

/* Отправка измененной информации о пользователе на сервер */
export const patchProfileInfo = (nameInput,aboutInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

/* Отправка измененной ссылки на аватар*/
export const patchAvatar = (linkInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: linkInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

/* Отправка новой карточки на сервер */
export const postCard = (nameInput,linkInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: nameInput,
      link: linkInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

/* Удаление карточки */
export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

/* Ставим лайк */
export const addLikeCard = (cardElement,cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    cardElement.querySelector('.cards__like-qty').textContent = res.likes.length;
    toggleQtyVisibility(cardElement);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

/* Убираем лайк */
export const removeLikeCard = (cardElement,cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    cardElement.querySelector('.cards__like-qty').textContent = res.likes.length;
    toggleQtyVisibility(cardElement);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}