import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://user-cart-task.netlify.app',
      'http://user-cart-task.netlify.app'

    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  console.log(process.env.NODE_ENV)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
