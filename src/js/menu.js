const navMenu = document.querySelector('.nav-hidden');
const burgerBtn = document.querySelector('.nav__burger');
const closeBtn = document.querySelector('.nav-hidden-menu__close');


burgerBtn.addEventListener('click', () => {
  navMenu.style.top = '0';
});
closeBtn.addEventListener('click', () => {
  navMenu.style.top = '-100%';
});

