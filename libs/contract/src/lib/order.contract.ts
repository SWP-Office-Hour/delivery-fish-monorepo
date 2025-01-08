import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const OrderStatus = {
  PENDING: 1,
  PROCESSING: 2,
  SHIPPING: 3,
  DELIVERED: 4,
  CANCELLED: 5,
} as const;

export const OrderSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  sender_name: z.string(),
  sender_phone: z.string(),
  sender_address_id: z.string(),
  receiver_name: z.string(),
  receiver_phone: z.string(),
  receiver_address_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

// export const OrderFishSchema = z.object({
//   id: z.string(),
//   fish_id: z.string(),
//   order_id: z.string(),
// });

export const OrderRequestSchema = z.object({
  sender_name: z.string(),
  sender_phone: z.string(),
  sender_address_id: z.string(),
  receiver_name: z.string(),
  receiver_phone: z.string(),
  receiver_address_id: z.string(),
  fishes: z.array(z.string()),
});

export type OrderType = z.infer<typeof OrderSchema>;
export type OrderRequestType = z.infer<typeof OrderRequestSchema>;

export const orderContract = c.router({
  create: {
    method: 'POST',
    path: '/orders',
    body: OrderRequestSchema,
    responses: {
      201: OrderSchema,
      400: z.object({ message: z.string() }),
    },
  },
  getById: {
    method: 'GET',
    path: '/orders/:id',
    responses: {
      200: OrderSchema,
      404: z.object({ message: z.string() }),
    },
  },
  getAll: {
    method: 'GET',
    path: '/orders',
    responses: {
      200: z.array(OrderSchema),
      404: z.object({ message: z.string() }),
    },
  },
});
