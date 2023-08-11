export function openBurger() {
    let burger = document.querySelector('.header__bottom-top-burger');
    let close = document.querySelector('.header__bottom-top-close');
    let nav = document.querySelector('.header__bottom-top-nav');
    let list = document.querySelector('.header__bottom-top-nav-list');

    burger.addEventListener('click', () => {
        console.log('!');
        close.classList.add('active');
        nav.classList.remove('close-nav');
        burger.classList.add('close')
    });

    close.addEventListener('click', () => {
        console.log('!');
        close.classList.remove('active');
        nav.classList.add('close-nav');
        burger.classList.remove('close')
    });

}