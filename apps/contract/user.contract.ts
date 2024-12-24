import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();
export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof User>;

export const user = c.router({
    getAll: {
      method: "GET",
      path: "/api/users",
      responses: {
        200: User.array(),
        // 404: object({ message: string() }),
      }
      ,summary: "Get all users",
    },
    create: {
      method: "POST",
      path: "/api/users",
      body: User,
      responses: {
        200: User.array(),
        // 404: object({ message: string() }),
      },
      summary: "Create a user",
      description: "Create a user with the given data"
    },
    getOne: {
      method: "GET",
      path: "/api/users/:id",
      pathParams: z.object({ id: z.string() }),
      responses: {
        200: User,
        // 404: object({ message: string() }),
      },
      summary: "Get a user by id"
    }

})

