import { multerOptions } from './config/multer.config';
import { AppService } from './app.services';
import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { compessImg } from './utils/convertFile.ultis';
import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';
const sharp = require('sharp');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    v2.config({
      cloud_name: 'thanhh8nt',
      api_key: '497182279275317',
      api_secret: '1Z6LCdH9opFMOymLO7SNxJWe898',
    });
  }

  @Get()
  sayHello() {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await compessImg(file.path, file.path);
    return {
      file: (
        process.env.HOST || 'http://localhost:4000/' + file.filename
      ).replace(/\\\\/g, '/'),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return {
      file,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      file: file.buffer.toString(),
    };
  }

  @Post('files')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: new CloudinaryStorage({
        cloudinary: v2,
        params: {
          // folder: 'uploads',
          format: async (req: any, file: any) => 'png',
          public_id: (req: any, file: any) => uuidv4(),
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto', quality: 'auto' },
          ],
        } as unknown,
      }),
    }),
  )
  async uploadFile1(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { url: file.path };
  }
}
