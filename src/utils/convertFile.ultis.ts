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
}
