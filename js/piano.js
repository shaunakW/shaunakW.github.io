anime({
    targets: '#octave-1 .white-key',
    translateY: [-800, 0],
    delay: (el, i) => 200 * (i + 1),
    easing: 'easeOutBack'
});

anime({
    targets: '#octave-1 .black-key',
    translateY: [-500, 0],
    delay: (el, i) => 200 * (i + 6),
    easing: 'easeOutSine'
});