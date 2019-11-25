// Javascript code for the nav bar

let navExpanded = false;

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
            anime({
                targets: '#drop-down',
                opacity: 1,
                duration: 600,
                easing: 'linear'
            });
            anime({
                targets: '#drop-down *',
                translateY: [anime.stagger(-10, {start: -20}), 0],
                delay: anime.stagger(75)
            });
        }, 0);
        anime({
            targets: '#top-menu',
            height: [80, 80 + dropDown.clientHeight],
            duration: 1500
        });
    } else {
        anime({
            targets: '#drop-down',
            opacity: 0,
            duration: 200,
            easing: 'linear'
        });
        anime({
            targets: '#drop-down *',
            translateY: anime.stagger(-10, {start: -50}),
            duration: 500,
            easing: 'easeOutCubic',
            complete: () => dropDown.style.display = 'none'
        });
        anime({
            targets: '#top-menu',
            height: [80 + dropDown.clientHeight, 80],
            duration: 1500
        });
        anime({
            targets: '#drop-down-image',
            rotate: 0
        });
    }
};