import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export enum UserRole {
  ADMIN,
  SHIPPER,
  MEDICAL,
  MANAGER,
  CUSTOMER,
  USER,
}

// Định nghĩa Status enum
export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  BANNED = 3,
}

// Tạo Zod schema cho role và status
export const UserRoleSchema = z.nativeEnum(UserRole);
export const StatusEnum = z.nativeEnum(UserStatus);

// Tạo schema cho việc transform số sang role

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  role: UserRoleSchema,
  status: StatusEnum,
});

export const UserTeamSchema = z.object({
  id: z.string(),
  team_id: z.string().nullable(),
  user_id: z.string(),
  status: z.number(),
  leave_at: z.date().nullable(),
  added_to_team_at: z.date(),
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

const refreshTokenReqSchema = z.object({
  user_id: z.string().min(1, 'User ID is required'),
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
export type RefreshTokenRequest = z.infer<typeof refreshTokenReqSchema>;

// Contract
export const authContract = c.router({
  register: {
    method: 'POST',
    path: '/users/auth/register',
    body: registerSchema,
    responses: {
      200: authResponseSchema,
      400: messageResponseSchema,
      401: messageResponseSchema,
    },
  },
  login: {
    method: 'POST',
    path: '/users/auth/login',
    body: loginSchema,
    responses: {
      200: authResponseSchema,
      401: messageResponseSchema,
    },
  },
  logout: {
    method: 'POST',
    path: '/users/auth/logout',
    body: tokenSchema,
    responses: {
      200: messageResponseSchema,
      401: messageResponseSchema,
    },
  },
  refreshToken: {
    method: 'POST',
    path: '/users/auth/refresh',
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

