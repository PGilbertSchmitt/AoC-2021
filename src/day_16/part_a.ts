import { sum } from 'ramda';
import { hexToBits } from './hex';
import { Packet, parsePacket } from './packet';

const versionSum = (packet: Packet): number => {
  if (packet.op === null) {
    return packet.version;
  }
  return packet.version + sum(packet.packets.map(versionSum));
};

export const getPacketVersionSum = (packetString: string): number => {
  return versionSum(parsePacket(hexToBits(packetString)));
};
