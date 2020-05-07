'use strict';

//modal window
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");



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
    footerLogo = document.querySelector('.footer-logo'),
    cardsMenu = document.querySelector('.cards-menu'),
    restaurantTitle = document.querySelector('.restaurant-title'),
    rating = document.querySelector('.rating'),
    minPrice = document.querySelector('.price'),
    category = document.querySelector('.category');

//Autorization
let login = localStorage.getItem("deliveryFood");

const getData = async function(url) {

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, 
        статус: ошибка ${response.status}!`);
    }
    return await response.json();
};


const isValid = function(str) {
    const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    return nameReg.test(str);
};

function returnMainPage() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
}

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
        returnMainPage();
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
        if (maskInput(loginInput.value) &&
            maskInput(passwordInput.value) &&
            isValid(loginInput.value)) {
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
            loginInput.value = '';
            passwordInput.value = '';
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

// render cards

function createCardRestaraunt(restaurant) {

    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery
    } = restaurant;

    const card = `
                <a class="card card-restaurant" 
                data-products="${products}"
                data-info="${[name,price,stars,kitchen]}"
                >
                    <img src="${image}" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title">${name}</h3>
                                <span class="card-tag tag">${timeOfDelivery} мин.</span>
                            </div>
                            <div class="card-info">
                                <div class="rating">
                                    ${stars}
                                </div>
                                <div class="price">От ${price} ₽</div>
                                <div class="category">${kitchen}</div>
                            </div>
                        </div>
                </a>
    `;

    cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}


function createCardGood(goods) {

    const {
        description,
        name,
        price,
        image,
    } = goods;

    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
                <img src="${image}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}</div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price}₽</strong>
                    </div>
                </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    if (login) {

        const restaurant = target.closest('.card-restaurant');

        if (restaurant) {
            const info = restaurant.dataset.info.split(',');
            const [name, price, stars, kitchen] = info;

            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = name;
            rating.textContent = stars;
            minPrice.textContent = `От ${price} ₽`;
            category.textContent = kitchen;

            getData(`../db/${restaurant.dataset.products}`).then(function(data) {
                data.forEach(createCardGood);
            });
        }
    } else {
        toogleModalAuth();
    }
}

function init() {
    getData('../db/partners.json').then(function(data) {
        data.forEach(createCardRestaraunt);
    });

    cartButton.addEventListener("click", toggleModal);
    close.addEventListener("click", toggleModal);

    cardsRestaraunts.addEventListener('click', openGoods);

    logo.addEventListener('click', returnMainPage);

    footerLogo.addEventListener('click', returnMainPage);

    checkAuth();

    new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        fadeEffect: {
            crossFade: true
        },
    });
}

init();