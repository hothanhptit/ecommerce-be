"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mail_entity_1 = require("./services/contact/entities/mail.entity");
const contact_module_1 = require("./services/contact/contact.module");
const contact_entity_1 = require("./services/contact/entities/contact.entity");
const menu_dto_1 = require("./services/others/dto/menu.dto");
const relatedProduct_entity_1 = require("./services/product/entities/relatedProduct.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const typeorm_1 = require("@nestjs/typeorm");
const multer_config_1 = require("./config/multer.config");
const auth_module_1 = require("./services/auth/auth.module");
const user_entity_1 = require("./services/auth/entities/user.entity");
const banner_module_1 = require("./services/banner/banner.module");
const banner_entity_1 = require("./services/banner/entities/banner.entity");
const categories_module_1 = require("./services/categories/categories.module");
const category_entity_1 = require("./services/categories/entities/category.entity");
const customers_module_1 = require("./services/customers/customers.module");
const customer_entity_1 = require("./services/customers/entities/customer.entity");
const news_entity_1 = require("./services/news/entities/news.entity");
const news_module_1 = require("./services/news/news.module");
const others_module_1 = require("./services/others/others.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const product_entity_1 = require("./services/product/entities/product.entity");
const product_module_1 = require("./services/product/product.module");
const services_module_1 = require("./services/services/services.module");
const services_entity_1 = require("./services/services/entities/services.entity");
const main_banner_entiy_1 = require("./services/banner/entities/main-banner.entiy");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thanhh8nt@gmail.com',
        pass: 'evxapcohbecrptzv',
    },
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            banner_module_1.BannerModule,
            categories_module_1.CategoriesModule,
            customers_module_1.CustomersModule,
            news_module_1.NewsModule,
            product_module_1.ProductModule,
            others_module_1.OthersModule,
            contact_module_1.ContactModule,
            contact_module_1.ContactModule,
            services_module_1.ServicesModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'ecommerce.sqlite3',
                entities: [
                    user_entity_1.User,
                    product_entity_1.Product,
                    news_entity_1.News,
                    customer_entity_1.Customer,
                    category_entity_1.Category,
                    banner_entity_1.Banner,
                    relatedProduct_entity_1.RelatedProduct,
                    menu_dto_1.Menu,
                    contact_entity_1.Contact,
                    mail_entity_1.Mail,
                    services_entity_1.Service,
                    main_banner_entiy_1.MainBanner
                ],
                synchronize: true,
                cache: {
                    duration: 30 * 60000,
                },
            }),
            multer_1.MulterModule.register(multer_config_1.multerOptions),
            mailer_1.MailerModule.forRoot({
                transport: transporter,
                defaults: {
                    from: '"nest-modules" <user@outlook.com>',
                },
                template: {
                    dir: process.cwd() + 'services/mailer/templates/',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            serve_static_1.ServeStaticModule.forRootAsync({
                useFactory: async () => {
                    return [
                        {
                            rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                            serveRoot: '/' + 'uploads' + '/',
                        },
                        {
                            rootPath: (0, path_1.join)(__dirname, '..', '../' + 'uploads'),
                            serveRoot: '/' + 'uploads' + '/',
                        },
                    ];
                },
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map