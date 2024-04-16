import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('coffee-bean-API')
    .setDescription('description')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // const config2 = new DocumentBuilder()
  //   .setTitle('coffee-bean-API')
  //   .setDescription('description')
  //   .setVersion('1.0')
  //   .addTag('tag')
  //   .build();
  // const document2 = SwaggerModule.createDocument(app, config2);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.use(cookieParser);
  await app.listen(process.env.PORT);
}
bootstrap();
