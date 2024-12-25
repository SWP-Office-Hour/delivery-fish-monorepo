import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const testSchema = z.object({
  id: z.string(),
});

export type Test = z.infer<typeof testSchema>;

export const testContract = c.router({
  getAll: {
    method: 'GET',
    path: '/tests',
    responses: {
      200: testSchema.array(),
      // 404: object({ message: string() }),
    },
  },
});
