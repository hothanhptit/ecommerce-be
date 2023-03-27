import { multerOptions } from './../../../config/multer.config';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProductsService } from '../service/products.service';
import { ProductEntity } from '../product.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
} from '@nestjs/common/pipes';
import { HttpStatus } from '@nestjs/common/enums';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',
      // {
      //   storage: diskStorage({
      //     destination: './uploads',
      //     filename: (req, file, cb) => {
      //       const randomName = Array(32)
      //         .fill(null)
      //         .map(() => Math.round(Math.random() * 16).toString(16))
      //         .join('');
      //       cb(null, `${randomName}${extname(file.originalname)}`);
      //     },
      //   }),
      // }
      multerOptions,
    ),
  )
  async Create(
    @Request() req,
    @Body() product: ProductEntity,
    @UploadedFile() file,
  ): Promise<ProductEntity> {
    console.log('====================================');
    console.log(file);
    console.log('====================================');

    return await this.productsService.create(product, file, req.user);
  }
  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async Create(
  //   @Request() req,
  //   @Body() product: ProductEntity,
  //   @UploadedFile() file,
  // ): Promise<ProductEntity> {
  //   console.log('====================================');
  //   console.log(file);
  //   console.log('====================================');

  //   return await this.productsService.create(product, file, req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
