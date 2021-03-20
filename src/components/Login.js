import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        } else {
            props.handleLogin(email, password);
            setEmail('');
            setPassword('');
        }
        handleClose();
    }

    function handleClose() {
        props.onClose()
        setEmail('');
        setPassword('');
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <PopupWithForm name="login" isOpen={props.isOpen} title="Вход" onClose={handleClose} buttonText="Войти" onSubmit={handleLoginSubmit}>
            <section className="popup__section">
                <input type="text" minLength="2" maxLength="30" name="email" id="title-input" required placeholder="Почта" className="popup__input" value={email} onChange={handleEmail} />
                <span className="popup__input-error" id="title-input-error"></span>
            </section>
            <section className="popup__section">
                <input type="password" name="password" id="link-input" required placeholder="Пароль" className="popup__input" value={password} onChange={handlePassword} />
                <span className="popup__input-error" id="link-input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default Login;