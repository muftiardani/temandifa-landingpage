import { logger } from "@/lib/logger";

export async function withTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs = 10000,
  operationName = "Operation"
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([operation(), timeoutPromise]);
  } catch (error) {
    if (error instanceof Error && error.message.includes("timed out")) {
      logger.error(`${operationName} timeout`, error, "Timeout");
    }
    throw error;
  }
}

export const EMAIL_TIMEOUT_MS = 10000;
