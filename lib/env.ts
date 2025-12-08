import { z } from "zod";

const envSchema = z.object({
  // Google Analytics
  NEXT_PUBLIC_GA_ID: z
    .string()
    .min(1, "Google Analytics ID is required")
    .startsWith("G-", "GA ID must start with G-"),

  // Email Service (Resend)
  RESEND_API_KEY: z
    .string()
    .min(1, "Resend API key is required")
    .startsWith("re_", "Invalid Resend API key format")
    .optional(),

  // Node Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function validateEnv() {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((err) => {
        return `  - ${err.path.join(".")}: ${err.message}`;
      });

      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\n` +
          `Please check your .env file and ensure all required variables are set.\n` +
          `See .env.example for reference.`
      );
    }
    throw error;
  }
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
