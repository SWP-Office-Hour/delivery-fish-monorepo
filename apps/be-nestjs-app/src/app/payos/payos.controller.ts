import {Body, Controller} from '@nestjs/common';
import { PayosService } from './payos.service';
import {tsRestHandler, TsRestHandler} from "@ts-rest/nest";
import {payosContract, PayosCreateRequest} from "@delivery-fish-monorepo/contract";
import {CheckoutRequestType} from "@payos/node/lib/type";

@Controller()
export class PayosController {
  constructor(private readonly payosService: PayosService) {}

  @TsRestHandler(payosContract.create)
  async create(@Body() body: PayosCreateRequest) {
    return tsRestHandler(payosContract.create, async ({ body }) => {
      body.orderCode = Number(String(Date.now()).slice(-6));
      const payOsCreateRequest = body as CheckoutRequestType;
      payOsCreateRequest.returnUrl = `http://localhost:3000/payos/${body.orderCode}/return`;
      payOsCreateRequest.cancelUrl = `http://localhost:3000/payos/${body.orderCode}/cancel`;
      const payOsCreateResponse = await this.payosService.createLinkPayment(payOsCreateRequest);
      return { status: 201, body: payOsCreateResponse };
    });
  }

}
