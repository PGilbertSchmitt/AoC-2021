import { Board } from './board';
import { Input } from './inputs';

export const winBingo = (game: Input) => {
  const boards = game.boards.map(rawBoard => new Board(rawBoard));
  
  const drawNumber = (draw: number): number => {
    for (const board of boards) {
      const score = board.push(draw);
      if (score !== 0) {
        return score;
      }
    }
    return 0;
  };

  for (let draw of game.draws) {
    const score = drawNumber(draw);
    if (score !== 0) {
      return score;
    };
  }
};
