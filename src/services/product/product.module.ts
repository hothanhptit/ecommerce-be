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

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, RelatedProduct]),
    MulterModule.register(multerOptions),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductModule {}
