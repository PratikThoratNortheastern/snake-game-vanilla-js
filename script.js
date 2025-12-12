"use strict";

const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
const blocks = [];
const snake = [{ x: 1, y: 3 }];
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * columns),
};

Object.values(food).forEach((value) => {});

let direction = "down";

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
    alert("Game Over");
    clearInterval(intervalId);
  }

  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };
    snake.push({ ...head });
  }

  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    //code for snake appearance;
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    // console.log(blocks[`${segment.x}-${segment.y}`]);
  });
}

intervalId = setInterval(() => {
  renderSnake();
}, 500);

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
