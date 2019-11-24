// Javascript code for the nav bar

let navExpanded = false;

const topMenu = document.getElementById('top-menu');
const dropDown = document.getElementById('drop-down');
const dropDownButton = document.getElementById('nav-drop-down'); // Dropdown button in nav bar

dropDownButton.onclick = function () {
    navExpanded = !navExpanded;
    if (navExpanded) {
        anime({
            targets: '#drop-down-image',
            rotate: 90
        });
        dropDown.style.display = 'block';
        setTimeout(function () {
            dropDown.style.opacity = 1;
            anime({
                targets: '#drop-down *',
                translateY: [(el, i) => -20 * (i + 1), 0],
                delay: (el, i) => 75 * i
            });
        }, 0);
        anime({
            targets: '#top-menu',
            height: '+=' + dropDown.clientHeight,
            duration: 1500
        });
    } else {
        dropDown.style.opacity = 0;
        anime({
            targets: '#drop-down *',
            translateY: (el, i) => -15 * (i + 2),
            duration: 500,
            easing: 'easeOutSine',
            complete: () => dropDown.style.display = 'none'
        });
        anime({
            targets: '#top-menu',
            height: '-=' + dropDown.clientHeight,
            duration: 1500
        });
        anime({
            targets: '#drop-down-image',
            rotate: 0
        });
    }
};