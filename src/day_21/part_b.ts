import { range } from 'ramda';

interface GameState {
  currentIndex: number;
  tiles: [number, number];
  scores: [number, number];
}

type WonGames = [bigint, bigint];
type StateCount = Map<string, WonGames>;

const gameStateHash = ({
  currentIndex,
  tiles: [a, b],
  scores: [c, d]
}: GameState): string => `${currentIndex}:${a},${b}:${c},${d}`;

// There's probably a better way to handle this, but:
// na-nanny-booboo, stick your head in doodoo.
const buildDistrubution = () => {
  // Using bigints right away so I don't need to keep casting
  const OUTCOMES = [1, 2, 3];
  const distrubutions = new Map<number, bigint>(
    range(3,10).map(result => [result, 0n])
  );
  OUTCOMES.forEach(a => {
    OUTCOMES.forEach(b => {
      OUTCOMES.forEach(c => {
        const sum = a+b+c;
        distrubutions.set(sum, distrubutions.get(sum)! + 1n);
      })
    })
  });
  return distrubutions;
};

// The static distribution of all possible roll outcomes for 3 3-sided dice
// const DISTRIBUTIONS = new Map<number, bigint>([
//   [3, 1n],
//   [4, 3n],
//   [5, 6n],
//   [6, 7n],
//   [7, 6n],
//   [8, 3n],
//   [9, 1n],
// ]);

// Builds a distrubution that looks like this:
// 3 => 1
// 4 => 3
// 5 => 6
// 6 => 7
// 7 => 6
// 8 => 3
// 9 => 1
// The value is already a bigint to avoid constant casting
const DISTRIBUTIONS = buildDistrubution();

const turn = (state: GameState, rollTotal: number): GameState => {
  const { currentIndex, scores, tiles } = state;
  const newState: GameState = {
    currentIndex: (currentIndex + 1) % 2,
    tiles: [...tiles],
    scores: [...scores]
  }
  const newTile = (tiles[currentIndex] + rollTotal - 1) % 10 + 1;
  newState.scores[currentIndex] += newTile;
  newState.tiles[currentIndex] = newTile;
  return newState;
};

// Returns 0 for player 1 winning, 1 for player 2 winning, and null for neither
const winner = ({ scores }: GameState): 0 | 1 | null => {
  if (scores[0] >= 21) {
    return 0;
  }
  if (scores[1] >= 21) {
    return 1;
  }
  return null;
};

const wonGames = (state: GameState, stateCount: StateCount): WonGames => {
  const stateHash = gameStateHash(state);
  const cachedState = stateCount.get(stateHash);
  if (cachedState !== undefined) {
    return cachedState;
  }

  const currentWins: WonGames = [0n, 0n];
  // Calculate all possible new game states:
  for (const [roll, count] of DISTRIBUTIONS.entries()) {
    const newState = turn(state, roll);
    const winIndex = winner(newState);
    if (winIndex === null) {
      // calculate won games for new state
      const newWonGames = wonGames(newState, stateCount);
      currentWins[0] += newWonGames[0] * count;
      currentWins[1] += newWonGames[1] * count;
    } else {
      // Base case for found winning games
      currentWins[winIndex] += count;
    }
  }

  // Memoize
  stateCount.set(stateHash, currentWins);
  return currentWins;
};

export const winnersTotal = ([player1, player2]: [number, number]): bigint => {
  const [player1Total, player2Total] = wonGames({
    currentIndex: 0,
    scores: [0, 0],
    tiles: [player1, player2]
  }, new Map());

  return player1Total > player2Total
    ? player1Total
    : player2Total;
};
