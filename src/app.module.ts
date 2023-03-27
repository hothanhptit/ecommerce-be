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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thanhh8nt@gmail.com',
    pass: 'evxapcohbecrptzv'
  }
});
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

    MailerModule.forRoot({
      // transport: {
      //   host: process.env.EMAIL_HOST,
      //   port: +process.env.EMAIL_PORT,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: process.env.EMAIL_ID, // generated ethereal user
      //     pass: process.env.EMAIL_PASS, // generated ethereal password
      //   },
      // },
      transport: transporter,
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + 'services/mailer/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
