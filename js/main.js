const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}


//Autorization

const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      loginForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('deliveryFood');

function toogleModalAuth() {
    modalAuth.classList.toggle('is-open');
}



function autorized() {
    function logOut(){
        login = null;
        localStorage.removeItem('deliveryFood');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }
    console.log('Auth true');
    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    buttonOut.addEventListener('click', logOut);
}

function notAutorized() {
    console.log('Auth false');
    function logIn (e) {
        e.preventDefault();
        login = loginInput.value;
        localStorage.setItem('deliveryFood', login); 
        toogleModalAuth();
        buttonAuth.removeEventListener('click', toogleModalAuth);
        closeAuth.removeEventListener('click', toogleModalAuth) ;
        loginForm.removeEventListener('submit', logIn);
        loginForm.reset();
        checkAuth();
    }
    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth) ;
    loginForm.addEventListener('submit', logIn);
}

function checkAuth(){
    if(login) {
        autorized();
    } else {
        notAutorized();
    }
}
checkAuth();
