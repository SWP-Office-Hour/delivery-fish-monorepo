import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const Test = z.object({
  id: z.string(),
})

export type Test = z.infer<typeof Test>;

export const test = c.router(
  {
    getAll: {
      method: "GET",
      path: "/api/tests",
      responses: {
        200: Test.array(),
        // 404: object({ message: string() }),
      }
    }
  }
)
