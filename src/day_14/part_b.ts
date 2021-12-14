import { aperture, reduce, sort, last } from 'ramda';
import { Input, Rules } from './inputs';

type HeatMap = Map<string, number>;
type PolymerCache = Map<string, HeatMap>;

const cacheKey = (pair: string, depth: number): string => `${pair}_${depth}`;

const combineHeatmaps = (a: HeatMap, b: HeatMap, shared: string): HeatMap => {
  const combinedMap: HeatMap = new Map(a);
  for (const [component, count] of b.entries()) {
    combinedMap.set(component, (combinedMap.get(component) || 0) + count);
  }
  // Guaranteed to have the shared component
  combinedMap.set(shared, combinedMap.get(shared)! - 1);

  return combinedMap;
};

const calculateHeatMaps = (
  first: string,
  second: string,
  cache: PolymerCache,
  rules: Rules,
  depth: number
): HeatMap => {
  if (depth === 0) {
    return first === second
      ? new Map([[first, 2]])
      : new Map([[first, 1], [second, 1]]);
  }

  const pair = `${first}${second}`;
  const polymerKey = cacheKey(pair, depth);
  const cachedHeatmap = cache.get(polymerKey);

  if (cachedHeatmap) return cachedHeatmap;

  // All pairs are accounted for in rule map
  const insertion = rules.get(pair)!;

  const heatMap = combineHeatmaps(
    calculateHeatMaps(first, insertion, cache, rules, depth - 1),
    calculateHeatMaps(insertion, second, cache, rules, depth - 1),
    insertion
  );

  cache.set(polymerKey, heatMap);

  return heatMap;
};

export const cachedQuantityDifference = ({ template, rules }: Input, depth: number): number => {
  const initialPairs = aperture(2, template.split(''));
  const polymerCache: PolymerCache = new Map();

  const polymerHeatMap = reduce((acc, [first, second]) => {
    return combineHeatmaps(
      acc,
      calculateHeatMaps(first, second, polymerCache, rules, depth),
      first
    );
  }, new Map(), initialPairs);

  // Since I remove the first element of each pair from the resulting heatmap during the reduction,
  // I need to re-add the first initial element from the template once
  polymerHeatMap.set(
    template[0],
    polymerHeatMap.get(template[0])! + 1
  );

  const counts = sort((a, b) => a - b, Array.from(polymerHeatMap.values()));
  return last(counts)! - counts[0];
};
