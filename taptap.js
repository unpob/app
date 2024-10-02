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
let boostert = document.getElementById('level').textContent;
const booster = boostert.replace(/[^0-9]/g, '');
const lvl = booster * 500;
const levelUpThreshold = 2500 + lvl; // Points per level
let lastTapTime = 0;
let taptime = 200; // Initial tap time

// Initialize display
scoreDisplay.innerText = score;
updateLevelAndProgress();

tapBtn.addEventListener('click', () => {
    // Check if booster is 150
    let booster = localStorage.getItem('booster') ? parseFloat(localStorage.getItem('booster')) : 1;

    if (booster >= 250) {
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
        score += finalBooster;
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
const paragraph = document.querySelector('.air');

// Array of texts to display
const texts = [
  "Air Drop on 10 October 2024 🔥",
  "Don't miss out! 🚀",
  "7 অক্টোবর coin mining বন্ধ হবে 🎉"
];

let currentIndex = 0;

// Function to update the paragraph text with animation
function updateTextWithAnimation() {
  // Fade out
  paragraph.style.opacity = 0;
  
  setTimeout(() => {
    // Change the text when fully faded out
    paragraph.innerText = texts[currentIndex];
    
    // Fade in
    paragraph.style.opacity = 1;
    
    // Move to the next text, and loop back to the first one
    currentIndex = (currentIndex + 1) % texts.length;
  }, 500); // Wait for 500ms (duration of fade out) before changing text
}

// Set the initial text and opacity
paragraph.innerText = texts[0];
paragraph.style.opacity = 1;

// Change text every 5 seconds
setInterval(updateTextWithAnimation, 3000);

// Optional: Set the initial fade duration
paragraph.style.transition = 'opacity 0.5s';    const secureData = JSON.parse(localStorage.getItem("secureData"));
    const name = secureData ? secureData.name : 'Guest';
    btntext = "Boost";
    document.getElementById("btntxt").innerText = btntext;

    document.getElementById("name").innerText = name;
    updateLevelAndProgress();
});
