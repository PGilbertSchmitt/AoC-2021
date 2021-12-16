import { Packet, parsePacket } from './packet';
import { hexToBits } from './hex';
import { reduce } from 'ramda';

const sum = (values: bigint[]): bigint => {
  return reduce((acc, value) => acc + value, 0n, values);
};

const product = (values: bigint[]): bigint => {
  return reduce((acc, value) => acc * value, 1n, values);
};

const min = (values: bigint[]): bigint => {
  return reduce((acc, value) => {
    return value < acc ? value : acc;
  }, Infinity as unknown as bigint, values);
};

const max = (values: bigint[]): bigint => {
  return reduce((acc, value) => {
    return value > acc ? value : acc;
  }, -Infinity as unknown as bigint, values);
};

const calculatePacket = (packet: Packet): bigint => {
  if (packet.op === null) { 
    return BigInt(packet.value);
  }

  const packetValues = packet.packets.map(calculatePacket);
  switch (packet.op) {
    case 0:
      return sum(packetValues);
    case 1:
      return product(packetValues);
    case 2:
      return min(packetValues);
    case 3:
      return max(packetValues);
    case 5:
      const [a, b] = packetValues;
      return a > b ? 1n : 0n;
    case 6:
      const [c, d] = packetValues;
      return c < d ? 1n : 0n;
    case 7:
      const [e, f] = packetValues;
      return e === f ? 1n : 0n;
    default:
      throw new Error(`Unknown op ${packet.op}`);
  }
};

export const calculate = (packetString: string): bigint => {
  return calculatePacket(parsePacket(hexToBits(packetString)));
};
