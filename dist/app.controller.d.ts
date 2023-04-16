/// <reference types="multer" />
import { AppService } from './app.services';
import { Express } from 'express';
import { MailerService } from '@nestjs-modules/mailer/dist';
export declare class AppController {
    private readonly appService;
    private readonly mailerService;
    constructor(appService: AppService, mailerService: MailerService);
    uploadFile(files: Express.Multer.File): Promise<{
        files: Express.Multer.File;
    }>;
    uploadM(files: {
        avatar?: Express.Multer.File[];
        background?: Express.Multer.File[];
    }): {
        avatar?: Express.Multer.File[];
        background?: Express.Multer.File[];
    };
    uploadFiles(files: Array<Express.Multer.File>): Promise<Express.Multer.File[]>;
}
