class Auth {
    constructor(url) {
        this._url = url;
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
      };

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: {
              authorization: this._authorization
            }
          })
        .then((res) => this._checkResponse(res))
    };

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: password,
              email: email
            })
        })
        .then((res) => this._checkResponse(res))
    };

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: password,
              email: email
            })
        })
        .then((res) => this._checkResponse(res))
    };

}

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;
