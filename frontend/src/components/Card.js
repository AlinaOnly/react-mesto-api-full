
import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash-button ${isOwn ? "" : "element__trash-button_hidden"}`); 
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__heart-button ${isLiked ? "element__heart-active" : ""}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <button 
        className={cardDeleteButtonClassName} 
        onClick={handleDeleteClick} 
        type="button" 
        title="Удалить">
      </button>
      <img 
        onClick={handleClick}  
        src={props.card.link} 
        alt={props.card.name} 
        className="element__photo" 
      />
      <div className="element__container">
        <h2 className="element__text">{props.card.name}</h2>
          <div className="element__heart-container">
            <button 
              className={cardLikeButtonClassName} 
              onClick={handleLikeClick} 
              type="button" 
              aria-label="Нравится">
            </button>
            <p className="element__heart-counter">{props.card.likes.length}</p>
          </div>
      </div>
    </article>
  );
}

export default Card;