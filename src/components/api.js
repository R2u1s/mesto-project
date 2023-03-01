import { request } from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'f666a8fe-ebaf-4340-9b7e-5a965925e3c4',
    'Content-Type': 'application/json'
  }
}

const url = {
  getProfileInfo: `${config.baseUrl}/users/me`,
  getInitialCards: `${config.baseUrl}/cards`,
  patchProfileInfo: `${config.baseUrl}/users/me`,
  patchAvatar: `${config.baseUrl}/users/me/avatar`,
  postCard: `${config.baseUrl}/cards`
}

const options = {
  getProfileInfo: {
    headers: {
      authorization: config.headers.authorization
    }
  },
  getInitialCards: {
    headers: {
      authorization: config.headers.authorization
    }
  },
  deleteCardApi: {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  },
  addLikeCard: {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  },
  removeLikeCard: {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  }
}

/* Получение информации о пользователе и заполнение её на странице */
export const getProfileInfo = () => {
  return request(url.getProfileInfo, options.getProfileInfo)
    .then((res) => {
      return res;
    })
}

/* Получение инфмормации о карточках и отображение их на странице */
export const getInitialCards = () => {
  return request(url.getInitialCards, options.getInitialCards)
    .then((res) => {
      return res;
    })
}

/* Отправка измененной информации о пользователе на сервер */
export const patchProfileInfo = (nameInput, aboutInput) => {
  return request(url.patchProfileInfo, {
    method: 'PATCH',
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}

/* Отправка измененной ссылки на аватар*/
export const patchAvatar = (linkInput) => {
  return request(url.patchAvatar, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: linkInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}

/* Отправка новой карточки на сервер */
export const postCard = (nameInput, linkInput) => {
  return request(url.postCard, {
    method: 'POST',
    body: JSON.stringify({
      name: nameInput,
      link: linkInput
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}

/* Удаление карточки */
export const deleteCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, options.deleteCardApi);
}

/* Ставим лайк */
export const addLikeCard = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, options.addLikeCard);
}

/* Убираем лайк */
export const removeLikeCard = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, options.removeLikeCard);
}