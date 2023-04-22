import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/entities/category.entity';
import { RelatedProduct } from './entities/relatedProduct.entity';
import { multerOptions } from './../../config/multer.config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogServices } from './../log4js/log4js.service';
import { LoggingModule } from './../log4js/logging.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductInfo } from './entities/product-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, RelatedProduct, ProductInfo, Category]),
    MulterModule.register(multerOptions),
  ],
  providers: [ProductsService, CategoriesService],
  controllers: [ProductsController],
})
export class ProductModule {}
