import { reduce, times } from "ramda";

export type Packet = {
  version: number;
  op: null;
  value: bigint;
  length: number;
} | {
  version: number;
  op: number;
  packets: Packet[];
  length: number;
};

const VERSION_BIT_START = 0;
const VERSION_BIT_LENGTH = 3;
const TYPE_BIT_START = 3;
const TYPE_BIT_LENGTH = 3;
const LENGTH_BIT = 6;
const LENGTH_START = 7;
const TYPE_0_LENGTH_SIZE = 15;
const TYPE_1_LENGTH_SIZE = 11;
const TYPE_0_PACKET_START = LENGTH_START + TYPE_0_LENGTH_SIZE;
const TYPE_1_PACKET_START = LENGTH_START + TYPE_1_LENGTH_SIZE;

const slice = (bits: number[], start: number, length?: number): number[] => {
  return bits.slice(start, length && start + length);
}

const readBigBits = (bits: number[]): bigint => {
  let value = 0n;
  for (let i = 0; i < bits.length; i++) {
    value += BigInt(bits[i]) << BigInt(bits.length - i - 1);
  }
  return value;
};

const readBits = (bits: number[]): number => {
  let value = 0;
  for (let i = 0; i < bits.length; i++) {
    value += bits[i] << (bits.length - i - 1);
  }
  return value;
};

// Parses the literal portion of a type-4 packet, returning the value and the number of bits
const getLiteral = (bits: number[]): [bigint, number] => {
  let literalBits: number[] = [];
  for (let i = 5; i < bits.length + 1; i += 5) {
    const [cont, ...rest] = bits.slice(i - 5, i);
    literalBits.push(...rest);
    if (cont === 0) {
      break;
    }
  }
  return [readBigBits(literalBits), (literalBits.length / 4) * 5];
};

// Parses subpackets by length (type 0), returning the packets
const parsePacketsByLength = (bits: number[]): Packet[] => {
  const packets: Packet[] = [];

  let bitIndex = 0;
  while (bitIndex < bits.length) {
    const packetBits = slice(bits, bitIndex);
    const packet = parsePacket(packetBits);
    packets.push(packet);
    bitIndex += packet.length;
  }

  return packets;
};

// Parses subpackets by count (type 1), returning the packets
const parsePacketsByCount = (bits: number[], count: number): Packet[] => {
  const packets: Packet[] = [];

  let bitIndex = 0;
  times(() => {
    const packet = parsePacket(slice(bits, bitIndex));
    packets.push(packet);
    bitIndex += packet.length;
  }, count);

  return packets;
};

export const parsePacket = (bits: number[]): Packet => {
  const version = readBits(slice(bits, VERSION_BIT_START, VERSION_BIT_LENGTH));
  const op = readBits(slice(bits, TYPE_BIT_START,  TYPE_BIT_LENGTH));
  if (op === 4) {
    const [literal, literalLength] = getLiteral(slice(bits, 6));
    return {
      version,
      op: null,
      value: literal,
      length: literalLength + 6
    };
  }

  const lengthBit = bits[LENGTH_BIT];

  if (lengthBit === 0) {
    // Type 0, length encoded in next 15 bits
    const subPacketLength = readBits(slice(bits, LENGTH_START, TYPE_0_LENGTH_SIZE));
    const subPacketBits = slice(bits, TYPE_0_PACKET_START, subPacketLength);
    const subPackets = parsePacketsByLength(subPacketBits);
    return {
      version,
      op,
      length: TYPE_0_PACKET_START + subPacketLength,
      packets: subPackets
    }
  } else {
    // Type 1, subpacket count encoded in next 11 bits
    const subPacketCount = readBits(slice(bits, LENGTH_START, TYPE_1_LENGTH_SIZE));
    const subPackets = parsePacketsByCount(
      slice(bits, TYPE_1_PACKET_START),
      subPacketCount
    );
    return {
      version,
      op,
      length: reduce((sum, { length }) => sum + length, TYPE_1_PACKET_START, subPackets),
      packets: subPackets
    };
  }
};
