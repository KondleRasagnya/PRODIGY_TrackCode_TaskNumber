// Get HTML elements
const stopwatchDisplay = document.getElementById("stopwatch");
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapList = document.getElementById("lapList");

let timerInterval;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;
let lastLapTime = 0;  // To track the time of the last lap

function formatTime(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = "Start";
        lapButton.disabled = false;  // Enable lap button when timer is paused
    } else {
        timerInterval = setInterval(() => {
            seconds++;
            stopwatchDisplay.textContent = formatTime(seconds);
        }, 1000);
        startPauseButton.textContent = "Pause";
        lapButton.disabled = false;  // Enable lap button when timer is running
    }

    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    stopwatchDisplay.textContent = formatTime(seconds);
    startPauseButton.textContent = "Start";
    lapButton.disabled = true;  // Disable lap button until the timer is running
    isRunning = false;
    lapList.innerHTML = ""; // Clear lap times
    lapCounter = 1;
    lastLapTime = 0;
}

function addLap() {
    if (isRunning) {
        const currentLapTime = seconds - lastLapTime;
        const formattedLapTime = formatTime(currentLapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
        lastLapTime = seconds;  // Update last lap time for interval calculation
    }
}

// Event Listeners
startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", addLap);

// Keyboard shortcuts (optional)
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
        startPauseTimer();
    } else if (e.key === "r" || e.key === "R") {
        resetTimer();
    } else if (e.key === "l" || e.key === "L") {
        addLap();
    }
});
