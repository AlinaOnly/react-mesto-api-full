
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

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
    }).then(this._setError);
  }

  postInitialCards(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({name: data.name, link: data.link}),
    }).then(this._setError);
  }

  changeAvatar( {avatar}, token ) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
      body:JSON.stringify({avatar: avatar}),
    }).then(this._setError);
  }

  getInfoUser(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
    }).then(this._setError);
  }

  editInfoUser( {name, about}, token ) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
      body: JSON.stringify({name: name, about: about}),
    }).then(this._setError);
  }

  deleteInitialCards(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
    }).then(this._setError);
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
    }).then(this._setError);
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      Authorization: `Bearer ${token}`,
    }).then(this._setError);
  }
}

const api = new Api({
  url: 'https://api.trenikova.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  }
});

export default api;