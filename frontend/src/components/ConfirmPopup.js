
import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {

  function handleSubmitConfirm(event) {
    event.preventDefault();
    props.onConfirmDelete(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen} 
      onSubmit={handleSubmitConfirm}
      onClose={props.onClose}
      title="Вы уверены?"
      name="confirmImageDelete"
      submitbuttonText="Да"
    />
  )
}

export default ConfirmPopup;