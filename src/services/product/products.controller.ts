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
import { filter } from 'rxjs';
@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async GetAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(16), ParseIntPipe) limit: number = 16,
    @Query('orderBy') orderBy: string = 'created_at',
    @Query('filter') filter: string = '',
  ): Promise<Pagination<Product>> {
    limit = limit > 100 ? 100 : limit;
    return await this.productsService.getAll(
      {
        page,
        limit,
        route: process.env.host || 'http://localhost:4000' + '/api/v1/products',
      },
      orderBy,
      filter
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('images')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          format: 'string',
        },
        images: {
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
      { name: 'images', maxCount: 15 },
      { name: 'descriptionImages', maxCount: 15 },
      { name: 'specsImages', maxCount: 15 },
      { name: 'catalogue', maxCount: 5 },
    ]),
  )
  async Create(
    @Request() req,
    @Body() product: ProductDTO,
    // @UploadedFiles() specsImages: Array<Express.Multer.File>,
    // @UploadedFiles() descriptionImages: Array<Express.Multer.File>,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      descriptionImages?: Express.Multer.File[];
      specsImages?: Express.Multer.File[];
      catalogue?: Express.Multer.File[];
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
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]),
  )
  async Update(
    @Param() id: any,
    @Body() product: ProductDTO,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
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
