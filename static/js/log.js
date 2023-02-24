const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

openNav = () => {
  let nav = document.querySelector('.nav-overlay')
  let hamb = document.querySelector('.hamburger')
  nav.classList.toggle('active')
  hamb.classList.toggle('active')
}

const togglePassword = document.querySelector('.toggle-password-signin');
const password = document.querySelector('#password-input-signin');

togglePassword.addEventListener('click', function(e) {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('password-show-signin');
});

const togglePassword1 = document.querySelector('.toggle-password-signup');
const password1 = document.querySelector('#password-input-signup');

togglePassword1.addEventListener('click', function(e) {
  const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
  password1.setAttribute('type', type);
  this.classList.toggle('password-show-signup');
});
