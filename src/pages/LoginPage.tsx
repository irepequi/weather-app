import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import type { RootState } from "../features/store";

import { useTranslation } from "react-i18next";

import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const authError = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError(t("error.enterEmailAndPassword"));
      return;
    }

    // Validate email format
    // In a real application, I would validate against a backend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("error.invalidEmail"));
      return;
    }

    // Reset error state
    setError("");

    // Dispatch login action
    dispatch(login({ email, password }));
  };

  return (
    <div className="page login-page">
      <Header isAuthenticated={isAuthenticated} />

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form__title">{t("login")}</h2>

          {/* Display error messages */}
          {error && <div className="login-form__error">{error}</div>}
          {authError && <div className="login-form__error">{authError}</div>}

          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {t("login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
