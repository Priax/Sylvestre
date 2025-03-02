import { Controller, Get, Query } from '@nestjs/common';
import { RustServiceClient } from './rust.service';

@Controller()
export class AppController {
  constructor(private readonly rustService: RustServiceClient) {}

  @Get('hello')
  async getHello(@Query('name') name: string): Promise<string> {
    return this.rustService.sayHello(name);  // Appel de la méthode gRPC SayHello
  }

  @Get('goodbye')
  async getGoodbye(@Query('name') name: string): Promise<string> {
    return this.rustService.sayGoodbye(name);  // Appel de la méthode gRPC SayGoodbye
  }
}

