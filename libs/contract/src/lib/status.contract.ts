import { z } from 'zod';

export const OrderStatusSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  team_id: z.string(),
  status_description: z.number(),
  media_url: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type OrderStatusType = z.infer<typeof OrderStatusSchema>;
