import { openFile } from "./components/helper";
import { isWebp } from "./components/helper";
import { hasTouchDevice } from "./components/hover";
import { openDrop } from "./components/dropdown";
import { openSelect } from "./components/dropdown";
import Swiper, { Navigation, 
                    Pagination, 
                    Autoplay, 
                    Scrollbar, 
                    Grid, 
                    A11y, 
                    FreeMode, 
                    Thumbs, 
                    Parallax, 
                    Manipulation, 
                    Zoom, 
                    Controller,
                    EffectCreative,
                    EffectCards,
                    EffectCoverflow,
                    EffectFlip,
                    EffectCube,
                    EffectFade,
                    HashNavigation,
                    History,
                    Virtual,
                    Keyboard,
                    Mousewheel,
                    } from 'swiper';

import { searchInput } from "./components/searchInput";
import { openCards } from "./components/high-stock";
import tippy from 'tippy.js';
import { validateForm } from "./components/form-valid";
import { openBurger } from "./components/burger";
import IMask from 'imask';
import { renderPage } from "./components/render";
import noUiSlider from 'nouislider';
import { searchDrop } from "./components/searchdrop";
import { getCard } from "./components/card";
import { getModal } from "./components/modal";
import { getModalForm } from "./components/modal-form";
import { validateModal } from "./components/modal-valid";


openFile();
isWebp();
hasTouchDevice();
openDrop();
openSelect();
searchInput();
openCards();
validateForm();
openBurger();
renderPage();
searchDrop();
getCard();
getModal();
getModalForm();
validateModal();

function showTippy(el) {
    tippy(el, {
        //content: 'My tooltip!',
        arrow: true,
        theme: 'light',
    });
};

let tooltip = document.getElementById('formButton');

showTippy(tooltip);

function getMask(el) {
    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };
    const mask = IMask(el, maskOptions);
};

const element = document.getElementById('tel');
const telModal = document.getElementById('tel-modal');

getMask(element);
getMask(telModal);

const slider = document.getElementById('range');
const inputMin = document.getElementById('input-min');
const inputMax = document.getElementById('input-max');
const inputs = [inputMin, inputMax];

if(slider) {
    noUiSlider.create(slider, {
        start: [2000, 150000],
        connect: true,
        step: 1000,
        range: {
            'min': [2000],
            'max': [150000]
        }
    });
}
slider.noUiSlider.on('update', function(values, handle) {
    inputs[handle].value = Math.round(values[handle])
});

const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    slider.noUiSlider.set(arr);
}

inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
    });
});

Swiper.use([
    Navigation, 
    Pagination, 
    Autoplay, 
    Scrollbar, 
    Grid, 
    A11y, 
    FreeMode, 
    Thumbs, 
    Parallax, 
    Manipulation, 
    Zoom, 
    Controller,  
    EffectCreative,
    EffectCards,
    EffectCoverflow,
    EffectFlip,
    EffectCube,
    EffectFade,
    HashNavigation,
    History,
    Virtual,
    Keyboard,
    Mousewheel,
]);

const swiperModal = new Swiper('.modal__block-swiper', {
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    //slidesPerView: 4,
    //slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
        nextEl: '.modal__block-swiper-button-next',
        prevEl: '.modal__block-swiper-button-prev',
    },
    breakpoints: {
        550: {
            slidesPerView: "auto",
            //slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
        },
        900: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 10,
        },
        1250: {
            spaceBetween: 28,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
        },
    }
});
const swiper2 = new Swiper('.modal__block-swiper-thumbs', {

    thumbs: {
        swiper: swiperModal,
    },
});

const swiperCard = new Swiper('.card__block-bottom-swiper', {
    slidesPerView: 2,
    slidesPerGroup: 1,
    grid: {
        rows: 1,
    },
    spaceBetween: 16,
    navigation: {
        nextEl: '.card__block-bottom-swiper-button-next',
        prevEl: '.card__block-bottom-swiper-button-prev',
    },
    a11y: {
        prevSlideMessage: 'Предыдущий',
        nextSlideMessage: 'Следующий',
    },
    breakpoints: {
        1250: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 32,
        },
        900: {
            slidesPerView: 3,
        },
    }
})

const swiperCatalog = new Swiper('.catalog__right-swiper', {
    direction: "horizontal",
    slidesPerView: 2,
    slidesPerGroup: 2,
        keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
        },
    grid: {
        rows: 3,
        fill: 'row',
    },
    spaceBetween: 16,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
    a11y: {
        prevSlideMessage: 'Предыдущий',
        nextSlideMessage: 'Следующий',
    },
    breakpoints: {
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                rows: 3,
                fill: 'row',
            },
            spaceBetween: 32,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                rows: 3,
                fill: 'row',
            },
            spaceBetween: 32,
        },
    },
});

const swiper = new Swiper('.swiper-banner', {
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: '.swiper-banner-pagination',
        clickable: 'true',
    },
    // breakpoints: {
    //     550:  {
    //     autoplay: "none",
    //     }
    // }
});

const swiperOffers = new Swiper('.offers__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
        rows: 1,
    },
    spaceBetween: 32,
    navigation: {
        nextEl: '.offers__swiper-button-next',
        prevEl: '.offers__swiper-button-prev',
    },
    breakpoints: {
        700: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                rows: 1
            },
            spaceBetween: 32,
        },
        900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                rows: 1
            },
            spaceBetween: 32,
        },
        1250: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                rows: 1
            },
            spaceBetween: 32,
        },
    1770: {
        slidesPerView: "auto",
        slidesPerGroup: 3,
        grid: {
            rows: 1
        },
        spaceBetween: 32,
    },
}
})

const swiperUseful = new Swiper('.useful__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
        rows: 1,
    },
    spaceBetween: 32,
    navigation: {
        nextEl: '.useful__swiper-button-next',
        prevEl: '.useful__swiper-button-prev',
    },
    a11y: {
        prevSlideMessage: 'Предыдущий',
        nextSlideMessage: 'Следующий',
    },
    breakpoints: {
        550: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        900: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            grid: {
                rows: 1
            },
            spaceBetween: 32,
        },
        1250: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                rows: 1
            },
            spaceBetween: 32,
        },
    }
})