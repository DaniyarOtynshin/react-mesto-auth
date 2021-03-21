import React from 'react';
import logoPath from '../images/Logo.svg';

function Header() {
    return (
        <header className="header page__header">
            <img src={logoPath} alt="логотип" className="header__logo" />
            <p className="header__auth">Регистрация</p>
        </header>
    )
}

export default Header;