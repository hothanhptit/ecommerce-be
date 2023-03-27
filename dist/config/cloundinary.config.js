"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudStorage = exports.cloudinaryConfig = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;
exports.cloudinaryConfig = cloudinary.config({
    cloud_name: 'thanhh8nt',
    api_key: '497182279275317',
    api_secret: '1Z6LCdH9opFMOymLO7SNxJWe898',
});
exports.cloudStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png',
        public_id: (req, file) => 'computed-filename-using-request',
    },
});
//# sourceMappingURL=cloundinary.config.js.map