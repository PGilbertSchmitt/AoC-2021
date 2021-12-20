import { Scanner } from './inputs';
import { uniqueBeacons } from './beacons';

export const beaconCount = (scanners: Scanner[]): number => {
  return uniqueBeacons(scanners)[0].length;  
};
