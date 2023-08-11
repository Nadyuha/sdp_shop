export function searchDrop() {
    let btns = document.querySelectorAll('.catalog__right-filters-btn');
    let drops = document.querySelectorAll('.catalog__right-filters-list');
    let itemsOne = document.querySelectorAll('.item-1');
    let listCategory = document.getElementById('category-list');
    let svgCategory = document.getElementById('category-svg');
    let itemsTwo = document.querySelectorAll('.item-2');
    let listPrice = document.getElementById('price-list');
    let svgPrice = document.getElementById('price-svg');
    let itemsThree = document.querySelectorAll('.item-3');
    let listDiscount = document.getElementById('discount-list');
    let svgDiscount = document.getElementById('discount-svg');
    let itemsFour = document.querySelectorAll('.item-4');
    let listColor = document.getElementById('color-list');
    let svgColor= document.getElementById('color-svg');

    for(let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            drops[i].classList.toggle('none-list');
            btns[i].classList.toggle('active-img');
        });
        btns[i].classList.remove('active-img');
        drops[i].classList.toggle('none-list');
    }

    function getSelect(arr, el, svg, list) {
        for(let i = 0; i < arr.length; i++) {
            arr[i].addEventListener('click', (e) => {
                e.stopPropagation;
                el.innerText = arr[i].innerText;
                el.append(svg);
                el.classList.remove('active-img');
                list.classList.add('none-list');
            });
        }
    }

    //select 'Категория'
    getSelect(itemsOne, document.getElementById('category'), svgCategory, listCategory)

    //select 'Цена'
    getSelect(itemsTwo, document.getElementById('price'), svgPrice, listPrice)

    //select 'Скидка'
    getSelect(itemsThree, document.getElementById('discount'), svgDiscount, listDiscount)

    //select 'Цвет'
    getSelect(itemsFour, document.getElementById('color'), svgColor, listColor)

    //Закрытие по клику вне btn
    document.addEventListener('click', function (e) {
        let target = e.target;
        if (!target.closest('.catalog__right-filters')) {
            btns.forEach(btn => {
                btn.classList.remove('active-img');
            });  
            document.querySelectorAll('.catalog__right-filters-list').forEach(el => {
                el.classList.add('none-list');
            });
        }
    })
}