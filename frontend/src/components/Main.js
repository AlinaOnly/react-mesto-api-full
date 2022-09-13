
import React, { useContext }  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__container">
      <section className="profile">
        <div className="profile__avatar-edit">
          <button 
            onClick={props.onEditAvatar} 
            className="profile__avatar-button" 
            type="button" 
            title="Изменить аватар">
          </button>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__description">
            <h1 className="profile__username">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button 
            onClick={props.onEditProfile} 
            className="profile__edit-button button-hover"
            type="button" 
            aria-label="Редактировать">
          </button>
        </div>
          <button 
            onClick={props.onAddPlace} 
            className="profile__add-button button-hover" 
            type="button" 
            aria-label="Добавить">
          </button>
      </section>
      <section className="elements" aria-label="Секция с фото">
        {
          props.cards.map((card) => (
            <Card 
              key={card._id} 
              onCardClick={props.onCardClick} 
              onCardDelete={props.onCardDelete} 
              onCardLike={props.onCardLike}
              card={card} 
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main;
