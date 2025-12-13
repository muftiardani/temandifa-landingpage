import { z } from "zod";
import { logger } from "./logger";


const envSchema = z.object({
  NEXT_PUBLIC_GA_ID: z.string().min(1, "Google Analytics ID is required"),
  RESEND_API_KEY: z.string().min(1, "Resend API key is required"),
  RESEND_FROM_EMAIL: z.string().email("Invalid sender email"),
  CONTACT_EMAIL: z.string().email("Invalid contact email"),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error("Invalid environment variables", null, "Env");
      error.issues.forEach((issue) => {
        logger.error(`${issue.path.join(".")}: ${issue.message}`, null, "Env");
      });
      
      if (process.env.NODE_ENV === "development") {
        logger.info("Tip: Copy .env.example to .env and fill in the values", null, "Env");
      }
      
      throw new Error("Environment validation failed. Check the errors above.");
    }
    throw error;
  }
}

let validatedEnv: Env | null = null;

if (typeof window === "undefined") {
  try {
    validatedEnv = validateEnv();
    logger.success("Environment variables validated successfully", null, "Env");
  } catch (error) {
    throw error;
  }
}

export function getEnv(): Env {
  if (!validatedEnv) {
    validatedEnv = validateEnv();
  }
  return validatedEnv;
}
