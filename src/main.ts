import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './utils/CONSTANTS';
import { Logger } from './utils/ConsoleLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cross Chronicle API')
    .setDescription('Main Cross Chronicle API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(PORT);
  Logger.verbose(`Application is running on: ${PORT}`);
}
bootstrap();
