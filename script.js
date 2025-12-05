"use strict";

const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

for (let i = 0; i < rows * columns; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  board.appendChild(block);
}
