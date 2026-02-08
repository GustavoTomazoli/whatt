import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string().min(8),
  APP_FEE_PERCENT: z.coerce.number().min(0).max(100).default(10),
});

export const env = envSchema.parse(process.env);
