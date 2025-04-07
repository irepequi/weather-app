import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import type { RootState } from "../features/store";

import type { ContactFormData } from "../utils/interfaces/typeContactForm";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ContactPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    birthDate: "",
    city: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  /**
   * Handles input changes in the contact form.
   *
   * @returns {void} - This function does not return anything.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validates the form data and checks if all required fields are filled.
   * It also performs email and phone number validations.
   *
   * @returns {boolean} - Returns true if the form data is valid, false otherwise.
   */
  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}; // TypeScript utility type that makes all ContactFormData properties optional
    let isValid = true;

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation (simple check for numbers only)
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles the submission of the contact form.
   *
   * @param e - The React form event.
   * @returns {void} - This function does not return anything.
   */
  const     handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form data submitted:", formData);
      setSubmitted(true);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value !== "");

  return (
    <div className="page contact-page">
      <Header isAuthenticated={isAuthenticated} />

      <div className="dashboard-layout">
        <Sidebar />
        <main className="contact-content">
          <h1 className="contact-title">{t("contact")}</h1>

          {submitted ? (
            <div className="success-message">{t("messages.messageSent")}</div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t("name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "error" : ""}`}
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="birthDate">{t("birthDate")}</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`form-control ${errors.birthDate ? "error" : ""}`}
                />
                {errors.birthDate && (
                  <div className="error-text">{errors.birthDate}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">{t("city")}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-control ${errors.city ? "error" : ""}`}
                />
                {errors.city && <div className="error-text">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">{t("email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                  <div className="error-text">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t("phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-control ${errors.phone ? "error" : ""}`}
                />
                {errors.phone && (
                  <div className="error-text">{errors.phone}</div>
                )}
              </div>

              {!isFormComplete && (
                <div className="error-text">
                  {t("messages.pleaseFillAllFields")}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormComplete}
              >
                {t("send")}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContactPage;
