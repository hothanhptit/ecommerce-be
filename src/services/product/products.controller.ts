import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { ApiMultiFile } from './../../utils/multiFiles.swagger';
import { multerOptions } from '../../config/multer.config';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
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
  async GetAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Product>> {
    limit = limit > 100 ? 100 : limit;
    return await this.productsService.getAll({
      page,
      limit,
      route: process.env.host || 'http://localhost:4000' + '/api/v1/products',
    });
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
  ) {
    return await this.productsService.create(
      product,
      files,
      req.body.related,
      req.user,
    );
  }

  @Get(':id')
  async GetOne(@Param() id: any) {
    return await this.productsService.getOne(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'productImages', maxCount: 5 }]),
  )
  async Update(
    @Param() id: any,
    @Body() product: ProductDTO,
    @UploadedFiles()
    files: {
      productImages?: Express.Multer.File[];
    },
    @Request() req,
  ): Promise<Product> {
    return await this.productsService.update(
      id.id,
      product,
      req.body.related,
      files,
      req.user,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
