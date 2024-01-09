//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//food
let foodX;
let foodY;

//score;
let scoreText = 0;

let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  score = document.getElementById("score");
  score.innerHTML = scoreText;

  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // drawing on the board

  placeFood();

  document.addEventListener("keyup", changeDirection);

  setInterval(update, 1000 / 10);
  score.innerHTML = scoreText;
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    scoreText += 1;
    score.innerHTML = scoreText;
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // game over
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize - blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize - blockSize
  ) {
    gameOverHandler();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOverHandler();
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function gameOverHandler() {
  gameOver = true;
  if (scoreText === 0) {
    alert("You are so dumb! Play again !!!");
  } else if (scoreText > 0 && scoreText <= 10) {
    alert("Nice Try! But still noob!! Play again !!!");
  } else if (scoreText > 10 && scoreText <= 20) {
    alert("Good Job!! Try Again ? ");
  } else if (scoreText > 20 && scoreText <= 30) {
    alert("So pro!! Wanna be god  ?");
  } else if (scoreText > 30) {
    alert("GOD!!!");
  }
  window.location.reload();
}
