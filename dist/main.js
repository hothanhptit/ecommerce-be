"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const dist_1 = require("@nestjs/swagger/dist");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce v1')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('REST API')
        .addBearerAuth()
        .build();
    const document = dist_1.SwaggerModule.createDocument(app, options);
    dist_1.SwaggerModule.setup('api', app, document);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map