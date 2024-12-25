import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const Chat = z.object({
  id: z.string(),
  message: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export  const SendMess = z.object({
  username: z.string(),
  message: z.string(),
  timestamp: z.date(),
})

export const JoinChat = z.object({
  username: z.string(),
})

export const Room = z.object({
  id: z.string()
})



export type SendMess = z.infer<typeof SendMess>;
export type Chat = z.infer<typeof Chat>;
export type JoinChat = z.infer<typeof JoinChat>;
export type Room = z.infer<typeof Room>;
