
const url = 'https://api.trenikova.nomoredomains.sbs';

const registration = ({ email, password }) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    }),
    credentials: 'include',
  }).then(error);
};

const autorization = ({ email, password }) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, password
    }),
    credentials: 'include',
  }).then(error);
};

const token = (jwt) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`,
    },
    credentials: 'include',
  }).then(error);
};

const error = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то тут не так: ${res.status}`);
};

export {registration, autorization, token};