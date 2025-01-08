import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  manager_id: z.string(),
  post_name: z.string(),
  country: z.string(),
  status: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
