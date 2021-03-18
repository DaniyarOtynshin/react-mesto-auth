class Api {
    constructor(url, authorization) {
        this._url = url;
        this._authorization = authorization;
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

    changeUserInfo({ name, about }) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then((res) => this._checkResponse(res))
    };

    addNewCard({ name, link }) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              link: link
            })
        })
        .then((res) => this._checkResponse(res))
    };

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._checkResponse(res))
    };

    changeUserPhoto( {link} ) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            avatar: link
            })
        })
        .then((res) => this._checkResponse(res))
    };

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._checkResponse(res))
    };

    like(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._checkResponse(res))
    };

    dislike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._checkResponse(res))
    };

    changeLikeCardStatus(id, isLiked) {
        return isLiked
        ? this.dislike(id)
        : this.like(id)
    };

    renderPage() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-18/', '992a3ad3-237d-4b2f-8424-0245e20d32b7');

export default api;
