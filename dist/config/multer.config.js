"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = exports.multerConfig = void 0;
const cloundinary_config_1 = require("./cloundinary.config");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
exports.multerConfig = {
    dest: process.env.UPLOAD_LOCATION || './uploads',
};
exports.multerOptions = {
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: { cloudStorage: cloundinary_config_1.cloudStorage },
};
//# sourceMappingURL=multer.config.js.map