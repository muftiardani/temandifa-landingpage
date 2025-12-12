import { describe, it, expect } from "vitest";
import { contactFormEmailTemplate } from "@/lib/email-templates";

describe("Email Templates", () => {
  describe("contactFormEmailTemplate", () => {
    const mockData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message",
    };

    it("should generate HTML email template", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toBeDefined();
      expect(typeof result.html).toBe("string");
      expect(result.html.length).toBeGreaterThan(0);
    });

    it("should generate plain text email template", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.text).toBeDefined();
      expect(typeof result.text).toBe("string");
      expect(result.text.length).toBeGreaterThan(0);
    });

    it("should include sender name in HTML", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain(mockData.name);
    });

    it("should include sender email in HTML", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain(mockData.email);
    });

    it("should include subject in HTML", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain(mockData.subject);
    });

    it("should include message in HTML", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain(mockData.message);
    });

    it("should include sender name in text version", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.text).toContain(mockData.name);
    });

    it("should include sender email in text version", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.text).toContain(mockData.email);
    });

    it("should include subject in text version", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.text).toContain(mockData.subject);
    });

    it("should include message in text version", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.text).toContain(mockData.message);
    });

    it("should escape HTML in user input", () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        email: "hacker@example.com",
        subject: "<img src=x onerror=alert(1)>",
        message: "<iframe src='evil.com'></iframe>",
      };

      const result = contactFormEmailTemplate(maliciousData);

      // HTML should be escaped
      expect(result.html).not.toContain("<script>");
      expect(result.html).not.toContain("<iframe>");
      expect(result.html).not.toContain("onerror=");

      // Should contain escaped versions
      expect(result.html).toContain("&lt;");
      expect(result.html).toContain("&gt;");
    });

    it("should handle special characters in message", () => {
      const specialData = {
        name: "José García",
        email: "jose@example.com",
        subject: "Café & Restaurant",
        message: "Hello! This is a test with émojis 🎉 and spëcial çharacters",
      };

      const result = contactFormEmailTemplate(specialData);

      expect(result.html).toContain("José García");
      expect(result.html).toContain("Café");
      expect(result.text).toContain("José García");
      expect(result.text).toContain("🎉");
    });

    it("should handle long messages", () => {
      const longMessage = "A".repeat(1000);
      const longData = {
        ...mockData,
        message: longMessage,
      };

      const result = contactFormEmailTemplate(longData);

      expect(result.html).toContain(longMessage);
      expect(result.text).toContain(longMessage);
    });

    it("should handle empty strings gracefully", () => {
      const emptyData = {
        name: "",
        email: "",
        subject: "",
        message: "",
      };

      const result = contactFormEmailTemplate(emptyData);

      expect(result.html).toBeDefined();
      expect(result.text).toBeDefined();
    });

    it("should have proper HTML structure", () => {
      const result = contactFormEmailTemplate(mockData);

      // HTML should have proper structure
      expect(result.html).toContain("<div");
      expect(result.html).toContain("</div>");
      expect(result.html).toContain("<h2");
      expect(result.html).toContain("New Contact Form Submission");
    });

    it("should have proper text structure", () => {
      const result = contactFormEmailTemplate(mockData);

      // Text should have sections
      expect(result.text).toContain("From:");
      expect(result.text).toContain("Email:");
      expect(result.text).toContain("Subject:");
      expect(result.text).toContain("Message:");
    });

    it("should preserve line breaks in message", () => {
      const multilineData = {
        ...mockData,
        message: "Line 1\nLine 2\nLine 3",
      };

      const result = contactFormEmailTemplate(multilineData);

      // HTML uses white-space: pre-wrap
      expect(result.html).toContain("Line 1");
      expect(result.html).toContain("Line 2");
      expect(result.html).toContain("Line 3");

      // Text should preserve line breaks
      expect(result.text).toContain("Line 1\nLine 2\nLine 3");
    });

    it("should include footer text", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain("TemanDifa contact form");
      expect(result.text).toContain("TemanDifa contact form");
    });

    it("should use pre-wrap for message formatting", () => {
      const result = contactFormEmailTemplate(mockData);

      expect(result.html).toContain("white-space: pre-wrap");
    });
  });
});

