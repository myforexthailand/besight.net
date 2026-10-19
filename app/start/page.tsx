import { redirect } from "next/navigation";
import { auth } from "@/auth";

/* Post-sign-in landing: the member dashboard and admin CRM now live at
   app.besight.net, not in this app, so every sign-in path (email, sign-up,
   Google/Facebook/LINE) sends the visitor there instead. */
export default async function StartPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect("https://app.besight.net/");
}
