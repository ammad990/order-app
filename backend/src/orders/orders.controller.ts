import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post('orders')
  create(@Body() body: any) {
    return this.service.createOrder(body);
  }

  @Get('menu')
  getMenu() {
    return this.service.getMenu();
  }

  @Get('student')
  getStudent() {
    return this.service.getStudent();
  }

  @Get('parent')
  getParent() {
    return this.service.getParent();
  }
}