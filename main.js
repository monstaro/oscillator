var listen = document.querySelector('.start')
var displayHz = document.querySelector('.current-hertz')
var hzSlider = document.querySelector('.hertz-slider')

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(hzSlider.value, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);

let isPlaying = false;
const runIt = (startTime, endTime) => {
    if (isPlaying === false) {
        oscillator.start();
        isPlaying = true;
    } else {
        oscillator.stop();
        isPlaying = false;
        oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(hzSlider.value, audioCtx.currentTime); 
        oscillator.connect(audioCtx.destination);
    }
    oscillator.frequency.setValueAtTime(hzSlider.value, audioCtx.currentTime);
}

const updateHz = () => {
    console.log(hzSlider.value)
    displayHz.innerText = hzSlider.value + ' Hz'
}

listen.addEventListener('click', ()  => runIt())
hzSlider.addEventListener('change', () => updateHz())