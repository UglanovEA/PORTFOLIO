const navMenu=document.querySelector(".nav-hidden"),burgerBtn=document.querySelector(".nav__burger"),closeBtn=document.querySelector(".nav-hidden-menu__close");burgerBtn.addEventListener("click",(()=>{navMenu.style.top="0"})),closeBtn.addEventListener("click",(()=>{navMenu.style.top="-100%"}));