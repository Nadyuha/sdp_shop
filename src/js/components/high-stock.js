export function openCards() {
    document.querySelector('.high-stock__btn').addEventListener('click', () => {
        let cards = document.querySelectorAll('.high-stock__block-item');

        for(let i = 6; i < cards.length; i++) {
            cards[i].classList.add('active-card');
            cards[i].classList.toggle('none-card');
        }
        document.querySelector('.high-stock__btn').classList.add('none-card');
    });
}