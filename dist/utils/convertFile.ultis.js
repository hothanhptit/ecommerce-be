"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compessImg = void 0;
const sharp = require('sharp');
async function compessImg(inputPath, width = 300, quality, type) {
    if (type == 'png') {
        await sharp(inputPath)
            .resize({
            fit: sharp.fit.contain,
            width: width,
        })
            .png({ compressionLevel: 9 })
            .toFile(inputPath.split('.')[0] + '-cp.png');
        return inputPath.split('.')[0] + '-cp.png';
    }
    else {
        await sharp(inputPath)
            .resize({
            fit: sharp.fit.contain,
            width: width,
        })
            .jpeg()
            .toFile(inputPath.split('.')[0] + '-cp.jpg');
        return inputPath.split('.')[0] + '-cp.jpg';
    }
}
exports.compessImg = compessImg;
//# sourceMappingURL=convertFile.ultis.js.map