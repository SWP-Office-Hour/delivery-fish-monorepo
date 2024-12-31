import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userContract = c.router({
  getAll: {
    method: 'GET',
    path: '/users',
    responses: {
      200: userSchema.array(),
      // 404: object({ message: string() }),
    },
    summary: 'Get all users',
  },
  create: {
    method: 'POST',
    path: '/users',
    body: userSchema,
    responses: {
      200: userSchema.array(),
      // 404: object({ message: string() }),
    },
    summary: 'Create a user',
    description: 'Create a user with the given data',
  },
  getOne: {
    method: 'GET',
    path: '/users/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: userSchema,
      // 404: object({ message: string() }),
    },
    summary: 'Get a user by id',
  },
});
