
import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="newAvatar"
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatar"
        name="avatar"
        className="popup__form-el popup__form-el_type_avatar"
        placeholder="Ссылка на новый аватар"
        required
      />
      <span id="avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;