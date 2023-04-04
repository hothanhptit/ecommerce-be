import { ApiMultiFile } from './../../utils/multiFiles.swagger';
import { multerOptions } from '../../config/multer.config';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async GetAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('productImages')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          format: 'string',
        },
        productImages: {
          type: 'string',
          format: 'binary',
        },
        sumary: {
          type: 'string',
          format: 'string',
        },
        price: {
          type: 'string',
          format: 'string',
        },
        description: {
          type: 'string',
          format: 'string',
        },
        descriptionImages: {
          type: 'string',
          format: 'binary',
        },
        specs: {
          type: 'string',
          format: 'string',
        },
        specsImages: {
          type: 'string',
          format: 'binary',
        },
        detailsDescription: {
          type: 'string',
          format: 'string',
        },
        categoryId: {
          type: 'string',
          format: 'string',
        },
        type: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'productImages', maxCount: 5 },
      { name: 'descriptionImages', maxCount: 5 },
      { name: 'specsImages', maxCount: 5 },
    ]),
  )
  async Create(
    @Request() req,
    @Body() product: ProductDTO,
    // @UploadedFiles() specsImages: Array<Express.Multer.File>,
    // @UploadedFiles() descriptionImages: Array<Express.Multer.File>,
    @UploadedFiles()
    files: {
      productImages?: Express.Multer.File[];
      descriptionImages?: Express.Multer.File[];
      specsImages?: Express.Multer.File[];
    },
  ): Promise<Product> {
    return await this.productsService.create(product, files, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOne(@Param() id: number): Promise<Product> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: Product,
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
