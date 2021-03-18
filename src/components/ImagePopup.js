import React from 'react';

function ImagePopup(props) {
    return (
        props.card &&
        <section className={`popup-image ${Object.keys(props.card).length === 0 && props.card.constructor === Object ? '' : 'popup_active'}`}>
            <div className="popup-image__pic">
                <button type="button" onClick={props.onClose} className="popup__button"></button>
                <img alt={props.card.name} src={props.card.link} className="popup-image__image" />
                <h2 className="popup-image__title">{props.card.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;
