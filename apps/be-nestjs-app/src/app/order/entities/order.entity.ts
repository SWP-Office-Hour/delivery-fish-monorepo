import { OrderType } from '@delivery-fish-monorepo/contract';

export class OrderEntity {
  id: string;
  customer_id: string;
  sender_name: string;
  sender_phone: string;
  sender_address_id: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_address_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(orderData: OrderType) {
    this.id = orderData.id;
    this.customer_id = orderData.customer_id;
    this.sender_name = orderData.sender_name;
    this.sender_phone = orderData.sender_phone;
    this.sender_address_id = orderData.sender_address_id;
    this.receiver_name = orderData.receiver_name;
    this.receiver_phone = orderData.receiver_phone;
    this.receiver_address_id = orderData.receiver_address_id;
    this.created_at = orderData.created_at || new Date();
    this.updated_at = orderData.updated_at || new Date();
  }
}
