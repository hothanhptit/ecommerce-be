import { multerOptions } from './config/multer.config';
import { AppService } from './app.services';
import { AppController } from './app.controller';
import { Users } from 'src/services/auth/user.entity';
import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './services/order/order.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductEntity } from './services/product/product.entity';
import { ProductModule } from './services/product/product.module';
import { CartModule } from './services/cart/cart.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ecommerce.sqlite3',
      // host: '127.0.0.1',
      // port: 3306,
      // username: 'root',
      // password: '18162000THTT',
      // database: 'ecommerce',
      // entities: [__dirname + '/**/*.entity{.ts}'],
      entities: [Users, ProductEntity],
      synchronize: true,
    }),
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './uploads',
    //   }),
    // }),
    MulterModule.register(multerOptions),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
