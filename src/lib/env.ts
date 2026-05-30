import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Add other required env vars here
  // NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
