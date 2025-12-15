import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Nama hanya boleh berisi huruf, spasi, tanda hubung, dan apostrof"
    ),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .toLowerCase()
    .trim(),
  subject: z
    .string()
    .min(5, "Subjek minimal 5 karakter")
    .max(200, "Subjek maksimal 200 karakter")
    .trim(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter")
    .trim(),
  website: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .toLowerCase()
    .trim(),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    errors[path] = issue.message;
  });
  
  return errors;
}

export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) };
    }
    throw error;
  }
}
