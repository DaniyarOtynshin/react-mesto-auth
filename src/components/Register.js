import { useState } from 'react';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegisterSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        } else {
            props.onRegister(password, email);
            setEmail('');
            setPassword('');
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form className="login__form">
                <input type="text" onChange={handleEmail} placeholder="Email" className="login__input"></input>
                <input type="password" onChange={handlePassword} placeholder="Пароль" className="login__input"></input>
                <button onClick={handleRegisterSubmit} className="login__button">Зарегистрироваться</button>
            </form>
        </section>
    )
}

export default Register;