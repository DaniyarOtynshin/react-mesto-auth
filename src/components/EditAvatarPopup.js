import { useState } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const [avatarLink, setAvatarLink] = useState('')

    function handleAvatarLink(e) {
        setAvatarLink(e.target.value)
    }

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
                <input type="url" name="link" value={avatarLink} onChange={handleAvatarLink} id="avatarLink-input" required placeholder="Ссылка на картинку" className="popup__input" />
                <span className="popup__input-error" id="avatarLink-input-error" />
            </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;