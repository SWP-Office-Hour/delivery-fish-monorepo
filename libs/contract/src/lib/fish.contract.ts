import { z } from 'zod';
import { initContract } from '@ts-rest/core';

export const FishSchema = z.object({
  id: z.string(),
  weight: z.number(),
  length: z.number(),
  breed: z.string(),
  Note: z.string(),
  media_url: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  status: z.number(),
});

export const FishRequestSchema = FishSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  status: true,
});

const c = initContract();

export type FishType = z.infer<typeof FishSchema>;

export const fishContract = c.router({
  create: {
    method: 'POST',
    path: '/fishes',
    body: FishRequestSchema,
    responses: {
      201: FishSchema,
      400: z.object({ message: z.string() }),
    },
  },
  getById: {
    method: 'GET',
    path: '/fishes/:id',
    responses: {
      200: FishSchema,
      404: z.object({ message: z.string() }),
    },
  },
  getAll: {
    method: 'GET',
    path: '/fishes',
    responses: {
      200: z.array(FishSchema),
      404: z.object({ message: z.string() }),
    },
  },
});
