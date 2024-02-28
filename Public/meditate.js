// let duration = document.querySelector('.duration');
// console.log(duration.innerHTML);
console.log("hello worlddddd!");

let minutes = document.querySelector('.minutes').innerHTML;


let time = minutes*60;

let countdown = document.querySelector('.countdown');

// setInterval(updateCountdown, 1000);
let interval;

function updateCountdown() {
    if(time < 0){
        countdown.innerHTML = '00:00';
        return;
    }
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
//   minutes = minutes < 10 ? '0' + minutes : minutes;
  countdown.innerHTML = `${minutes}:${seconds}`;
  time--;
}

let playOrPause = false;
let play = document.querySelector('.play-or-pause');
let spotifyIframe = document.querySelector('.spotify');
let timeCircle = document.querySelector('.main-circle');
let mainCircle = timeCircle.querySelector('circle');
play.addEventListener('click', () => {
    playOrPause = !playOrPause;
    if(playOrPause){
        interval = setInterval(updateCountdown, 1000);
        spotifyIframe.contentWindow.postMessage('play', '*');
        mainCircle.style.animation = `rotate ${minutes*60}s linear forwards`;
        play.innerHTML = '<img src="/meditate/Frame 66-1.png"></img>';
    }
    else{
        clearInterval(interval);
        spotifyIframe.contentWindow.postMessage('pause', '*');
        play.innerHTML = '<img src="/meditate/ion_play.png"></img>';
        console.log('clear');
        // countdown.innerHTML = `${minutes}:${seconds}`;
    }
});


let reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    clearInterval(interval);
    time = minutes*60;
    countdown.innerHTML = `${minutes}:00`;
    playOrPause = false;
    play.innerHTML = '<img src="/img/ion_play.png"></img>';
    mainCircle.style.animation = '';
});

// window.onSpotifyIframeApiReady = (IFrameAPI) => {
//     let element = document.getElementById('spotify');
//     let options = {
//         width: '25%',
//         // height: '80',
//         uri: 'spotify:playlist:7xmpNYZ15D6b43BHzYQCLt'
//       };
//     let callback = (EmbedController) => {
//         EmbedController.loadUri('spotify:playlist:7xmpNYZ15D6b43BHzYQCLt')
//         EmbedController.play()
//     };
//     IFrameAPI.createController(element, options, callback);
// };

  
