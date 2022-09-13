
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(data.email, data.password);
  }

  function handleChange(event) {
    const {name, value} = event.target;
      setData({...data,
        [name]: value
    });
  }

  return(
    <div className="register">
      <p className="register__text">Регистрация</p>
      <form className="register__form" onSubmit={handleSubmit} >
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
        <button className="register__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="/signin" className="register__signin">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;