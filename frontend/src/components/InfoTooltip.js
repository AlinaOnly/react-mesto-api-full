
import React from 'react';
import SuccessPhoto from '../images/success.svg';
import FailPhoto from '../images/unsuccess.svg';

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_open popup_open-info` : "popup"}>
      <div className="popup__container">
        <button 
          onClick={props.onClose}
          className="popup__close-button button-hover"
          type="button"
          aria-label="Закрыть попап">
        </button>
        <img 
          src={props.isSuccess ? SuccessPhoto : FailPhoto} 
          alt="Статус регистрации" 
          className="popup__info-logo" 
        />
        <h2 className="popup__info-tool">
          {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;