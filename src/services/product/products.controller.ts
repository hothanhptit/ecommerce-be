import { multerOptions } from '../../config/multer.config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  async Create(
    @Request() req,
    @Body() product: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    return await this.productsService.create(product, file, req.user);
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
