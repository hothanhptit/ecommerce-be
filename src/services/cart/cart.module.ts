import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { Product } from '../product/entities/product.entity';
import { ProductsService } from '../product/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, Product])],
  providers: [CartService, ProductsService],
  controllers: [CartController]
})
export class CartModule { }
