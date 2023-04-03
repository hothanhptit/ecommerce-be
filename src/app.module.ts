import { User } from './services/auth/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.services';
import { multerOptions } from './config/multer.config';
import { AuthModule } from './services/auth/auth.module';
import { CartModule } from './services/cart/cart.module';
import { OrderModule } from './services/order/order.module';
import { Product } from './services/product/entities/product.entity';
import { ProductModule } from './services/product/product.module';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thanhh8nt@gmail.com',
    pass: 'evxapcohbecrptzv',
  },
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
      entities: [User, Product],
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

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
