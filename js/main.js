'use strict';

//modal window
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

//variables
const buttonAuth = document.querySelector(".button-auth"),
    modalAuth = document.querySelector(".modal-auth"),
    closeAuth = document.querySelector(".close-auth"),
    loginForm = document.querySelector("#logInForm"),
    loginInput = document.querySelector("#login"),
    passwordInput = document.querySelector("#password"),
    userName = document.querySelector(".user-name"),
    buttonOut = document.querySelector(".button-out"),
    cardsRestaraunts = document.querySelector(".cards-restaurants"),
    containerPromo = document.querySelector('.container-promo'),
    restaurants = document.querySelector('.restaurants'),
    menu = document.querySelector('.menu'),
    logo = document.querySelector('.logo'),
    cardsMenu = document.querySelector('.cards-menu');

//Autorization
let login = localStorage.getItem("deliveryFood");

function maskInput(string) {
    return !!string.trim();
}

function toogleModalAuth() {
    modalAuth.classList.toggle("is-open");
    loginInput.style.borderColor = "";
    passwordInput.style.borderColor = "";
}

function autorized() {
    function logOut() {
        login = null;
        localStorage.removeItem("deliveryFood");
        buttonAuth.style.display = "";
        userName.style.display = "";
        buttonOut.style.display = "";
        buttonOut.removeEventListener("click", logOut);
        checkAuth();
    }
    console.log("Auth true");
    userName.textContent = login;
    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "block";
    buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
    console.log("Auth false");

    function logIn(e) {
        e.preventDefault();
        if (maskInput(loginInput.value) && maskInput(passwordInput.value)) {
            login = loginInput.value;
            localStorage.setItem("deliveryFood", login);
            toogleModalAuth();
            buttonAuth.removeEventListener("click", toogleModalAuth);
            closeAuth.removeEventListener("click", toogleModalAuth);
            loginForm.removeEventListener("submit", logIn);
            loginForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";
        }
    }

    buttonAuth.addEventListener("click", toogleModalAuth);
    closeAuth.addEventListener("click", toogleModalAuth);
    loginForm.addEventListener("submit", logIn);
}

function checkAuth() {
    if (login) {
        autorized();
    } else {
        notAutorized();
    }
}
checkAuth();

// render cards

function createCardRestaraunt() {
    const card = `
                <a class="card card-restaurant">
                    <img src="img/tanuki/preview.jpg" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title">Тануки</h3>
                                <span class="card-tag tag">60 мин</span>
                            </div>
                            <div class="card-info">
                                <div class="rating">
                                    4.5
                                </div>
                                <div class="price">От 1 200 ₽</div>
                                <div class="category">Суши, роллы</div>
                            </div>
                        </div>
                </a>
    `;

    cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}
createCardRestaraunt();
createCardRestaraunt();
createCardRestaraunt();
createCardRestaraunt();

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
                <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">Пицца Классика</h3>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.
                        </div>
                    </div>
                    <!-- /.card-info -->
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">510 ₽</strong>
                    </div>
                </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        cardsMenu.textContent = '';

        createCardGood();
        createCardGood();
        createCardGood();
        createCardGood();
    }

}

//eventListeners


cardsRestaraunts.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});