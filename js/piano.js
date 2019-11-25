anime({
    targets: '#octave-1 .white-key',
    translateY: [-document.querySelector('#octave-1 .white-key').clientHeight, 0],
    delay: anime.stagger(200, {start: 200}),
    easing: 'easeOutBack'
});

anime({
    targets: '#octave-1 .black-key',
    translateY: [-document.querySelector('#octave-1 .black-key').clientHeight, 0],
    delay: anime.stagger(200, {start: 1200}),
    easing: 'easeOutBack',
    complete: readyKeys
});

function readyKeys() {
    document.querySelectorAll('.white-key, .black-key').forEach((key, i) => {
        key.onclick = () => {
            // Audio obtained from http://www.telacommunications.com/nutshell/music/sounds-mp3
            const audio = new Audio(`/assets/audio/piano${i}.mp3`);
            audio.play();
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