// libs/contract/src/lib/address.contract.ts
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// Base Schema
export const AddressSchema = z.object({
  id: z.string(),
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  ward: z.string().min(1, 'Ward is required'),
  address_detail: z.string().min(1, 'Address detail is required'),
  created_at: z.string(),
  updated_at: z.string(),
});

// Create Schema (không có id và timestamps)
export const CreateAddressSchema = AddressSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Update Schema (tất cả fields optional)
export const UpdateAddressSchema = CreateAddressSchema.partial();

// Contract
export const addressContract = c.router({
  create: {
    method: 'POST',
    path: '/addresses',
    responses: {
      201: AddressSchema,
      400: z.object({ message: z.string() }),
    },
    body: CreateAddressSchema,
    summary: 'Create new address',
  },

  getAll: {
    method: 'GET',
    path: '/addresses',
    responses: {
      200: z.array(AddressSchema),
    },
    summary: 'Get all addresses',
  },

  update: {
    method: 'PUT',
    path: '/addresses/:id',
    responses: {
      200: AddressSchema,
      404: z.object({ message: z.string() }),
    },
    body: UpdateAddressSchema,
    summary: 'Update address',
  },

  getById: {
    method: 'GET',
    path: '/addresses/:id',
    responses: {
      200: AddressSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get address by id',
  },

  delete: {
    method: 'DELETE',
    path: '/addresses/:id',
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete address',
  },
});

// Export types
export type AddressType = z.infer<typeof AddressSchema>;
export type CreateAddressRequest = z.infer<typeof CreateAddressSchema>;
export type UpdateAddressRequest = z.infer<typeof UpdateAddressSchema>;
