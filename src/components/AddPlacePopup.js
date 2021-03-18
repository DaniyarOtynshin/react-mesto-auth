import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
          name, link
        });
        handleClose();
    }

    function handleClose() {
        props.onClose()
        setName('');
        setLink('');
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleLink(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm name="add" isOpen={props.isOpen} title="Новое место" onClose={handleClose} buttonText="Создать" onSubmit={handleAddPlaceSubmit}>
            <section className="popup__section">
                <input type="text" minLength="2" maxLength="30" name="name" id="title-input" required placeholder="Название" className="popup__input" value={name} onChange={handleName} />
                <span className="popup__input-error" id="title-input-error"></span>
            </section>
            <section className="popup__section">
                <input type="url" name="link" id="link-input" required placeholder="Ссылка на картинку" className="popup__input" value={link} onChange={handleLink} />
                <span className="popup__input-error" id="link-input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default AddPlacePopup;