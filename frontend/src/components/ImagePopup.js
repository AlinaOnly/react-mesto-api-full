
import React from 'react';


function ImagePopup(props) {
  return (
    <div className={props.card.name ? "popup popup_background popup_open" : "popup"} id="imagePopup">
      <div className="popup__photo">
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <h2 className="popup__image-text">{props.card.name}</h2>
        <button onClick={props.onClose} className="popup__close-button button-hover" type="button" aria-label="Закрыть попап"></button>
      </div>
    </div>
  );
}

export default ImagePopup;