import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup-image ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup-image__pic">
                <button type="button" onClick={props.onClose} className="popup__button" />
                <img alt={props.card.name} src={props.card.link} className="popup-image__image" />
                <h2 className="popup-image__title">{props.card.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;
