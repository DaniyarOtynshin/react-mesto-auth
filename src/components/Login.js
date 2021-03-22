import { useState } from 'react';

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
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form">
            <input type="url" placeholder="Email" className="login__input"></input>
            <input type="password" placeholder="Пароль" className="login__input"></input>
            <button className="login__button">Войти</button>
            </form>
        </section>
    )
}

export default Login;