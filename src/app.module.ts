import { Mail } from './services/contact/entities/mail.entity';
import { ContactModule } from './services/contact/contact.module';
import { Contact } from './services/contact/entities/contact.entity';
import { Menu } from './services/others/dto/menu.dto';
import { RelatedProduct } from './services/product/entities/relatedProduct.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.services';
import { multerOptions } from './config/multer.config';
import { AuthModule } from './services/auth/auth.module';
import { User } from './services/auth/entities/user.entity';
import { BannerModule } from './services/banner/banner.module';
import { Banner } from './services/banner/entities/banner.entity';
import { CategoriesModule } from './services/categories/categories.module';
import { Category } from './services/categories/entities/category.entity';
import { CustomersModule } from './services/customers/customers.module';
import { Customer } from './services/customers/entities/customer.entity';
import { News } from './services/news/entities/news.entity';
import { NewsModule } from './services/news/news.module';
import { OthersModule } from './services/others/others.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Product } from './services/product/entities/product.entity';
import { ProductModule } from './services/product/product.module';
import { ServicesModule } from './services/services/services.module';
import { Service } from './services/services/entities/services.entity';
import { MainBanner } from './services/banner/entities/main-banner.entiy';
import { ProductInfo } from './services/product/entities/product-info.entity';
const nodemailer = require('nodemailer');
// import { CartModule } from './services/cart/cart.module';
// import { OrderModule } from './services/order/order.module';

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
    BannerModule,
    CategoriesModule,
    CustomersModule,
    NewsModule,
    ProductModule,
    OthersModule,
    ContactModule,
    ContactModule,
    ServicesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ecommerce.sqlite3',
      // host: '127.0.0.1',
      // port: 3306,
      // username: 'root',
      // password: '18162000THTT',
      // database: 'ecommerce',
      // entities: [__dirname + '/**/*.entity{.ts}'],
      entities: [
        User,
        Product,
        News,
        Customer,
        Category,
        Banner,
        RelatedProduct,
        Menu,
        Contact,
        Mail,
        Service,
        MainBanner,
        ProductInfo
      ],
      synchronize: true,
      cache: {
        duration: 30 * 60000, // 30 seconds
      },
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

    ServeStaticModule.forRootAsync({
      useFactory: async () => {
        return [
          {
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/' + 'uploads' + '/',
          },
          {
            rootPath: join(__dirname, '..', '../' + 'uploads'), // added ../ to get one folder back. Default nest looking in dist dir(built ver)
            serveRoot: '/' + 'uploads' + '/', //last slash was important
          },
        ];
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
