"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compessImg = void 0;
const sharp = require('sharp');
async function compessImg(inputPath, outputPath, quality) {
    await sharp(inputPath)
        .resize(200)
        .png({ compressionLevel: 9 })
        .toFile(outputPath.split('.')[0] + '-cp.png');
}
exports.compessImg = compessImg;
//# sourceMappingURL=convertFile.ultis.js.map