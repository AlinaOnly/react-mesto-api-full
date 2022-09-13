import React from 'react';

function PopupWithForm( {isOpen, name, onClose, title, onSubmit, children, submitbuttonText } ) {
  return (
    <div className={isOpen ? `popup popup_type_${name} popup_open` : "popup"}>
      <div className="popup__container">
        <button 
          onClick={onClose} 
          className="popup__close-button button-hover" 
          type="button" 
          aria-label="Закрыть попап">
        </button>
        <h2 className="popup__title">{title}</h2>
        <form 
          className="popup__form" 
          id={name} 
          onSubmit={onSubmit} 
          name="profileSubmitForm" 
          >
          {children}
          <button 
            className="popup__submit-button" 
            type="submit" 
            value="Сохранить">{submitbuttonText ?? "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
