const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let ballPosition = { x: 50, y: 50 };
let holePosition = getRandomPosition();
let score = 0;
let startTime;
let timerInterval;

function getRandomPosition() {
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const x = Math.random() * (containerWidth - 30);
    const y = Math.random() * (containerHeight - 30);
    return { x, y };
}

function updateBallPosition() {
    ball.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`;
}

function updateHolePosition() {
    hole.style.transform = `translate(${holePosition.x}px, ${holePosition.y}px)`;
}

function checkCollision() {
    const distance = Math.sqrt(
        Math.pow(ballPosition.x - holePosition.x, 2) +
        Math.pow(ballPosition.y - holePosition.y, 2)
    );
    return distance < 15;
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
    holePosition = getRandomPosition();
    updateHolePosition();
}

function startGame() {
    ballPosition = { x: 50, y: 50 };
    score = 0;
    updateBallPosition();
    updateHolePosition();
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsed}`;
    if (elapsed >= 60) {
        clearInterval(timerInterval);
        alert(`Game Over! Your score is ${score}`);
    }
}

function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    ballPosition.x += gamma * 0.1;
    ballPosition.y += beta * 0.1;

    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;

    ballPosition.x = Math.max(0, Math.min(containerWidth - 30, ballPosition.x));
    ballPosition.y = Math.max(0, Math.min(containerHeight - 30, ballPosition.y));

    updateBallPosition();

    if (checkCollision()) {
        updateScore();
    }
}

window.addEventListener('deviceorientation', handleOrientation);

startButton.addEventListener('click', () => {
    startGame();
});
