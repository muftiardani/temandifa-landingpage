import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  contactFormSchema,
  newsletterSchema,
  safeValidate,
} from "@/lib/validation/schemas";

describe("Validation Schemas", () => {
  describe("contactFormSchema", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message that is long enough.",
    };

    it("should validate correct data", () => {
      const result = contactFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    describe("name validation", () => {
      it("should reject name shorter than 2 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: "J",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toContain("name");
        }
      });

      it("should reject name longer than 100 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: "A".repeat(101),
        });

        expect(result.success).toBe(false);
      });

      it("should reject name with special characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: "John<script>",
        });

        expect(result.success).toBe(false);
      });

      it("should accept name with hyphens and apostrophes", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          name: "Mary-Jane O'Connor",
        });

        expect(result.success).toBe(true);
      });
    });

    describe("email validation", () => {
      it("should reject invalid email format", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          email: "not-an-email",
        });

        expect(result.success).toBe(false);
      });

      it("should accept valid email", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          email: "user@domain.co.id",
        });

        expect(result.success).toBe(true);
      });

      it("should transform email to lowercase", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          email: "USER@DOMAIN.COM",
        });

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.email).toBe("user@domain.com");
        }
      });
    });

    describe("subject validation", () => {
      it("should reject subject shorter than 5 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          subject: "Hi",
        });

        expect(result.success).toBe(false);
      });

      it("should reject subject longer than 200 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          subject: "A".repeat(201),
        });

        expect(result.success).toBe(false);
      });
    });

    describe("message validation", () => {
      it("should reject message shorter than 10 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          message: "Short",
        });

        expect(result.success).toBe(false);
      });

      it("should reject message longer than 1000 characters", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          message: "A".repeat(1001),
        });

        expect(result.success).toBe(false);
      });
    });

    describe("honeypot field", () => {
      it("should accept empty website field (honeypot)", () => {
        const result = contactFormSchema.safeParse({
          ...validData,
          website: "",
        });

        expect(result.success).toBe(true);
      });

      it("should accept undefined website field", () => {
        const result = contactFormSchema.safeParse(validData);

        expect(result.success).toBe(true);
      });
    });
  });

  describe("newsletterSchema", () => {
    it("should validate correct email", () => {
      const result = newsletterSchema.safeParse({
        email: "test@example.com",
      });

      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = newsletterSchema.safeParse({
        email: "invalid",
      });

      expect(result.success).toBe(false);
    });

    it("should transform email to lowercase and trim", () => {
      const result = newsletterSchema.safeParse({
        email: "USER@DOMAIN.COM",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("user@domain.com");
      }
    });
  });

  describe("safeValidate", () => {
    const testSchema = z.object({
      name: z.string().min(1),
      age: z.number().positive(),
    });

    it("should return success true and data for valid input", () => {
      const result = safeValidate(testSchema, { name: "John", age: 25 });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ name: "John", age: 25 });
      }
    });

    it("should return success false and errors for invalid input", () => {
      const result = safeValidate(testSchema, { name: "", age: -5 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty("name");
        expect(result.errors).toHaveProperty("age");
      }
    });

    it("should format error paths correctly for nested fields", () => {
      const nestedSchema = z.object({
        user: z.object({
          email: z.string().email(),
        }),
      });

      const result = safeValidate(nestedSchema, { user: { email: "invalid" } });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty("user.email");
      }
    });
  });
});
