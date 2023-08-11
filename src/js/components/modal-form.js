export function getModalForm() {
    const cardBtn = document.querySelector('.card__block-right-top-btn-top');

    function scrollOff() {
        document.body.classList.add('scroll-hidden')
    }
    
    function scrollOn() {
        document.body.classList.remove('scroll-hidden')
    }
    
    cardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-container-form').classList.add('active-modal-form');
        document.getElementById('inner-form').classList.add('active-modal-form');
        scrollOff();
    })

    document.getElementById('modal-btn-form').addEventListener('click', (e) => {
        e.preventDefault();
        scrollOn();
        document.getElementById('modal-container-form').classList.remove('active-modal-form');
        document.getElementById('inner-form').classList.remove('active-modal-form');
        //Если отменить setTimeout
        document.querySelector('.modal-form__block-send').classList.remove('active-send-modal');
        document.querySelector('.modal-form__block-main').classList.remove('none-modal');
        document.getElementById('modal-container-form').classList.remove('height-modal');
    })
}