import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Test Paths')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('throw')
  throwError(): string {
    throw new HttpException({ message: 'Sample Error' }, 500);
  }
}
