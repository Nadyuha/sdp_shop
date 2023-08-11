export function getCard() {
    const btnCard = document.getElementById('btn-31');
    const container = document.getElementById('main-container');
    const mainPage = document.getElementById('main-page');
    const card = document.getElementById('card');
    const cardPage = document.querySelector('.card');
    const nav = document.getElementById('nav-page');
    const navContainer = document.querySelector('.catalog__nav-list')
    const linkContainer = document.createElement('div');
    linkContainer.classList.add('catalog__nav-item');
    const link = document.createElement('a');
    link.classList.add('catalog__nav-item-link');
    link.setAttribute('href', '');
    link.textContent = '/ D-31';
    const cardActive = document.querySelectorAll('.card-btn');
    const links = document.querySelectorAll('.catalog__nav-item-link');

    card.append(cardPage);
        cardActive.forEach(elem => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                    container.innerHTML = '';
                    for(let i = 0; i < links.length; i++) {
                        if(links[i].classList.contains('link-active')) {
                                    links[i].classList.remove('link-active');
                        }
                    }
                    link.classList.add('link-active');
                    linkContainer.append(link);
                    navContainer.append(linkContainer);
                    
                    cardPage.prepend(nav);
                    cardPage.classList.add('open-card');
            container.append(card);
        });
    });
}