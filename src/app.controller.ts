import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponseHandlerParams } from './interface/response.handler.interface';


@Controller('health-parameters')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/calculate')
  @HttpCode(HttpStatus.OK)
  public async calculateHealthParams(): Promise<IResponseHandlerParams> {
    return await this.appService.calculateHealthParams();
  }

}


