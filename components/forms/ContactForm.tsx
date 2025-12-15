"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validation/schemas";
import { logger } from "@/lib/logger";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const { trackForm, trackContact } = useAnalytics();
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
        logger.error("Failed to fetch CSRF token", error, "Contact");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    trackForm("contact", "submit");

    try {
      const response = await fetch("/api/contact", {
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
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();
      trackForm("contact", "success");
      trackContact(true);

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      logger.error("Error submitting form", error, "Contact");
      setSubmitStatus("error");
      trackForm("contact", "error", error instanceof Error ? error.message : "Unknown error");
      trackContact(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-label="Form kontak"
      aria-busy={isSubmitting}
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("label_name")}{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          disabled={isSubmitting}
          autoComplete="name"
          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.name
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={t("placeholder_name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("label_email")}{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          disabled={isSubmitting}
          autoComplete="email"
          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={t("placeholder_email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("label_subject")}{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.subject
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={t("placeholder_subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p
            id="subject-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("label_message")}{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.message
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={t("placeholder_message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot Field - Hidden from users, catches bots */}
      <input
        type="text"
        {...register("website")}
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

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg ${
            isSubmitting
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-75"
              : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 active:scale-95 hover:shadow-xl"
          }`}
          aria-label="Kirim pesan kontak"
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
              {t("btn_sending")}
            </span>
          ) : (
            t("btn_submit")
          )}
        </button>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div
          className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-green-800 dark:text-green-300 font-medium">
            {t("success_msg")}
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div
          className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-red-800 dark:text-red-300 font-medium">
            {t("error_msg")}
          </p>
        </div>
      )}
    </form>
  );
}
