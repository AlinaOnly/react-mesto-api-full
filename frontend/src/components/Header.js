
import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  function handleLogout() {
    props.onLogOut();
  }

  return (
    <header className="header page__container">
      <img src={logo} alt="Логотип сайта Место" className="header__logo" />
        <div className="header__registration-info">
          {props.logIn && (<p className="header__email">{props.email}</p>)}
          {props.logIn && (<p className="header__login" onClick={handleLogout}>Выйти</p>)}
          <Route path='/signup'>
            <Link to={"/signin"} className="header__login"> 
              {"Вoйти"}
            </Link>
          </Route>
          <Route path='/signin'>
            <Link to={"/signup"} className="header__login"> 
              {"Регистрация"}
            </Link> 
          </Route>
        </div>
    </header>
  );
}

export default Header;
