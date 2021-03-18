import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
            <form name='info' className={`popup__form popup__form_${props.name}`} noValidate onSubmit={props.onSubmit}>
                <button type='button' className='popup__button' onClick={props.onClose}></button>
                <h2 className='popup__title'>{props.title}</h2>
                {props.children};
                <button type='submit' className={`popup__submit-button ${props.name === 'submit-form' ? 'popup__submit-button_submit-form' : ''}`}>{props.buttonText}</button>
            </form>
        </section>
    )
}

export default PopupWithForm;