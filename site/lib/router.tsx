"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

/* The landing was written against react-router's <Link to>. This keeps that
   API on top of next/link so the ported components stay unchanged.

   Links into the member app (login, dashboard, CRM…) render a plain <a>:
   a full page load there drops the landing's Tailwind reset, so it can't
   leak into the app's own stylesheets on a client-side navigation. */
const APP_PREFIXES = ["/login", "/signup", "/gate", "/claim", "/admin-claim", "/dashboard", "/crm", "/api/"];

const NEXT_LINK_ONLY = ["prefetch", "replace", "scroll", "shallow", "locale", "legacyBehavior", "passHref"];

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { to: string };

export function Link({ to, ...rest }: LinkProps) {
  if (APP_PREFIXES.some((prefix) => to === prefix || to.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`) || to.startsWith(`${prefix}?`))) {
    const anchor: Record<string, unknown> = { ...rest };
    for (const key of NEXT_LINK_ONLY) delete anchor[key];
    return <a href={to} {...(anchor as ComponentProps<"a">)} />;
  }
  return <NextLink href={to} {...rest} />;
}
