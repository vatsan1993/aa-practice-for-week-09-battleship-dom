import Board from './board.js';
export default class HumanBoard extends Board {
  constructor() {
    super();
  }

  computerMove() {
    let randomRow = Math.floor(Math.random() * (9 - 0) + 0);
    let randomCol = Math.floor(Math.random() * (9 - 0) + 0);
    while (this.checkExists(randomRow, randomCol)) {
      randomRow = Math.floor(Math.random() * (9 - 0) + 0);
      randomCol = Math.floor(Math.random() * (9 - 0) + 0);
    }

    this.usedSlots.push([randomRow, randomCol]);
    return [randomRow, randomCol];
  }
}
