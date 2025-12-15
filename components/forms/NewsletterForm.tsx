"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function NewsletterForm() {
  const t = useTranslations("Newsletter");
  const { trackForm, trackNewsletter } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [csrfToken, setCSRFToken] = useState<string>("");
  const [csrfHash, setCSRFHash] = useState<string>("");
  const [csrfExpiresAt, setCSRFExpiresAt] = useState<number>(0);

  useEffect(() => {
    fetch("/api/csrf")
      .then((res) => res.json())
      .then((data) => {
        setCSRFToken(data.token);
        setCSRFHash(data.hash);
        setCSRFExpiresAt(data.expiresAt);
      })
      .catch((error) => {
        logger.error("Failed to fetch CSRF token", error, "Newsletter");
      });
  }, []);

  const newsletterSchema = z.object({
    email: z.string().email(t("validation.email_invalid")),
    honeypot: z.string().optional(),
  });

  type NewsletterFormData = z.infer<typeof newsletterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    trackForm("newsletter", "submit");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          ...data,
          csrfHash,
          csrfExpiresAt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      setSubmitStatus("success");
      reset();
      trackForm("newsletter", "success");
      trackNewsletter(true);

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      logger.error("Error subscribing to newsletter", error, "Newsletter");
      setSubmitStatus("error");
      trackForm("newsletter", "error", error instanceof Error ? error.message : "Unknown error");
      trackNewsletter(false);
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
        aria-label="Newsletter subscription form"
        aria-busy={isSubmitting}
      >
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            {t("label_email")}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="newsletter-email"
              type="email"
              {...register("email")}
              disabled={isSubmitting || submitStatus === "success"}
              autoComplete="email"
              className={`flex-1 px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.email
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder={t("placeholder_email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            />
            
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              {...register("honeypot")}
              style={{ 
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px'
              }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 shadow-md whitespace-nowrap ${
                isSubmitting || submitStatus === "success"
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-75"
                  : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 active:scale-95 hover:shadow-lg"
              }`}
              aria-label="Subscribe to newsletter"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("btn_subscribing")}
                </span>
              ) : submitStatus === "success" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t("btn_subscribed")}
                </span>
              ) : (
                t("btn_subscribe")
              )}
            </button>
          </div>
          
          {errors.email && (
            <p
              id="newsletter-email-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div
            className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-green-800 dark:text-green-300 font-medium">
              {t("success_msg")}
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div
            className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-red-800 dark:text-red-300 font-medium">
              {t("error_msg")}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
