const boost = document.getElementById('reset');

boost.addEventListener('click', () => {
  window.location.href = 'booster.html';
});

const tapBtn = document.getElementById('tapBtn');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progressBar');
const progressDisplay = document.getElementById('progress');
const levelDisplay = document.getElementById('level');
const container = document.querySelector('.container');

// Get saved values from local storage, or set defaults
let score = document.getElementById('score').textContent;
let lastTapTime = 0;
let taptime = 200; // Initial tap time

// Initialize display
scoreDisplay.innerText = score;
updateLevelAndProgress();

tapBtn.addEventListener('click', () => {
    let booster = localStorage.getItem('booster') ? parseFloat(localStorage.getItem('booster')) : 1;

    if (booster >= 85) {
        alert("Max level হয়ে গেছে 💯 Air Drop এর জন্য অপেক্ষা করুন💥");
        tapBtn.disabled = true; // Disable the tap button
        return; // Prevent further execution
    }

    const now = new Date().getTime();
    let cash = localStorage.getItem('cash') ? parseFloat(localStorage.getItem('cash')) : 0;

    let lbost = booster / 10 || 0.01;
    let finalBooster = (lbost + cash) || lbost;

    finalBooster = Math.round(finalBooster * 100) / 100;

    if (now - lastTapTime < 120) {
        taptime = 900;
    } else if (now - lastTapTime >= 120 && now - lastTapTime <= 280) {
        taptime = 200;
    }

    if (now - lastTapTime >= taptime) {
        score = parseFloat(score) + finalBooster;
        score = Math.round(score * 100) / 100;

        const plusOne = document.createElement('div');
        plusOne.classList.add('plus-one');
        plusOne.textContent = `+${finalBooster}`;
        container.appendChild(plusOne);

        setTimeout(() => {
            plusOne.remove();
        }, 800);

        scoreDisplay.innerText = score;
        updateLevelAndProgress();

        localStorage.setItem('score', score);

        lastTapTime = now;
    }
});

// Update the level and progress based on total score
function updateLevelAndProgress() {
    const baseThreshold = 1500;
    let cumulativeScore = 0;
    let level = 0;

    // Iterate through levels, increasing the threshold gradually
    while (score >= cumulativeScore) {
        level++;
        cumulativeScore += baseThreshold * Math.pow(1.05, level - 1); // 5% increase per level
    }

    const progressInLevel = score - (cumulativeScore - baseThreshold * Math.pow(1.05, level - 1));

    // Save the current level as booster in local storage
    localStorage.setItem('booster', level);

    // Update progress bar and level display
    progressBar.style.width = `${(progressInLevel / (baseThreshold * Math.pow(1.05, level - 1))) * 100}%`;
    progressDisplay.innerText = `${progressInLevel.toFixed(0)} / ${(baseThreshold * Math.pow(1.05, level - 1)).toFixed(0)}`;
    levelDisplay.innerText = `Level ${level}`;
}

// On page load, load saved values from local storage
window.addEventListener('load', () => {
    score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
    scoreDisplay.innerText = score;
    const secureData = JSON.parse(localStorage.getItem("secureData"));
    const name = secureData ? secureData.name : 'Guest';
    document.getElementById("name").innerText = name;
    updateLevelAndProgress();
});
