import { min } from "ramda";

interface GameState {
  currentIndex: number;
  tiles: [number, number];
  scores: [number, number];
}

type RollFn = () => number;

const createDie = () => {
  let face = 1;
  const roll = () => {
    if (face === 101) {
      face = 1
    }
    return face++;
  };
  return () => roll() + roll() + roll();
};

const turn = (state: GameState, rolls: RollFn) => {
  const { currentIndex, tiles, scores } = state;
  const newTile = (tiles[currentIndex] + rolls() - 1) % 10 + 1;
  scores[currentIndex] += newTile;
  tiles[currentIndex] = newTile;
  state.currentIndex = (currentIndex + 1) % 2;
};

export const runGame = ([player1, player2]: [number, number]) => {
  const gameState: GameState = {
    currentIndex: 0,
    tiles: [player1, player2],
    scores: [0, 0]
  };

  const rolls = createDie();
  let rollCount = 0;

  while (gameState.scores[0] < 1000 && gameState.scores[1] < 1000) {
    turn(gameState, rolls);
    rollCount += 3;
  }


  return min(...gameState.scores) * rollCount;
};
