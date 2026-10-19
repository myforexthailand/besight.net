/* Creates the first Owner admin in an empty database — the only way in to
   /crm before any admin exists (further admins are added from CRM → Settings).
   Refuses to touch an email that already has an admin row.

     npx tsx scripts/create-admin.ts <email> <password> [name]
   or set ADMIN_EMAIL / ADMIN_PASSWORD and run: npm run admin:create */
import "dotenv/config";
import { getPrisma } from "../lib/server/prisma";
import { hashPassword } from "../lib/server/password";
import { MIN_PASSWORD_LENGTH } from "../lib/server/register";

async function main() {
  const [argEmail, argPassword, argName] = process.argv.slice(2);
  const email = (argEmail || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = argPassword || process.env.ADMIN_PASSWORD || "";
  const name = (argName || "BeSight Owner").trim();
  if (!email || !email.includes("@")) throw new Error("Give an email: npx tsx scripts/create-admin.ts <email> <password>");
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);

  const prisma = getPrisma();
  if (await prisma.admin.findUnique({ where: { email }, select: { id: true } })) {
    throw new Error(`An admin with ${email} already exists — nothing changed`);
  }
  await prisma.admin.create({
    data: { name, email, role: "Owner", isOwner: true, passwordHash: await hashPassword(password) },
  });
  console.log(`Created Owner admin ${email}. Sign in at /login, then add the rest of the team in CRM → Settings.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
