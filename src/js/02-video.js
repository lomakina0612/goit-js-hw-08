import Player from "@vimeo/player";
import throttle from "lodash.throttle";

import storageApi from "./storage";


const PLAYER_CURRENT_TIME = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// событие 'timeupdate' = {seconds: 116.658, percent: 0.204, duration: 571.563} 
// throttle вызывает функцию handleTime не чаще чем 1 раз в сек(1000 мсек)
player.on('timeupdate', throttle(handleTime, 1000));

// берем из хранилища время и устанавливает его текущим значением перед началом воспроизведения
player.setCurrentTime(storageApi.load(PLAYER_CURRENT_TIME));


//записывает в хранилище количество секунд воспроизведения
function handleTime(event) {
  storageApi.save(PLAYER_CURRENT_TIME, event.seconds);
}


