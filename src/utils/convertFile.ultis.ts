const sharp = require('sharp');

export async function compessImg(
  inputPath: string,
  outputPath: string,
  quality?: number,
) {
  await sharp(inputPath)
    .resize(200)
    .png({ compressionLevel: 9 })
    .toFile(outputPath.split('.')[0] + '-cp.png');
    // keep the width or height to maintain the ratio
    // .resize({
    //     fit: sharp.fit.contain,
    //     width: 800
    // })
    // .jpeg({ quality: 80 })
}
