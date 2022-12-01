import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('index/index')
  @Get()
  getHello():any {
    return {message: 'Hello'}
  }

  @Post()
  Dialog(@Body() texto:any){
    return this.appService.getDialog(texto)
  }
  
}
