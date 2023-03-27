import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';
import { CartEntity } from '../cart/cart.entity';
import { CartService } from '../cart/service/cart.service';
import { ProductsService } from '../product/service/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity])],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductsService]
})
export class OrderModule { }
