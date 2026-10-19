# BeSight

เว็บไซต์หลัก BeSight + แดชบอร์ดสมาชิก + CRM หลังบ้าน ในแอป Next.js ตัวเดียว
(Next.js 16 · React 19 · Prisma 7 · MySQL/MariaDB · Auth.js)

- `/` เว็บไซต์หลัก (ข่าว, อีเวนต์, เครื่องมือ, วิเคราะห์ SPDR)
- `/dashboard` แดชบอร์ดสมาชิก
- `/crm` หลังบ้านสำหรับแอดมิน

## เริ่มต้น

```bash
npm install
cp .env.example .env      # ตั้ง DATABASE_URL, AUTH_SECRET
npm run db:deploy         # สร้างตาราง
npm run admin:create -- you@example.com 'password'   # แอดมินคนแรก
npm run dev               # http://localhost:3000
```

ก่อน push: `npx tsc --noEmit && npm run lint && npm run build`

## เอกสาร

- **[docs/PROJECT-OVERVIEW.md](docs/PROJECT-OVERVIEW.md)** — ภาพรวมสำหรับทุกฝ่าย: ระบบทำอะไรได้บ้าง สถานะตอน deploy และงานที่ส่งต่อให้แต่ละฝ่าย
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** — คู่มือนักพัฒนา: โครงสร้าง, หลักการของโค้ด, cron, migration, deploy, ปัญหาที่เคยเจอ และฟีเจอร์ที่ยังขาด
- [docs/GLOSSARY.md](docs/GLOSSARY.md) — ศัพท์เฉพาะ (lot, cycle, entitlement …)
- [docs/ADR-001-crm-realtime-refresh.md](docs/ADR-001-crm-realtime-refresh.md) — การรีเฟรชข้อมูล CRM แบบเรียลไทม์
- [mt-bridge/README.md](mt-bridge/README.md) — บริการ MT5 สำหรับ Trading Journal
- [.env.example](.env.example) — ตัวแปร environment ทั้งหมดพร้อมคำอธิบาย
