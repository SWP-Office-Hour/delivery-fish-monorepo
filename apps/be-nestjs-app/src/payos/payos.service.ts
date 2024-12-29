import { Injectable } from '@nestjs/common';
import PayOS from "@payos/node";
import {CheckoutRequestType} from "@payos/node/lib/type";
require('dotenv').config();

@Injectable()
export class PayosService {
  async createLinkPayment(payosCreateRequest: CheckoutRequestType) {
    const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);
    return await payOS.createPaymentLink(payosCreateRequest);
  }
}
