import { Board } from './board';
import { Input } from './inputs';

export const loseBingo = (game: Input): number => {
  const boardMap = new Map<number, Board>();
  game.boards.map((rawBoard, i) => boardMap.set(i, new Board(rawBoard)));

  const drawNumber = (draw: number): number => {
    for (const [key, board] of boardMap.entries()) {
      const score = board.push(draw);
      if (score !== 0) {
        boardMap.delete(key);
        if (boardMap.size === 0) {
          return score;
        }
      }
    }
    return 0;
  };

  for (let draw of game.draws) {
    const score = drawNumber(draw);
    if (score !== 0) {
      return score;
    }
  }
  return 0;
};