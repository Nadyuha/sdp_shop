export function getModal() {
    const cardSlide = document.querySelector('.card__block-left-card-img-top');

    function scrollOff() {
        document.body.classList.add('scroll-hidden')
    }
    
    function scrollOn() {
        document.body.classList.remove('scroll-hidden')
    }
    

    cardSlide.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-container').classList.add('active-modal');
        document.getElementById('inner').classList.add('active-modal');
        scrollOff();
    })

    document.getElementById('modal-btn').addEventListener('click', (e) => {
        e.preventDefault();
        scrollOn();
        document.getElementById('modal-container').classList.remove('active-modal');
        document.getElementById('inner').classList.remove('active-modal');
    })
}