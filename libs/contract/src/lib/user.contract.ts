import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export const UserStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'BANNED']);

export type UserStatus = z.infer<typeof UserStatusSchema>;

export const UserRoleSchema = z.enum([
  'ADMIN',
  'SHIPPER',
  'MEDICAL',
  'MANAGER',
  'CUSTOMER',
  'USER',
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  role: UserRoleSchema,
  status: UserStatusSchema,
});

export type UserType = z.infer<typeof userSchema>;

const c = initContract();

// Schemas
const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

const loginSchema = z.object({
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(1, 'Password is required'),
});

const tokenSchema = z.object({
  refresh_token: z.string().min(1, 'Refresh token is required'),
});

// Response schemas
const authResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
  }),
});

const messageResponseSchema = z.object({
  message: z.string(),
});

// Types
export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type TokenRequest = z.infer<typeof tokenSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

// Contract
export const authContract = c.router({
  register: {
    method: 'POST',
    path: '/auth/register',
    body: registerSchema,
    responses: {
      201: authResponseSchema,
      400: messageResponseSchema,
    },
  },
  login: {
    method: 'POST',
    path: '/auth/login',
    body: loginSchema,
    responses: {
      200: authResponseSchema,
      401: messageResponseSchema,
    },
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    body: tokenSchema,
    responses: {
      200: messageResponseSchema,
      401: messageResponseSchema,
    },
  },
  refreshToken: {
    method: 'POST',
    path: '/auth/refresh',
    body: tokenSchema,
    responses: {
      200: authResponseSchema,
      401: messageResponseSchema,
    },
  },
});
//
// export const userContract = c.router({
//   getAll: {
//     method: 'GET',
//     path: '/users',
//     responses: {
//       200: userSchema.array(),
//       // 404: object({ message: string() }),
//     },
//     summary: 'Get all users',
//   },
//   create: {
//     method: 'POST',
//     path: '/users',
//     body: userSchema,
//     responses: {
//       200: userSchema.array(),
//       // 404: object({ message: string() }),
//     },
//     summary: 'Create a user',
//     description: 'Create a user with the given data',
//   },
//   getOne: {
//     method: 'GET',
//     path: '/users/:id',
//     pathParams: z.object({ id: z.string() }),
//     responses: {
//       200: userSchema,
//       // 404: object({ message: string() }),
//     },
//     summary: 'Get a user by id',
//   },
// });

