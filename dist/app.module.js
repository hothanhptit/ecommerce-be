"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./services/auth/user.entity");
const app_controller_1 = require("./app.controller");
const app_services_1 = require("./app.services");
const multer_config_1 = require("./config/multer.config");
const auth_module_1 = require("./services/auth/auth.module");
const cart_module_1 = require("./services/cart/cart.module");
const order_module_1 = require("./services/order/order.module");
const product_entity_1 = require("./services/product/product.entity");
const product_module_1 = require("./services/product/product.module");
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
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'ecommerce.sqlite3',
                entities: [user_entity_1.Users, product_entity_1.ProductEntity],
                synchronize: true,
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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_services_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map