import Board from './board.js';

export default class ComputerBoard extends Board {
  constructor() {
    super();
  }

  humanMove(row, col) {
    if (this.checkExists(row, col)) {
      return -1;
    }

    this.usedSlots.push([row, col]);
    return this.makeHit(row, col);
  }
}
