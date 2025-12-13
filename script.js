"use strict";

const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timerIntervalId = null;
const blocks = [];
let snake = [{ x: 1, y: 3 }];
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * columns),
};
let startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".restart-game");
const restartButton = document.querySelector(".btn-restart");
let direction = "down";
const highScoreElement = document.querySelector("#high-score");
const currentScoreElement = document.querySelector("#current-score");
const timeElement = document.querySelector("#time");

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innerText = highScore;

// Adding blocks based on the size of board div
for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${column}`;
    blocks[`${row}-${column}`] = block;
  }
}

function renderSnake() {
  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  // Board edge detection for snake head

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
    // alert("Game Over");
    clearInterval(intervalId);
    modal.style.display = "flex";
    gameOverModal.style.display = "flex";
    startGameModal.style.display = "none";

    return;
  }

  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };
    snake.push({ ...head });
    score += 10;
    currentScoreElement.innerText = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    //code for snake appearance;
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    // console.log(blocks[`${segment.x}-${segment.y}`]);
  });
}

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    renderSnake();
  }, 200);
  timerIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split("-").map(Number);
    if (seconds == 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }

    time = `${minutes}-${seconds}`;
    timeElement.innerText = time;
  }, 1000);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
  clearInterval(intervalId);

  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  modal.style.display = "none";
  snake = [{ x: 1, y: 3 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * columns),
  };
  score = 0;
  time = "00-00";
  currentScoreElement.innerText = score;
  highScoreElement.innerText = highScore;
  timeElement.innerText = time;
  intervalId = setInterval(() => {
    renderSnake();
  }, 200);
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }
});
