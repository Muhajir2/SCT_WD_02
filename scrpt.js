 let timerInterval;
let isRunning = false;
let time = 0;
let laps = [];

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("laps");

function updateTimeDisplay() {
    let hours = Math.floor(time / (1000 * 60 * 60)); 
    let minutes = Math.floor(time / (1000 * 60) % 60); 
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = time % 1000;

    timeDisplay.textContent = ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)};
}

function formatTime(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function formatMilliseconds(ms) {
    return Math.floor(ms / 10); 
}

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
    } else {
        timerInterval = setInterval(() => {
            time += 10;
            updateTimeDisplay();
        }, 10);
        startStopBtn.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    time = 0;
    updateTimeDisplay();
    startStopBtn.textContent = "Start";
    laps = [];
    lapList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / 1000 % 60);
        let milliseconds = time % 1000;
        const lapItem = document.createElement("li");
        lapItem.textContent = Lap: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)};
        lapList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
