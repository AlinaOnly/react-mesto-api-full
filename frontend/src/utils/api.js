
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _setError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то тут не так: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}${'/cards'}`, {
     // method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._setError);
  }

  postInitialCards(data) {
    return fetch(`${this._url}${'/cards'}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.name, link: data.link}),
      credentials: 'include',
    }).then(this._setError);
  }

  changeAvatar( {avatar} ) {
    return fetch(`${this._url}${'/users/me/avatar'}`, {
      method: 'PATCH',
      headers: this._headers,
      body:JSON.stringify({avatar: avatar}),
      credentials: 'include',
    }).then(this._setError);
  }

  getInfoUser() {
    return fetch(`${this._url}${'/users/me'}`, {
     // method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._setError);
  }

  editInfoUser( {name, about} ) {
    return fetch(`${this._url}${'/users/me'}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: name, about: about}),
      credentials: 'include',
    }).then(this._setError);
  }

  deleteInitialCards(cardId) {
    return fetch(`${this._url}${'/cards/'}${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._setError);
  }

  addLike(cardId) {
    return fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._setError);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._setError);
  }
}

const api = new Api({
  url: 'https://api.trenikova.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
});

console.log('ti pidor'); // удоли

export default api;