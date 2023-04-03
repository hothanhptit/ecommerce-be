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
const decorators_1 = require("@nestjs/common/decorators");
const multer_config_1 = require("./config/multer.config");
const app_services_1 = require("./app.services");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_1 = require("cloudinary");
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
    async uploadFile(files) {
        return {
            files,
        };
    }
    uploadM(files) {
        console.log(files);
        return files;
    }
    async uploadFiles(files) {
        console.log(files);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thanhh8nt@gmail.com',
                pass: 'pjjuhkhzgghjybba'
            }
        });
        const mailOptions = {
            from: 'thanhh8nt@gmail.com',
            to: 'hothanhptit@gmail.com',
            subject: 'Subject tesing any',
            text: 'Email content test 123 thanhhd'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return files;
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerOptions)),
    (0, common_1.Post)('files'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload-multi'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'avatar', maxCount: 2 },
        { name: 'background', maxCount: 2 },
    ])),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadM", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    openapi.ApiResponse({ status: 201, type: [Object] }),
    __param(0, (0, decorators_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFiles", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_services_1.AppService,
        dist_1.MailerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map