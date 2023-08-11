export function hasTouchDevice() {
    return !!('ontouchstart' in window || navigator.maxTouchPoints);
}
if (!hasTouchDevice()) {
    const toUp = document.querySelectorAll('.bg-focus');
    toUp.onmouseenter = function () {
        this.classList.add('hover');
    }
    toUp.onmouseleave = function () {
        this.classList.remove('hover');
    }
    const toUp2 = document.querySelectorAll('.orange-focus');
    toUp2.onmouseenter = function () {
        this.classList.add('hover');
    }
    toUp2.onmouseleave = function () {
        this.classList.remove('hover');
    }
}