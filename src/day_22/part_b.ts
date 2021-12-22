import { reduce } from 'ramda';
import { Instruction } from './inputs';
import { newVolumes, volumeSize, Volume } from './volumes';

export const calculateCoreVolume = ([first, ...instructions]: Instruction[]): bigint => {
  // The first volume of both the sample and the input is `on`, so this is fine
  let volumes: Volume[] = [first.volume];

  for (const { on, volume } of instructions) {
    const nextVolumes: Volume[] = [];

    // First, we subtract the incoming volume from all the existing volumes,
    // saving the new volumes
    for (const existingVolume of volumes) {
      nextVolumes.push(...newVolumes(existingVolume, volume));
    }

    // If the incoming volume has the `on` instruction, it's a new volume as well
    if (on) {
      nextVolumes.push(volume);
    }

    // Replace for the next step
    volumes = nextVolumes;
  }

  return reduce((sum, volume) => {
    return sum + volumeSize(volume);
  }, 0n, volumes);
};
