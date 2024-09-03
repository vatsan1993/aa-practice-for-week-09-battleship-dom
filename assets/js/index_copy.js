import Board from './board.js';

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.

let clickEvent = (event) => {
  let currentItem = event.target;
  let rowIndex = currentItem.dataset.row;
  let colIndex = currentItem.dataset.col;

  let hitValue = board.makeHit(rowIndex, colIndex);

  if (hitValue === null) {
    currentItem.classList.add('red');
  } else {
    currentItem.classList.add('green');
    currentItem.textContent = hitValue;
  }

  let cells = document.querySelectorAll('.cell');
  if (board.isGameOver()) {
    console.log('game is over');

    cells.forEach((cell) => {
      cell.removeEventListener('click', clickEvent);
      document.querySelector('.result').textContent = 'You Win!';
    });
  }
};

let createBoard = (body, gridDiv, resultMessage) => {
  console.log(board.grid);
  for (let i = 0; i < board.grid.length; i++) {
    let row = board.grid[i];
    for (let j = 0; j < row.length; j++) {
      let cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.setAttribute('data-row', i);
      cellDiv.setAttribute('data-col', j);
      cellDiv.setAttribute('data-value', row[j]);
      gridDiv.appendChild(cellDiv);
    }
  }

  body.append(resultMessage);
  body.appendChild(gridDiv);
  let cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', clickEvent);
  });
};

let reset = (body, gridDiv, resultMessage) => {
  board = new Board();
  gridDiv.innerHTML = '';
  createBoard(body, gridDiv, resultMessage);
  resultMessage.textContent = '';
};

// Your code here
window.addEventListener('DOMContentLoaded', () => {
  let body = document.querySelector('body');
  let resultMessage = document.createElement('p');
  resultMessage.className = 'result';
  let resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.className = 'reset';
  let gridDiv = document.createElement('div');
  gridDiv.className = 'grid';
  resetButton.addEventListener('click', () =>
    reset(body, gridDiv, resultMessage)
  );
  body.appendChild(resetButton);
  createBoard(body, gridDiv, resultMessage);
});
