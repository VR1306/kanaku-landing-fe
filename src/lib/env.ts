import "server-only";
import { z } from "zod";

const optionalString = z.preprocess((v) => (v === "" ? undefined : v), z.string().optional());

const envSchema = z.object({
  LANDING_API_URL: z.preprocess((v) => (v === "" ? undefined : v), z.url().optional()),
  LANDING_API_TOKEN: optionalString,
  API_TIMEOUT_MS: z.coerce.number().int().min(100).max(60_000).default(8000),
  REVALIDATE_SECRET: z.preprocess((v) => (v === "" ? undefined : v), z.string().min(16).optional()),
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.url().default("http://localhost:3000"),
  ),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/** Server-only, validated environment access. Throws early on misconfiguration. */
export function getEnv(): Env {
  if (!cached) {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      throw new Error(`Invalid environment configuration: ${z.prettifyError(parsed.error)}`);
    }
    cached = parsed.data;
  }
  return cached;
}
