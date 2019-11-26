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
        dropDown.style.pointerEvents = 'auto';
        setTimeout(function () {
            anime({
                targets: '#drop-down',
                opacity: 1,
                duration: 300,
                easing: 'linear',
                begin: () => dropDownButton.style.pointerEvents = 'none',
                complete: () => dropDownButton.style.pointerEvents = 'auto'
            });
            anime({
                targets: '#drop-down *',
                translateY: [anime.stagger(-10, {start: -20}), 0],
                delay: anime.stagger(75)
            });
        }, 0);
        document.getElementById('top-gradient').style.height = 80 + dropDown.clientHeight + 'px';
        // anime({
        //     targets: '#top-gradient',
        //     height: 80 + dropDown.clientHeight,
        //     duration: 1500
        // });
    } else {
        dropDown.style.pointerEvents = 'none';
        anime({
            targets: '#drop-down',
            opacity: 0,
            duration: 125,
            easing: 'linear',
            begin: () => dropDownButton.style.pointerEvents = 'none',
            complete: () => dropDownButton.style.pointerEvents = 'auto'
        });
        anime({
            targets: '#drop-down *',
            translateY: anime.stagger(-5, {start: -50}),
            duration: 450,
            easing: 'easeOutCubic'
        });
        // anime({
        //     targets: '#top-gradient',
        //     height: 80,
        //     duration: 1500
        // });
        document.getElementById('top-gradient').style.height = 80 + 'px';
        anime({
            targets: '#drop-down-image',
            rotate: 0
        });
    }
};

new Granim({
    element: '#top-gradient',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        'default-state': {
            gradients: [
                ['#aa4b6b', '#3b8d99'],
                ['#7f7fd5', '#91eae4'],
                ['#fc466b', '#3f5efb'],
                ['#00467f', '#a5cc82']
            ],
            transitionSpeed: 3000
        }
    }
});