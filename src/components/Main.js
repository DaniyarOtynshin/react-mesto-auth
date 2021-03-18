import penPath from '../images/Pen.svg';
import editButtonPath from '../images/Edit_Button.svg';
import crossPath from '../images/Cross.svg';
import Card from './Card';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__passport">
                    <div onClick={props.onEditAvatar} className="profile__photo-container">
                        <div className="profile__change-photo-overlay">
                            <img src={penPath} alt="Кнопка изменить" className="profile__change-photo" />
                        </div>
                        <img alt="Аватарка" className="profile__avatar" src={currentUser.avatar} />
                    </div>
                    <div className="profile__profile-info">
                        <div className="profile__name-button">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" onClick={props.onEditProfile} className="profile__edit-button">
                                <img src={editButtonPath} alt="Кнопка изменить" className="profile__pen" />
                            </button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-button">
                    <img src={crossPath} alt="Кнопка добавить" className="profile__cross" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__grid">
                    {
                        props.cards.map(item => (
                            <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                        )
                        )}
                </ul>
            </section>
        </main>
    )
}

export default Main;