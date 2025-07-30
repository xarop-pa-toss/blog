import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.criarBG()
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-image: url('/bg-images/bg.png');
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              min-height: 100vh;
            }
          </style>
        </head>
        <body>
          <h1 style="color:white">${this.appService.getHello()}</h1>
        </body>
      </html>
    `;
  }
}
