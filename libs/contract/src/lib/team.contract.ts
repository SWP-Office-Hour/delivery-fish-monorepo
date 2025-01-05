import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string(),
  post_id: z.string().nullable(),
  status: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
