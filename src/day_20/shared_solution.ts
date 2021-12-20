import { sum } from 'ramda';
import { Input, Image, Binary } from './inputs';

const pixelIndex = (image: Image, oobPixel: Binary) => (
  (x: number, y: number) => {
    let algoIndex = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const imageX = x-1+i;
        const imageY = y-1+j;
        const bit = 8 - (3 * i + j);
        if (imageX < 0
         || imageY < 0
         || imageX >= image.length
         || imageY >= image[0].length
        ) {
          algoIndex += (oobPixel << bit);
        } else {
          algoIndex += (image[imageX][imageY] << bit);
        }
      }
    }
    return algoIndex;
  }
);

// New image is blank, but will have every spaced element replaced
const initializeNewImage = (image: Image): Image => {
  const newImage: Image = [];
  for (let i = 0; i < image.length+2; i++) {
    newImage.push(new Array(image[0].length + 2));
  }
  return newImage;
};

const step = (algorithm: Binary[]) => (
  (currentImage: Image, oobPixel: Binary): [Image, Binary] => {
    const getPixelIndex = pixelIndex(currentImage, oobPixel);
    const nextImage = initializeNewImage(currentImage);

    for (let x = 0; x < nextImage.length; x++) {
      for (let y = 0; y < nextImage[0].length; y++) {
        nextImage[x][y] = algorithm[getPixelIndex(x-1, y-1)];
      }
    }

    // If the Out of bounds pixel (index 0 in the algorithm) is 1, then the
    // infinite grid will switch between infinite lit pixels and infinite
    // dark pixels.
    const pixel0 = algorithm[0];
    const nextOobPixel: Binary = Number(oobPixel !== pixel0) as Binary;
    return [ nextImage, nextOobPixel ];
  }
);

export const litPixelCount = ({ algorithm, image }: Input, iterations: number): number => {
  let currentImage: Image = image;
  let currentOobPixel: Binary = 0;
  for (let i = 0; i < iterations; i++) {
    [ currentImage, currentOobPixel ] = step(algorithm)(currentImage, currentOobPixel);
  }

  return sum(currentImage.map(row => sum(row)));
};
