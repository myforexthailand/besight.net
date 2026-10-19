"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AuthSocialButtons from "./AuthSocialButtons";
import AuthSplitLayout from "./AuthSplitLayout";
import PasswordToggleInput from "./PasswordToggleInput";
import { useLanguage } from "../LanguageContext";
import Icon from "../Icon";

/** Auth.js error codes → message keys. Anything unlisted gets the generic one. */
const AUTH_ERROR_KEYS: Record<string, string> = {
  AccessDenied: "auth.login.error.accessDenied",
  CredentialsSignin: "auth.login.invalid",
};

export default function LoginView({ google, facebook, line, authError }: { google: boolean; facebook: boolean; line: boolean; authError?: string }) {
  const { t } = useLanguage();
  const [error, setError] = useState(() => (authError ? t(AUTH_ERROR_KEYS[authError] ?? "auth.login.error.generic") : ""));
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const result = await signIn("credentials", { email, password, redirect: false });
    if (!result || result.error) {
      setError(t("auth.login.invalid"));
      setBusy(false);
      return;
    }
    // Full reload so every provider re-reads behind the new session.
    window.location.href = "/start/";
  }

  return (
    <AuthSplitLayout
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      back={{ href: "/", label: t("auth.login.back"), external: true }}
    >
      <AuthSocialButtons google={google} facebook={facebook} line={line} />
      {(google || facebook || line) && <div className="auth-divider">{t("auth.login.orEmail")}</div>}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email" className="sr-only">{t("auth.login.email")}</label>
          <div className="auth-input-wrap has-leading">
            <Icon name="mail" className="auth-input-leading" />
            <input
              className="auth-input"
              type="email"
              id="email"
              name="email"
              placeholder={t("auth.login.email")}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="sr-only">{t("auth.login.password")}</label>
          <PasswordToggleInput id="password" name="password" placeholder={t("auth.login.password")} autoComplete="current-password" leadingIcon="lock" />
        </div>

        <Link className="auth-forgot" href="/claim/">
          {t("auth.login.forgot")}
        </Link>

        {error && <p className="auth-error" role="alert">{error}</p>}

        <button type="submit" className="auth-split-submit" disabled={busy}>
          {busy ? t("auth.login.submitting") : t("auth.login.submit")}
        </button>
      </form>

      <p className="auth-alt">
        {t("auth.login.noAccount")}{" "}
        <Link href="/signup/">{t("auth.login.signUp")}</Link>
      </p>
    </AuthSplitLayout>
  );
}
