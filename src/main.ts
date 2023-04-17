import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: '*',
    },
  });
  
  app.enableCors();
  await app.listen(5000); 
}

bootstrap();


