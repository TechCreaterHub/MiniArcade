const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const box = 20;
let snake;
let food;
let dx;
let dy;
let score;
let game;

function init() {
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
  ];

  dx = box;
  dy = 0;
  score = 0;

  placeFood();
  scoreText.textContent = "Score: " + score;

  if (game) clearInterval(game);
  game = setInterval(gameLoop, 350);
}

function gameLoop() {
  moveSnake();
  if (checkGameOver()) return;
  draw();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreText.textContent = "Score: " + score;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff99";
  snake.forEach(p => ctx.fillRect(p.x, p.y, box, box));

  ctx.fillStyle = "#ff3333";
  ctx.fillRect(food.x, food.y, box, box);
}

function checkGameOver() {
  const head = snake[0];

  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
    end();
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      end();
      return true;
    }
  }

  return false;
}

function end() {
  clearInterval(game);
  alert("Game Over! Score: " + score);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
});

restartBtn.addEventListener("click", init);

init();
