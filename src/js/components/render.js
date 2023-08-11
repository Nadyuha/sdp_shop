export function renderPage() {
    const container = document.getElementById('main-container');
    const mainPage = document.getElementById('main-page');
    const links = document.querySelectorAll('.categories__block-card-btn-link');
    const linkImg = document.querySelectorAll('.categories__block-card-btn-link-block-title');
    const catalog = document.getElementById('catalog');
    const catalogPage = document.querySelector('.catalog');
    const mainLink = document.getElementById('main');
    const navCatalog = document.getElementById('nav-catalog');

    function renderNav(el) {
        el.forEach(link => {
            link.addEventListener('click', () => {
                container.innerHTML = '';
                container.append(catalog);
                catalogPage.classList.add('active-page');
                const links = document.querySelectorAll('.catalog__nav-item-link');
                for(let i = 0; i < links.length; i++) {
                    if(links[i].classList.contains('link-active')) {
                                links[i].classList.remove('link-active');
                    }
                    let j = links.length - 1;
                    links[j].classList.add('link-active');
                }
            })
        })
    }
    renderNav(links);
    renderNav(linkImg);

    mainLink.addEventListener('click', () => {
        container.innerHTML = '';
        catalog.classList.remove('active-page');
        container.append(mainPage);
    })

    navCatalog.addEventListener('click', () => {
        container.innerHTML = '';
        container.append(catalog);
        catalogPage.classList.add('active-page');
            const links = document.querySelectorAll('.catalog__nav-item-link');
                for(let i = 0; i < links.length; i++) {
                    if(links[i].classList.contains('link-active')) {
                                links[i].classList.remove('link-active');
                    }
                    let j = links.length - 1;
                    links[j].classList.add('link-active');
                }
    })
    
    container.append(mainPage);

    return;
}