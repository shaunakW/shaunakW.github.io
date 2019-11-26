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
                duration: 500,
                easing: 'linear'
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
        anime({
            targets: '#drop-down',
            opacity: 0,
            duration: 125,
            easing: 'linear'
        });
        anime({
            targets: '#drop-down *',
            translateY: anime.stagger(-10, {start: -50}),
            duration: 450,
            easing: 'easeOutCubic',
            complete: () => dropDown.style.display = 'none'
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
    stateTransitionSpeed: 500,
    states : {
        'default-state': {
            gradients: [
                ['#0abde3', '#2ecc71'],
                ['#2ecc71', '#3498db'],
                ['#3498db', '#9b59b6'],
                ['#9b59b6', '#ee5253'],
                ['#ee5253', '#54a0ff']
            ]
        }
    }
});