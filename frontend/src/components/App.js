
import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import * as apiAutorization from '../utils/apiAutorization';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardDelete, setCardDelete] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const history = useHistory();
  const [logIn, setLogIn] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  const [email, setEmail] = useState(null);


  function handleRegister(email, password) {
    apiAutorization.registration( {email, password} )
      .then((res) => {
        if (res.email) {
          setRegisterIn(true);
          history.push('/signin');
          setIsInfoTooltipPopupOpen(true);
        }
      }).catch(err => {
        setRegisterIn(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Ошибка register ${err}`);
    });
  }

  function handleLogin(email, password) {
    apiAutorization.autorization( {email, password} )
      .then((res) => {
        if(res) {
          setLogIn(true);
          setEmail(res.email);
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
          history.push('/');
        }
      }).catch(err => {
        setIsInfoTooltipPopupOpen(true);
        console.log(`Ошибка login ${err}`);
    });
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setEmail(false);
    setLogIn(false);
    history.push('/signin');
  }

  const handleTokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
      if (jwt) {
        apiAutorization.token(jwt)
        .then(res => {
          if(res) {
            setEmail(res.email);
            setLogIn(true);
            history.push('/');
          }
        }).catch(err =>
        console.log(`Ошибка token ${err}`));
      }
  }, [history]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  useEffect(() => {
    if (logIn) {
      Promise.all([api.getInfoUser(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
          setEmail(userData.email);
          history.push('/');
        }).catch(err =>
          console.log(err));
    }
  }, [history, logIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.changeLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err =>
      console.log(err));
    } else {
      api.changeLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(err =>
      console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteInitialCards(card._id).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.editInfoUser(name, about).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api.postInitialCards(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err =>
      console.log(err));
  }

  function handleTrashButtonClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        logIn={logIn}
        onLogOut={handleLogOut}
        email={email}
      />
        
      <Switch>
        <Route path='/signup'>
          <Register 
            onRegister={handleRegister}
          />
        </Route>
        <Route path='/signin'>
          <Login 
            onLogin={handleLogin}
          />
        </Route> 
          
        <ProtectedRoute
          path='/'
          component={Main}
          logIn={logIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleTrashButtonClick}
          selectedCard={selectedCard}
          onInfoTooltip={handleInfoTooltip}
        />

      </Switch>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          card={cardDelete}
          onConfirmDelete={handleCardDelete}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isSuccess={registerIn}
          onClose={closeAllPopups}
        />

        <Footer />

    </CurrentUserContext.Provider>
  );
}

export default App;
