export function validateModal() {
    const form = document.getElementById('form-modal');
    let input = document.querySelectorAll('.modal-form__contacts-input');
    let label = document.querySelectorAll('.modal-form__contacts-label');
    let name = document.getElementById('name-modal');
    let tel = document.getElementById('tel-modal');
    let checkbox = document.getElementById('checkbox-modal');
    //form.noValidate = true;

    // function closeBlock() {
    //     document.querySelector('.modal__form-block-send').classList.remove('active-send-modal');
    //     document.querySelector('.modal__form-block-main').classList.remove('none-modal');
    //     document.getElementById('modal-container-form').classList.remove('height-modal');
    //     return;
    // }

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
        if (name.value !== '' && tel.value !== '' && checkbox.checked) {
            name.classList.remove('error-input-modal');
            name.classList.remove('active-input-modal');
            tel.classList.remove('error-input-modal');
            tel.classList.remove('active-input-modal');
            checkbox.checked = false;
            input.forEach(el => {
                el.value = '';
            })
            document.querySelector('.modal-form__block-main').classList.add('none-modal');
            document.querySelector('.modal-form__block-send').classList.add('active-send-modal');
            document.getElementById('modal-container-form').classList.add('height-modal');
            //setTimeout(closeBlock, 2000);
        } else {
            for (let i = 0; i < input.length; i++) {
                input[i].addEventListener('input', () => {
                    if (input[i].value !== '') {
                        input[i].classList.remove('error-input-modal');
                        label[i].classList.add('hide-label-modal');
                    } else if (input[i].value === '') {
                        label[i].classList.remove('hide-label-modal');
                    }
                });
                input[i].addEventListener('blur', () => {
                    if (input[i].value !== '') {
                        input[i].classList.remove('error-input-modal');
                        input[i].classList.add('active-input-modal');
                        label[i].classList.add('hide-label-modal');
                    }
                });
                input[i].addEventListener('keydown', () => {
                    if (input[i].value === '') {
                        input[i].classList.add('error-input-modal');
                        label[i].classList.remove('hide-label-modal');
                    }
                });
            }
            name.value == '' ? name.classList.add('error-input-modal') : name.classList.remove('error-input-modal');
            tel.value == '' ? tel.classList.add('error-input-modal') : tel.classList.remove('error-input-modal');
        }
    }
}