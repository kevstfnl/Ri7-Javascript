//Main menu
const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");
const settingsButton = document.getElementById("settingsButton");


//Settings menu
const settingsMenu = document.getElementById("settingsMenu");
const backToMain = document.getElementById("backToMain");

settingsButton.addEventListener('click', () => {
    mainMenu.classList.remove("active");
    settingsMenu.classList.add("active");
})

//Settings inputs
const bloodInput = document.getElementById("blood");
const soundInput = document.getElementById("sound");
const levelInput = document.getElementById("volume");
let blood = bloodInput.checked;
let sound = soundInput.checked;
let level = levelInput.value;
backToMain.addEventListener('click', (e) => {
    settingsMenu.classList.remove("active");
    mainMenu.classList.add("active");
    blood = bloodInput.checked;
    sound = soundInput.checked;
    level = levelInput.value;
})

playButton.addEventListener('click', () => {
    mainMenu.classList.remove("active");
    settingsMenu.classList.remove("active");
    gameBoard.classList.add("active");
})



const gameBoard = document.getElementById("gameBoard");
const scoreOverlay = document.getElementById("score");
const target = document.getElementById('target');

let score = 0;
let clickable = true;
let start = 0;
target.addEventListener('click', () => {
    if (start == 0) {
        start = performance.now();
    }
    score++;
    clickable = false;
    scoreOverlay.innerText = "Score: " + score + " / 40";

    let height = target.clientHeight - (score / 4);
    target.style.height = height + "px";

    if (height <= 0) {
        end();
        return;
    }
    target.style.top = random(0, gameBoard.clientHeight - target.clientHeight) + 'px';
    target.style.left = random(0, gameBoard.clientWidth - target.clientWidth) + 'px';
    setTimeout(() => clickable = true, 250)
})

const endMenu = document.getElementById("endMenu");
function end() {
    endMenu.textContent = "Vous avez mit " + ((performance.now() - start) / 1000).toFixed(4) + " secondes à anéantir le clown"
    mainMenu.classList.add("active");
    endMenu.classList.add("active");
    gameBoard.classList.remove("active");
    score = 0;
    start = 0;

}

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}