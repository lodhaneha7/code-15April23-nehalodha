import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthParametersSchema } from './mongodb-schema/health.parameters';
import { BmiService } from './services/bmi.service';

@Module({
  imports: [   MongooseModule.forRoot('mongodb+srv://lodhane:4BDlnlOU7gEV6hZo@cluster0.qfednqr.mongodb.net/test', {
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  }), MongooseModule.forFeature([
    {collection:'health-parameters',name:'HealthParameters',schema:HealthParametersSchema}
  ])],
  controllers: [AppController],
  providers: [AppService,BmiService],
})
export class AppModule {}
