import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
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
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([]);



  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleLoginClick() {
    setIsLoginPopupOpen(true);
  }

  function handleRegisterClick() {
    setIsRegisterPopupOpen(true);
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

  function handleLogin(email, password) {
    auth.login(email, password)
      .then(data => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          history.push('/')
        }
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(data => {
        if (data._id) {
          handleLogin(email, password);
        }
      })
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
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
          <Route path='/sign-in' render={
            () => <Login
              isOpen={isLoginPopupOpen}
              onClose={closeAllPopups}
              handleLogin={handleLogin} />
          } />
          <Route path='/sign-up' render={
            () => <Register
              isOpen={isRegisterPopupOpen}
              onClose={closeAllPopups}
              handleRegister={handleRegister} />
          } />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
