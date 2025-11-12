// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  URL_SERVER_VENTAS: z.string().url(),
});

export const env = envSchema.parse({
  URL_SERVER_VENTAS: process.env.URL_SERVER_VEN,
  NODE_ENV: process.env.NODE_ENV,
});
