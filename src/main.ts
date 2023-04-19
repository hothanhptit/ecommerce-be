// import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
const fs = require('fs');

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/privatekey.key'),
//   cert: fs.readFileSync('./secrets/certificate.crt'),
// };
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  // app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Ecommerce v1')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('REST API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
