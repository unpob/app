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
let score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
let booster = localStorage.getItem('booster') ? parseFloat(localStorage.getItem('booster')) : 1;
const lvl = booster * 500;
const levelUpThreshold = 1000 + lvl; // Points per level
let lastTapTime = 0;
let taptime = 200; // Initial tap time

// Initialize display
scoreDisplay.innerText = score;
updateLevelAndProgress();

tapBtn.addEventListener('click', () => {
    const now = new Date().getTime();

    // Retrieve 'booster' and 'cash' from localStorage, default to 0 if not present
    let booster = localStorage.getItem('booster') ? parseFloat(localStorage.getItem('booster')) : 1;
    let cash = localStorage.getItem('cash') ? parseFloat(localStorage.getItem('cash')) : 0;

    // Ensure 'lbost' is a valid number and calculate the final booster value
    let lbost = booster / 10 || 0.01;
    let finalBooster = (lbost + cash) || lbost;

    // Round 'finalBooster' to 2 decimal places
    finalBooster = Math.round(finalBooster * 100) / 100;

    if (now - lastTapTime < 130) {
        // If taps are too quick (within 100ms), increase the tap time to 250ms
        taptime = 1000;
    } else if (now - lastTapTime >= 140 && now - lastTapTime <= 220) {
        // If the tap is between 100ms and 180ms, reset the taptime to 200ms
        taptime = 200;
    }

    if (now - lastTapTime >= taptime) {
        score += finalBooster;  // Increase score by the final booster value
        score = Math.round(score * 100) / 100;  // Round score to 2 decimal places

        // Show +booster animation
        const plusOne = document.createElement('div');
        plusOne.classList.add('plus-one');
        plusOne.textContent = `+${finalBooster}`;
        container.appendChild(plusOne);

        // Remove the animation after it's done
        setTimeout(() => {
            plusOne.remove();
        }, 800);

        // Update display and level progress
        scoreDisplay.innerText = score;
        updateLevelAndProgress();

        // Save the score in local storage
        localStorage.setItem('score', score);

        lastTapTime = now;
    }
});

// Update the level and progress based on total score
function updateLevelAndProgress() {
    const level = Math.floor(score / levelUpThreshold) + 1; // Determine level based on total score
    const progressInLevel = score % levelUpThreshold; // Calculate progress within the current level

    // Save the current level as booster in local storage
    localStorage.setItem('booster', level);

    // Update progress bar and level display
    progressBar.style.width = `${(progressInLevel / levelUpThreshold) * 100}%`;
    progressDisplay.innerText = `${progressInLevel} / ${levelUpThreshold}`;
    levelDisplay.innerText = `Level ${level}`;
}

// On page load, load saved values from local storage
window.addEventListener('load', () => {
    score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
    scoreDisplay.innerText = score;

    const secureData = JSON.parse(localStorage.getItem("secureData"));
    const name = secureData ? secureData.name : 'Guest';
    btntext = "Boost";
    document.getElementById("btntxt").innerText = btntext;

    document.getElementById("name").innerText = name;
    updateLevelAndProgress();
});
