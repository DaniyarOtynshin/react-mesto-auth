import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm name="edit" isOpen={props.isOpen} title="Редактировать профиль" onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
            <section className="popup__section">
                <input type="text" minLength="2" maxLength="40" name="name" id="name-input" value={name} onChange={handleChangeName} required placeholder="Имя" className="popup__input" />
                <span className="popup__input-error" id="name-input-error"></span>
            </section>
            <section className="popup__section">
                <input type="text" minLength="2" maxLength="200" name="about" id="description-input" value={description} onChange={handleChangeDescription} required placeholder="О себе" className="popup__input" />
                <span className="popup__input-error" id="description-input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
