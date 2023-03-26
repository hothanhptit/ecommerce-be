import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../product/product.entity';
import { ProductsService } from '../product/service/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity])],
  providers: [CartService, ProductsService],
  controllers: [CartController]
})
export class CartModule { }
