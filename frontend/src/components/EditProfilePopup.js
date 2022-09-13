
import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, props.isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profileSubmitForm"
    >
      <input 
        onChange={handleNameChange}
        type="text"
        id="username"
        value={name}
        name="name"
        className="popup__form-el popup__form-el_type_name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="username-error" className="popup__input-error"></span>
      <input 
        onChange={handleDescriptionChange}                   
        type="text"
        id="job" 
        value={description}
        name="about" 
        className="popup__form-el popup__form-el_type_job"
        placeholder="Расскажите о себе" 
        minLength="2" 
        maxLength="200" 
        required 
      />
      <span id="job-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;