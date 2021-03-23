import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logoPath from '../images/Logo.svg';

function Header(props) {
    return (
        <header className="header page__header">
            <img src={logoPath} alt="логотип" className="header__logo" />
            {props.loggedIn
                ? <ul className="header__links">
                    <li className="header__auth header__auth_email">{props.email}</li>
                    <li><button onClick={props.onSignOut} className="header__button">Выйти</button></li>
                </ul>
                : <Link
                to={props.location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}
                className="header__auth">{props.location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}</Link>
            }
        </header>
    )
}

export default withRouter(Header);