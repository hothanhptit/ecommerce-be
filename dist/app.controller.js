"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const app_services_1 = require("./app.services");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const uuid_1 = require("uuid");
const dist_1 = require("@nestjs-modules/mailer/dist");
const sharp = require('sharp');
const nodemailer = require('nodemailer');
let AppController = class AppController {
    constructor(appService, mailerService) {
        this.appService = appService;
        this.mailerService = mailerService;
        cloudinary_1.v2.config({
            cloud_name: 'thanhh8nt',
            api_key: '497182279275317',
            api_secret: '1Z6LCdH9opFMOymLO7SNxJWe898',
        });
    }
    async uploadFile1(file) {
        return { url: file.path };
    }
};
__decorate([
    (0, common_1.Post)('files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: new multer_storage_cloudinary_1.CloudinaryStorage({
            cloudinary: cloudinary_1.v2,
            params: {
                format: async (req, file) => 'png',
                public_id: (req, file) => (0, uuid_1.v4)(),
                transformation: [
                    { quality: 'auto' },
                    { fetch_format: 'auto', quality: 'auto' },
                ],
            },
        }),
    })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFile1", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_services_1.AppService,
        dist_1.MailerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map