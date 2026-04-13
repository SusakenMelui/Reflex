const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const clickArea = document.getElementById("clickArea");
const stats = document.querySelector(".stats");

stopButton.disabled = true;

let numberOfTrials = 5;
let currentNumberOfTrial = 0;
let times = [];
let timeout;
let startTime = 0;
let isGreen = false;
let wrongClickCounter = 0;


startButton.addEventListener("click", () => {
    resetScore();
    startButton.disabled = true;
    stopButton.disabled = false;
    nextTrial();
})

stopButton.addEventListener("click", () => {
    clearTimeout(timeout);
    endGame();
})

clickArea.addEventListener("click", () => {
    if (!isGreen) {
        wrongClickCounter++;
        return;
    }
    const reactionTime = Date.now() - startTime;
    times.push(reactionTime);

    isGreen = false;
    clickArea.style.background = "red";

    currentNumberOfTrial++;
    showStats();

    if (currentNumberOfTrial < numberOfTrials) {
        nextTrial();
    } else {
        endGame();
    }
})

function nextTrial() {
    const delay = Math.random() * 4000 + 1000;

    timeout = setTimeout(() => {
        clickArea.style.background = "green";
        startTime = Date.now();
        isGreen = true;
    }, delay);

}

function endGame() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearTimeout(timeout);

}


function showStats() {
    const max = Math.max(...times);
    const min = Math.min(...times);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const p = stats.querySelectorAll("p");
    let theBestScore = Number(localStorage.getItem("bestScore"));


    if (!theBestScore || min < theBestScore) {
        localStorage.setItem("bestScore", min.toString());
        theBestScore = min;
    }

    p[0].textContent = `Najkrótszy czas reakcji: ${min.toFixed(0)} ms`;
    p[1].textContent = `Najdłuższy czas reakcji: ${max.toFixed(0)} ms`;
    p[2].textContent = `Średni czas reakcji: ${avg.toFixed(0)} ms`;
    p[3].textContent = `Liczba przedwczesnych kliknięć: ${wrongClickCounter}`;
    p[4].textContent = `Najlepszy czas w historii: ${theBestScore}`;

    stats.style.display = "block";
}

function resetScore() {
    times = [];
    currentNumberOfTrial = 0;
    wrongClickCounter = 0;
    stats.style.display = "none";
}


