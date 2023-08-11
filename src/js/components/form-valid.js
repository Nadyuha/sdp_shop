export function validateForm() {
    const form = document.getElementById('form');
    let input = document.querySelectorAll('.form__container-contacts-input');
    let label = document.querySelectorAll('.form__container-contacts-label');
    let btn = document.querySelector('.form__container-contacts-btn');
    let name = document.getElementById('name');
    let tel = document.getElementById('tel');
    let email = document.getElementById('email');
    let checkbox = document.getElementById('checkbox');

    function closeBlock() {
        document.querySelector('.form__container-contacts-send').classList.remove('active-send');
        return;
    }

    tel.addEventListener('keydown', (e) => {
        // Разрешаем: backspace, delete, tab и escape
        if ( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
            // Разрешаем: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Разрешаем: home, end, влево, вправо
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Ничего не делаем
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
                e.preventDefault();
            }
        }
    });

    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        validateForm()
    });

    function validateForm() {
        if (name.value !== '' && tel.value !== '' && email.value !== '' && checkbox.checked) {
            name.classList.remove('error-input');
            name.classList.remove('active-input');
            tel.classList.remove('error-input');
            tel.classList.remove('active-input');
            email.classList.remove('error-input');
            email.classList.remove('active-input');
            checkbox.checked = false;
            input.forEach(el => {
                el.value = '';
            })
            document.querySelector('.form__container-contacts-send').classList.add('active-send');
            setTimeout(closeBlock, 2000);
        } else {
            for (let i = 0; i < input.length; i++) {
                input[i].addEventListener('input', () => {
                    if (input[i].value !== '') {
                        input[i].classList.remove('error-input');
                        label[i].classList.add('hide-label');
                    } else if (input[i].value === '') {
                        label[i].classList.remove('hide-label');
                    }
                });
                input[i].addEventListener('blur', () => {
                    if (input[i].value !== '') {
                        input[i].classList.remove('error-input');
                        input[i].classList.add('active-input');
                        label[i].classList.add('hide-label');
                    }
                });
                input[i].addEventListener('keydown', () => {
                    if (input[i].value === '') {
                        input[i].classList.add('error-input');
                        label[i].classList.remove('hide-label');
                    }
                });
                email.addEventListener('blur', () => {
                    if (!email.value.includes('@')) {
                        email.classList.add('error-input');
                        label[2].classList.remove('hide-label')
                        email.focus();
                    }
                });
            }
            name.value == '' ? name.classList.add('error-input') : name.classList.remove('error-input');
            tel.value == '' ? tel.classList.add('error-input') : tel.classList.remove('error-input');
            email.value == '' ? email.classList.add('error-input') : email.classList.remove('error-input');
        }
    }
}