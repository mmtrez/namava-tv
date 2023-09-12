// ** ELEMENTS
const video = document.querySelector('.device-video video');
const videoPlayBtn = document.querySelector('.device-video .play-btn');

// VIDEO
const handlePlayVideo = () => {
  if (video.paused) {
    videoPlayBtn.classList.add('hide');
    video.play();
    video.setAttribute('controls', true);
  }
};

const handleVideoEnd = () => {
  if (video.ended) {
    videoPlayBtn.classList.remove('hide');
    video.removeAttribute('controls');
  }
};

videoPlayBtn.addEventListener('click', handlePlayVideo);
video.addEventListener('timeupdate', handleVideoEnd);
