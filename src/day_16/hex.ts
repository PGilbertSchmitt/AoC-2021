const bitStringFromHexChar = (char: string): string => {
  return parseInt(char, 16).toString(2).padStart(4, '0')
};

export const hexToBits = (hexString: string): number[] => {
  return hexString
    .split('')
    .map(bitStringFromHexChar)
    .join('')
    .split('')
    .map(bit => parseInt(bit));
};
