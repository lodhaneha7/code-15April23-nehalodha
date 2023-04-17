import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: '*',
    },
  });
  
  app.enableCors();
  await app.listen(5000);
   const apiService = app.get(AppService);
   try {
     await apiService.calculateHealthParams();
     //console.log('API call succeeded on startup');
   } catch (error) {
     console.log('API call failed on startup:', error);
   }
 
}

bootstrap();


