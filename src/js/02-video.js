import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURR_PLAYBACK_TIME = 'videoplayer-current-time';
const currentTime = JSON.parse(localStorage.getItem(CURR_PLAYBACK_TIME));

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onGetCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(CURR_PLAYBACK_TIME, seconds);
  });
}

player.on('timeupdate', throttle(onGetCurrentTime, 1000));

player.setCurrentTime(currentTime);
