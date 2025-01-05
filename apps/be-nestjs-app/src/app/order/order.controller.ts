import { Body, Controller, Param, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import {
  orderContract,
  OrderRequestType,
} from '@delivery-fish-monorepo/contract';
import { RequestWithJWT } from 'express';
import { AccessTokenAuthGuard } from '../auth/auth.guard';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AccessTokenAuthGuard)
  @TsRestHandler(orderContract.create)
  async createOrder(
    @Body() body: OrderRequestType,
    @Req() req: RequestWithJWT
  ) {
    return tsRestHandler(orderContract.create, async () => {
      const order = await this.orderService.createOrder({
        createOrderDto: body,
        customer_id: req.decoded_authorization.user_id,
      });
      return { status: 201, body: order };
    });
  }

  @TsRestHandler(orderContract.getAll)
  async getAllOrders() {
    return tsRestHandler(orderContract.getAll, async () => {
      const orders = await this.orderService.getAllOrders();
      return { status: 200, body: orders };
    });
  }

  @TsRestHandler(orderContract.getById)
  async getOrderById(@Param('id') id: string) {
    return tsRestHandler(orderContract.getById, async () => {
      const order = await this.orderService.getOrderById(id);
      return { status: 200, body: order };
    });
  }
}
