
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(data.email, data.password);
  }

  function handleChange(event) {
    const {name, value} = event.target;
      setData({...data,
        [name]: value
    });
  }

  return(
    <div className="register">
      <p className="register__text">Вход</p>
      <form onSubmit={handleSubmit} className="register__form" >
        <input
          value={data.email}
          onChange={handleChange}
          className="register__form-el"
          name="email"
          type="email"
          placeholder="Email"
          minLength="6"
          maxLength="40"
          required 
        />
        <input
          value={data.password}
          onChange={handleChange}
          className="register__form-el"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="40"
          required 
        />
        <button className="register__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
