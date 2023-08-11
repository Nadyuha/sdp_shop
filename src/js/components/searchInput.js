export function searchInput() {
    let input = document.querySelector('.header__bottom-down-form-block-input');
    input.addEventListener('input', () => {
        if(input.value === '') {
            document.querySelector('.banner__empty').classList.add('active-input');
        } else {
            document.querySelector('.banner__empty').classList.remove('active-input');
        }
    })
} 