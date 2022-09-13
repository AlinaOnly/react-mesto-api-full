
import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onSubmit={handleSubmit}
      onClose={props.onClose}
      submitbuttonText="Создать" 
      title="Новое место" 
      name="newCardAddForm"
    >
      <input 
        onChange={handleNameChange}
        type="text" 
        id="title"
        value={name} 
        name="name" 
        className="popup__form-el popup__form-el_type_title"
        placeholder="Новое место" 
        minLength="2" 
        maxLength="40" 
        required 
      />
      <span id="title-error" className="popup__input-error"></span>
      <input 
        onChange={handleLinkChange}
        type="url" 
        id="link" 
        value={link}
        name="link" 
        className="popup__form-el popup__form-el_type_link"
        placeholder="Ссылка на картинку" 
        minLength="2" 
        maxLength="200" 
        required 
      />
      <span id="link-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}    

export default AddPlacePopup;