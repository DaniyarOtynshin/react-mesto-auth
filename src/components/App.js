import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import auth from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfooTooltipOpen, setIsInfooTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([]);



  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({})
  }

  function handleUpdateAvatar(link) {
    api.changeUserPhoto(link)
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.error(err))
  }

  function handleUpdateUser(userInfo) {
    api.changeUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  function onLogin(password, email) {
    auth.login(password, email)
      .then(data => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          history.push('/')
        }
      })
      .catch(err => {
        setSuccessRegistration(false);
        setIsInfooTooltipOpen(true);
        console.log(err)
      })
  }

  function onRegister(password, email) {
    auth.register(password, email)
      .then(data => {
        if (data.data._id) {
          setSuccessRegistration(true);
          setIsInfooTooltipOpen(true);
        }
      })
  };

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  function onInfooTooltipClose() {
    history.push('/sign-in');
    setIsInfooTooltipOpen(false);
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        }
      })
    }
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.error(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((_) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.error(err))
  }

  function handleAddPlace(cardInfo) {
    api.addNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    api.getUserInfo()
      .then(data => setCurrentUser(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(cards => {
        setCards(cards)
      })
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    tokenCheck()
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
          <Switch>
            <ProtectedRoute exact path='/'
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main} />
            <Route path='/sign-in' render={() => <Login
              onLogin={onLogin}
              isOpen={isInfooTooltipOpen}
              successRegistration={successRegistration}
              onClose={onInfooTooltipClose}
            />} />
            <Route path='/sign-up' render={() => <Register
              onRegister={onRegister}
              isOpen={isInfooTooltipOpen}
              successRegistration={successRegistration}
              onClose={onInfooTooltipClose}
            />} />
          </Switch>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
