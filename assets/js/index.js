import ComputerBoard from './computerBoard.js';
import HumanBoard from './humanBoard.js';

let computerBoard = new ComputerBoard();
let humanBoard = new HumanBoard();

let createBoard = (body, gridDiv1, gridDiv2, resultMessage) => {
  let gridContainer = document.querySelector('.grid-container');

  for (let i = 0; i < computerBoard.grid.length; i++) {
    let row1 = computerBoard.grid[i];
    let row2 = humanBoard.grid[i];
    for (let j = 0; j < row1.length; j++) {
      let cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.setAttribute('data-row', i);
      cellDiv.setAttribute('data-col', j);
      cellDiv.setAttribute('data-value', row1[j]);
      gridDiv1.appendChild(cellDiv);

      let cellDiv2 = document.createElement('div');
      cellDiv2.className = 'cell';
      cellDiv2.setAttribute('data-row', i);
      cellDiv2.setAttribute('data-col', j);
      cellDiv2.setAttribute('data-value', row2[j]);
      gridDiv2.appendChild(cellDiv2);
    }
  }

  body.append(resultMessage);
  gridContainer.appendChild(gridDiv1);
  gridContainer.appendChild(gridDiv2);

  let cells = document.querySelectorAll('.grid1 .cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', clickEvent);
  });
};

let clickEvent = (event) => {
  let currentItem = event.target;
  let rowIndex = currentItem.dataset.row;
  let colIndex = currentItem.dataset.col;

  let hitValue = computerBoard.humanMove(rowIndex, colIndex);
  if (hitValue != -1) {
    if (hitValue === null) {
      currentItem.classList.add('red');
    } else {
      currentItem.classList.add('green');
      currentItem.textContent = hitValue;
    }

    let [compRowChoice, compColChoice] = humanBoard.computerMove();
    console.log(compRowChoice, compColChoice);

    let cells = document.querySelectorAll('.grid1 .cell');
    // check win
    checkWin(cells);

    let computerHitValue = humanBoard.makeHit(compRowChoice, compColChoice);
    let humanBoardCells = document.querySelectorAll('.grid2 .cell');
    let computerHitCell;
    humanBoardCells.forEach((cell) => {
      if (
        cell.dataset.row == compRowChoice &&
        cell.dataset.col == compColChoice
      ) {
        computerHitCell = cell;
      }
    });

    if (computerHitValue != null) {
      computerHitCell.style.backgroundColor = 'green';
      computerHitCell.textContent = computerHitValue;
    } else {
      computerHitCell.style.backgroundColor = 'red';
    }
    // check win
    checkWin(cells);
  }
};

let checkWin = (cells) => {
  if (computerBoard.isGameOver() || humanBoard.isGameOver()) {
    cells.forEach((cell) => {
      cell.removeEventListener('click', clickEvent);
    });
    document.querySelector('.result').textContent = 'Game over!';
  }
};

let reset = (body, gridDiv1, gridDiv2, resultMessage) => {
  computerBoard = new ComputerBoard();
  humanBoard = new HumanBoard();

  gridDiv1.innerHTML = '';
  gridDiv2.innerHTML = '';
  createBoard(body, gridDiv1, gridDiv2, resultMessage);
  resultMessage.textContent = '';
};

window.addEventListener('DOMContentLoaded', () => {
  let body = document.querySelector('body');
  let resultMessage = document.createElement('p');
  resultMessage.className = 'result';
  let resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.className = 'reset';

  let gridContainer = document.createElement('div');
  gridContainer.className = 'grid-container';

  let gridDiv1 = document.createElement('div');
  gridDiv1.className = 'grid1';
  let gridDiv2 = document.createElement('div');
  gridDiv2.className = 'grid2';
  resetButton.addEventListener('click', () =>
    reset(body, gridDiv1, gridDiv2, resultMessage)
  );
  body.appendChild(resetButton);
  body.appendChild(gridContainer);
  createBoard(body, gridDiv1, gridDiv2, resultMessage);
});
