anime({
    targets: '#octave-1 .white-key',
    translateY: [-800, 0],
    delay: anime.stagger(200, {start: 200}),
    easing: 'easeOutBack'
});

anime({
    targets: '#octave-1 .black-key',
    translateY: [-500, 0],
    delay: anime.stagger(200, {start: 1200}),
    easing: 'easeOutBack',
    complete: readyKeys
});

function readyKeys() {
    document.querySelectorAll('.white-key, .black-key').forEach((key, i) => {
        key.onclick = () => {
            anime({
                targets: key,
                translateY: [0, 25],
                translateX: [0, -3],
                duration: 100,
                easing: 'easeOutSine',
                direction: 'alternate'
            });
        }
    });
}