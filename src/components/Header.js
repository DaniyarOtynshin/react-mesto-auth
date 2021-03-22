import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import logoPath from '../images/Logo.svg';

function Header(props) {
    console.log(props)
    const history = useHistory();
    function signOut(){
      localStorage.removeItem('token');
      history.push('/signin');
    }
    return (
        <header className="header page__header">
            <img src={logoPath} alt="логотип" className="header__logo" />
            <ul className="header__links">
                <li>{props.email}</li>
                <li><button onClick={signOut} className="header__button">Выйти</button></li>
            </ul>
            <Link className="header__auth">{props.loggedIn ? props.email : 'Войти'}</Link>
        </header>
    )
}

export default withRouter(Header);