let car = document.getElementById("car");
let gameArea = document.getElementById("gameArea");
let scoreText = document.getElementById("score");
let highScoreText = document.getElementById("highScore");
let music = document.getElementById("bgMusic");

let left = 45;
let score = 0;
let speed = 5;
let enemies = [];
let gameRunning = false;

// High Score load
let highScore = localStorage.getItem("highScore") || 0;
highScoreText.innerText = "High: " + highScore;

function startGame() {
  score = 0;
  speed = 5;
  gameRunning = true;

  if (music) music.play();

  enemies.forEach(e => e.remove());
  enemies = [];

  // multiple enemies
  for (let i = 0; i < 3; i++) {
    createEnemy();
  }

  gameLoop();
}

function createEnemy() {
  let enemy = document.createElement("img");
  enemy.src = "enemy.png";
  enemy.classList.add("enemy");
  enemy.style.left = Math.random() * 80 + "%";
  gameArea.appendChild(enemy);
  enemies.push(enemy);
}

function gameLoop() {
  if (!gameRunning) return;

  enemies.forEach(enemy => {
    let top = parseInt(enemy.style.top || -120);
    top += speed;
    enemy.style.top = top + "px";

    if (top > window.innerHeight) {
      enemy.style.top = "-120px";
      enemy.style.left = Math.random() * 80 + "%";
      score++;
      speed += 0.2;
      scoreText.innerText = "Score: " + score;
    }

    let carRect = car.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    if (
      carRect.left < enemyRect.right &&
      carRect.right > enemyRect.left &&
      carRect.top < enemyRect.bottom &&
      carRect.bottom > enemyRect.top
    ) {
      gameOver();
    }
  });

  requestAnimationFrame(gameLoop);
}

function gameOver() {
  gameRunning = false;
  if (music) music.pause();

  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  alert("💥 Game Over | Score: " + score);
}

// Controls
let moveInterval;

document.getElementById("leftBtn").ontouchstart = () => {
  moveInterval = setInterval(moveLeft, 50);
};
document.getElementById("leftBtn").ontouchend = () => clearInterval(moveInterval);

document.getElementById("rightBtn").ontouchstart = () => {
  moveInterval = setInterval(moveRight, 50);
};
document.getElementById("rightBtn").ontouchend = () => clearInterval(moveInterval);

function moveLeft() {
  if (left > 5) {
    left -= 2;
    car.style.left = left + "%";
  }
}

function moveRight() {
  if (left < 85) {
    left += 2;
    car.style.left = left + "%";
  }
}
