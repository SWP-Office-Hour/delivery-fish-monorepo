import { Injectable } from '@nestjs/common';
import { OrderRequestType } from '@delivery-fish-monorepo/contract';
import { DatabaseService } from '../database/database.service';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrder({
    createOrderDto,
    customer_id,
  }: {
    createOrderDto: OrderRequestType;
    customer_id: string;
  }) {
    const order = new OrderEntity(createOrderDto);
    order.customer_id = customer_id;
    order.id = 'order-1';
    const result = await this.databaseService.Order.create({
      data: order,
    });
    return order;
  }

  async getAllOrders() {
    return await this.databaseService.Order.findMany();
  }

  async getOrderById(id: string) {
    return await this.databaseService.Order.findUnique({
      where: { id },
    });
  }
}
