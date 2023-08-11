export function openDrop() {

    let svg = document.querySelector('.header__top-contacts-descr-btn-img');
    
    document.querySelector('.header__top-contacts-descr-btn').addEventListener('click', () => {
        document.querySelector('.header__top-contacts-descr-btn').classList.toggle('active-btn');
        document.querySelector('.header__top-contacts-descr-list').classList.toggle('active-drop');
    });

    document.querySelectorAll('.header__top-contacts-descr-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation;
            let btnStart = document.querySelector('.header__top-contacts-descr-btn').innerText;
            document.querySelector('.header__top-contacts-descr-btn').innerText = item.innerText;
            item.innerText = btnStart;
            document.querySelector('.header__top-contacts-descr-btn').classList.remove('active-btn');
            document.querySelector('.header__top-contacts-descr-list').classList.remove('active-drop');
            document.querySelector('.header__top-contacts-descr-btn').classList.add('active-img');
            svg.style.position = 'relative';
            svg.style.right = '-5px'
            document.querySelector('.header__top-contacts-descr-btn').append(svg);
        });
    });

    //Click снаружи select. Закрытие по click

    document.addEventListener('click', (e) => {
        if(e.target !== document.querySelector('.header__top-contacts-descr-btn')) {
            document.querySelector('.header__top-contacts-descr-btn').classList.remove('active-btn');
            document.querySelector('.header__top-contacts-descr-list').classList.remove('active-drop');
        }
    });

    //Нажатие на Tab или Escape. Закрытие select
        
    document.addEventListener('keydown', (e) => {
        if(e.key ==="Tab" || e.key === "Escape") {
            document.querySelector('.header__top-contacts-descr-btn').classList.remove('active-btn');
            document.querySelector('.header__top-contacts-descr-list').classList.remove('active-drop');
        }
    });
}

export function openSelect() { 

    let svg = document.querySelector('.header__bottom-down-form-btn-img');

    document.querySelector('.header__bottom-down-form-btn').addEventListener('click', () => {
        document.querySelector('.header__bottom-down-form-btn').classList.toggle('active-btn');
        document.querySelector('.header__bottom-down-form-list').classList.toggle('active-select');
    });

    document.querySelectorAll('.header__bottom-down-form-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation;
            document.querySelector('.header__bottom-down-form-btn').innerText = item.innerText;
            document.querySelector('.header__bottom-down-form-btn').classList.remove('active-btn');
            document.querySelector('.header__bottom-down-form-list').classList.remove('active-select');
            document.querySelector('.header__bottom-down-form-btn').append(svg);
        });
    });

        //Click снаружи select. Закрытие по click

        document.addEventListener('click', (e) => {
            if(e.target !== document.querySelector('.header__bottom-down-form-btn')) {
                document.querySelector('.header__bottom-down-form-btn').classList.remove('active-btn');
                document.querySelector('.header__bottom-down-form-list').classList.remove('active-select');
                //document.querySelector('.header__bottom-down-form-btn').textContent = 'Категория';
            }
        });
    
        //Нажатие на Tab или Escape. Закрытие select
            
        document.addEventListener('keydown', (e) => {
            if(e.key ==="Tab" || e.key === "Escape") {
                document.querySelector('.header__bottom-down-form-btn').classList.remove('active-btn');
                document.querySelector('.header__bottom-down-form-list').classList.remove('active-select');
            }
        });
}