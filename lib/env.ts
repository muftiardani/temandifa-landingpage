import { z } from "zod";
import { logger } from "./logger";

const baseEnvSchema = z.object({
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional().or(z.literal("")),
  CONTACT_EMAIL: z.string().email().optional().or(z.literal("")),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  CSRF_SECRET: z.string().optional(),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
});

const productionEnvSchema = baseEnvSchema.extend({
  RESEND_API_KEY: z.string().min(1, "Resend API key is required in production"),
  RESEND_FROM_EMAIL: z
    .string()
    .email("Valid sender email required in production"),
  CONTACT_EMAIL: z.string().email("Valid contact email required in production"),

  CSRF_SECRET: z
    .string()
    .min(32, "CSRF_SECRET must be at least 32 characters in production"),
});

function getEnvSchema() {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return productionEnvSchema;
  }

  return baseEnvSchema;
}

export function validateProductionEnv(): void {
  if (process.env.NODE_ENV === "production") {
    const csrfSecret = process.env.CSRF_SECRET;
    if (!csrfSecret || csrfSecret.length < 32) {
      throw new Error(
        "CSRF_SECRET is required in production and must be at least 32 characters. " +
          "Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
      );
    }

    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      logger.warn(
        "Redis is recommended for production rate limiting",
        null,
        "Env"
      );
    }

    if (!process.env.NEXT_PUBLIC_GA_ID) {
      logger.warn(
        "Google Analytics ID not set - analytics will be disabled",
        null,
        "Env"
      );
    }
  }
}

export type Env = z.infer<typeof productionEnvSchema>;

export function validateEnv(): Env {
  const schema = getEnvSchema();

  try {
    return schema.parse(process.env) as Env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const isProduction = process.env.NODE_ENV === "production";

      if (isProduction) {
        logger.error("Invalid environment variables", null, "Env");
        error.issues.forEach((issue) => {
          logger.error(
            `${issue.path.join(".")}: ${issue.message}`,
            null,
            "Env"
          );
        });
        throw new Error(
          "Environment validation failed. Check the errors above."
        );
      } else {
        logger.warn(
          "Some environment variables are not set. Some features may be disabled.",
          null,
          "Env"
        );
        error.issues.forEach((issue) => {
          logger.debug(
            `${issue.path.join(".")}: ${issue.message}`,
            null,
            "Env"
          );
        });

        logger.info(
          "Tip: Copy .env.example to .env and fill in the values for full functionality",
          null,
          "Env"
        );

        return process.env as unknown as Env;
      }
    }
    throw error;
  }
}

let validatedEnv: Env | null = null;

if (typeof window === "undefined") {
  try {
    validatedEnv = validateEnv();
    if (process.env.NODE_ENV === "production") {
      logger.success(
        "Environment variables validated successfully",
        null,
        "Env"
      );
    }
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
