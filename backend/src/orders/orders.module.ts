import { Module, OnModuleInit } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { seedData } from '../data/seed';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule implements OnModuleInit {
  onModuleInit() {
    seedData();
  }
}