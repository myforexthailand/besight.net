"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AuthSplitLayout from "./AuthSplitLayout";
import AuthSocialButtons from "./AuthSocialButtons";
import PasswordToggleInput from "./PasswordToggleInput";
import { useLanguage } from "../LanguageContext";
import Icon from "../Icon";

export default function RegisterView({ google, facebook, line }: { google: boolean; facebook: boolean; line: boolean }) {
  const { t } = useLanguage();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError(t("auth.register.error.mismatch"));
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const payload = await response.json().catch(() => ({})) as { ok?: boolean; code?: string };

      if (!response.ok || !payload.ok) {
        setError(
          payload.code === "email_taken" ? t("auth.register.error.emailTaken") : t("auth.register.error.invalid"),
        );
        setBusy(false);
        return;
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (!result || result.error) {
        // Account exists but the auto sign-in hiccuped — send them to log in by hand.
        window.location.href = "/login/";
        return;
      }
      // Full reload so every provider re-reads behind the new session; "/"
      // sends a brand-new member straight to /dashboard.
      window.location.href = "/start/";
    } catch {
      setError(t("auth.register.error.generic"));
      setBusy(false);
    }
  }

  return (
    <AuthSplitLayout
      title={t("auth.register.title")}
      subtitle={t("auth.register.subtitle")}
      back={{ href: "/", label: t("auth.login.back"), external: true }}
    >
      <AuthSocialButtons google={google} facebook={facebook} line={line} />
      {(google || facebook || line) && <div className="auth-divider">{t("auth.register.orEmail")}</div>}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="name" className="sr-only">{t("auth.register.name")}</label>
          <div className="auth-input-wrap has-leading">
            <Icon name="person" className="auth-input-leading" />
            <input className="auth-input" type="text" id="name" name="name" placeholder={t("auth.register.name")} autoComplete="name" required />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="email" className="sr-only">{t("auth.register.email")}</label>
          <div className="auth-input-wrap has-leading">
            <Icon name="mail" className="auth-input-leading" />
            <input className="auth-input" type="email" id="email" name="email" placeholder={t("auth.register.email")} autoComplete="email" required />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="sr-only">{t("auth.register.password")}</label>
          <PasswordToggleInput id="password" name="password" placeholder={t("auth.register.passwordPlaceholder")} autoComplete="new-password" minLength={8} leadingIcon="lock" />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword" className="sr-only">{t("auth.register.confirmPassword")}</label>
          <PasswordToggleInput id="confirmPassword" name="confirmPassword" placeholder={t("auth.register.confirmPasswordPlaceholder")} autoComplete="new-password" minLength={8} leadingIcon="lock" />
        </div>

        {error && <p className="auth-error" role="alert">{error}</p>}

        <button type="submit" className="auth-split-submit" disabled={busy}>
          {busy ? t("auth.register.submitting") : t("auth.register.submit")}
        </button>
      </form>

      <p className="auth-alt">
        {t("auth.register.haveAccount")}{" "}
        <Link href="/login/">{t("auth.register.logIn")}</Link>
      </p>
    </AuthSplitLayout>
  );
}
