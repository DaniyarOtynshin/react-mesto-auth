import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarLink = React.createRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            link: avatarLink.current.value,
        });
        handleClose();
    }

    function handleClose() {
        props.onClose()
        avatarLink.current.value = '';
    }

    return (
        <PopupWithForm name="change-photo" isOpen={props.isOpen} title="Обновить аватар" onClose={handleClose} onSubmit={handleSubmit} buttonText="Сохранить">
            <section className="popup__section">
                <input type="url" name="link" ref={avatarLink} id="link-input" required placeholder="Ссылка на картинку" className="popup__input" />
                <span className="popup__input-error" id="link-input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;