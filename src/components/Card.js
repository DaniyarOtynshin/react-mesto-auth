import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? '' : 'element__delete_inactive'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__button ${isLiked ? 'element__button_active' : ''}`;

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteCard}></button>
            <img alt={props.card.name} className="element__image" onClick={handleClick} src={props.card.link} />
            <div className="element__info">
                <h3 className="element__title">{props.card.name}</h3>
                <div className="element__like-section">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <span className="element__likes">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;