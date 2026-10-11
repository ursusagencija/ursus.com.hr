"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

type RenterInquiryFormProps = {
  serviceOptions: string[];
  submitLabel: string;
};

const RenterInquiryForm = ({
  serviceOptions,
  submitLabel,
}: RenterInquiryFormProps) => {
  const t = useTranslations("for-renters");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const additional = String(formData.get("additional") || "").trim();

    if (!name || !email || !location || !service) {
      setError(t("validation-required"));
      return;
    }

    const message = [
      `Location: ${location}`,
      `Service interest: ${service}`,
      additional ? `Additional info: ${additional}` : null,
    ]
      .filter(Boolean)
      .join("\r\n");

    setSubmitting(true);

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "-",
          message,
          subject: "Ursus Travel & Accommodation – Owner inquiry",
        }),
      });
      const result = await res.json();

      if (!res.ok || result.status === "error" || result.error) {
        setError(t("submit-error"));
        return;
      }

      router.push("/message-sent");
    } catch {
      setError(t("submit-error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="renter-name" className="mb-2 block text-sm font-medium text-dark-1">
          {t("name")} *
        </label>
        <input
          id="renter-name"
          name="name"
          type="text"
          required
          placeholder={t("name-placeholder")}
          className="input_style__primary"
        />
      </div>

      <div>
        <label htmlFor="renter-email" className="mb-2 block text-sm font-medium text-dark-1">
          {t("email")} *
        </label>
        <input
          id="renter-email"
          name="email"
          type="email"
          required
          placeholder={t("email-placeholder")}
          className="input_style__primary"
        />
      </div>

      <div>
        <label htmlFor="renter-phone" className="mb-2 block text-sm font-medium text-dark-1">
          {t("phone")}
        </label>
        <input
          id="renter-phone"
          name="phone"
          type="tel"
          placeholder={t("phone-placeholder")}
          className="input_style__primary"
        />
      </div>

      <div>
        <label
          htmlFor="renter-location"
          className="mb-2 block text-sm font-medium text-dark-1"
        >
          {t("location")} *
        </label>
        <input
          id="renter-location"
          name="location"
          type="text"
          required
          placeholder={t("location-placeholder")}
          className="input_style__primary"
        />
      </div>

      <div>
        <label
          htmlFor="renter-service"
          className="mb-2 block text-sm font-medium text-dark-1"
        >
          {t("service")} *
        </label>
        <select
          id="renter-service"
          name="service"
          required
          defaultValue=""
          className="input_style__primary"
        >
          <option value="" disabled>
            {t("service-placeholder")}
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="renter-additional"
          className="mb-2 block text-sm font-medium text-dark-1"
        >
          {t("additional")}
        </label>
        <textarea
          id="renter-additional"
          name="additional"
          rows={4}
          placeholder={t("additional-placeholder")}
          className="input_style__primary"
        />
      </div>

      {error ? <p className="text-sm text-primary-2">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="btn_primary__v1 w-full justify-center disabled:opacity-60"
      >
        {submitting ? t("submitting") : submitLabel}
        <i className="bi bi-chevron-right" />
      </button>
    </form>
  );
};

export default RenterInquiryForm;
