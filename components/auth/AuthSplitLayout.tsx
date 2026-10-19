"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import AuthLanguageMenu from "./AuthLanguageMenu";
import { useLanguage } from "../LanguageContext";
import Icon from "../Icon";

/** Split-screen auth page: artwork on the left (hidden on phones), a white
 *  form panel on the right. Shared by log in, sign up and re-login (gate). */
export default function AuthSplitLayout({
  title,
  subtitle,
  back,
  children,
}: {
  title: string;
  subtitle: string;
  /** Top-left link. `external` = a full page load (the public landing has
   *  its own stylesheet), otherwise an in-app Link. */
  back: { href: string; label: string; external?: boolean };
  children: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div className="auth-split">
      <aside className="auth-split-art" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative full-bleed artwork */}
        <img src="/images/auth/login-guardian.jpg" alt="" />
        <div className="auth-split-art-caption">
          <strong>Trade Smarter. See Beyond.</strong>
          <span>{t("auth.split.tagline")}</span>
        </div>
      </aside>

      <main className="auth-split-main">
        <div className="auth-split-top">
          {back.external ? (
             
            <a className="auth-split-back" href={back.href}>
              <Icon name="chevron_left" />
              {back.label}
            </a>
          ) : (
            <Link className="auth-split-back" href={back.href}>
              <Icon name="chevron_left" />
              {back.label}
            </Link>
          )}
          <AuthLanguageMenu />
        </div>

        <div className="auth-split-form">
          {/* eslint-disable-next-line @next/next/no-img-element -- small brand logo */}
          <img className="auth-split-logo" src="/img/Horizontal-logo-c.png" alt="BeSight" />
          <h1>{title}</h1>
          <p className="auth-split-sub">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
