# SMK Tahfizh Al-Fatih — School Information + PPDB System

Full-stack School Information System + PPDB (Penerimaan Peserta Didik Baru) untuk **SMK Tahfizh Al-Fatih Pekanbaru** — project ujian RPL.

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Firebase Realtime Database + Local Session Auth + React Hook Form + Zod + Lucide Icons + shadcn/ui pattern

## Fitur

- **Public Website:** Homepage premium, Tentang, Visi-Misi, Program (Tahfizh/Entrepreneurship/PBL), Jurusan (RPL/Tata Boga), Fasilitas, Galeri (filter+lightbox), Berita (CRUD), Agenda, FAQ (accordion), Kontak + Map, SEO (metadata, OG, sitemap, robots)
- **PPDB:** Alur lengkap Daftar → Login → Isi Form (biodata, ortu, pilihan jurusan/program, tambahan) → Review → Submit → Nomor `AF-2026-0001` (transaction counter) → Tracking status → Bukti pendaftaran + QR + print
- **Portal Peserta:** `/dashboard`, `/dashboard/form`, `/dashboard/documents` (simulasi upload metadata), `/dashboard/interview`, `/dashboard/notifications`, `/dashboard/registration-proof`
- **Status Publik:** `/admissions/status` cek by nomor pendaftaran (tanpa expose data sensitif)
- **Admin:** Login lokal (`admin`/`admin123`), Dashboard statistik, Manajemen pendaftar (search/filter/sort/pagination/detail/status/doc verify/interview), Berita, Agenda, Galeri, Fasilitas, FAQ, Jurusan, Program, Pengumuman, Interview, Audit Log, Settings (PPDB open/close), Export CSV
- **Dokumen:** Metadata only (tidak pakai Storage) — status PENDING/UPLOADED/VERIFIED/REJECTED + rejectedReason
- **Interview:** CRUD jadwal, status SCHEDULED/COMPLETED/CANCELLED
- **Realtime:** Listener untuk dashboard admin, notifikasi, status
- **Keamanan:** Local session abstraction, role helper, validasi Zod, Firebase rules dokumentasi limitasi

## Requirements

- Node 18+
- Firebase Realtime Database project `smk-al-fatih` (sudah dikonfigurasi)

## Install & Run

```bash
npm install
cp .env.example .env.local
# isi Firebase config & kredensial admin
npm run dev      # http://localhost:3000
npm run build    # build production
npm run lint
npx tsc --noEmit # typecheck
```

## Environment Variables

Lihat `.env.example` (jangan commit `.env.local` dengan nilai asli):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

> **Keamanan:** `NEXT_PUBLIC_*` diekspos ke browser — hanya isi Firebase public client config di sana. Kredensial admin untuk demo lokal (`admin`/`admin123`) hanya untuk development — ganti dengan password kuat di production via environment variable dan jangan commit `.env.local`.

Kredensial admin disimpan di `lib/auth/local-auth.ts` via env, bukan hardcoded di component. Session disimpan di `localStorage` key `admin_session` / `applicant_session` via abstraction helper.

## Firebase Realtime Database

**Struktur:**
```
/
├── applicants/{applicantId}
├── applicationDocuments/{docId}
├── majors/{majorId}
├── programs/{programId}
├── news/{newsId}
├── events/{eventId}
├── gallery/{galleryId}
├── facilities/{facilityId}
├── faqs/{faqId}
├── announcements/{announcementId}
├── notifications/{notificationId}
├── interviews/{interviewId}
├── auditLogs/{auditId}
├── settings/site
├── counters/applicantCounter
└── statistics
```

**Setup:** Buat Realtime Database di console Firebase project `smk-al-fatih`, region bebas, import `database.rules.json`.

**Rules:** Lihat `database.rules.json`. Catatan: tanpa Firebase Auth, rules tidak bisa membedakan admin/applicant secara aman — ini limitasi demo/ujian. Untuk production gunakan Firebase Auth atau backend auth proper. Rules saat ini `true` read/write per collection agar fungsional tanpa Auth, tapi tidak production-grade.

## Authentication Architecture

- **Tidak pakai Firebase Auth / Firestore / Storage / Functions** sesuai brief.
- **Admin:** `lib/auth/local-auth.ts` — `loginAdmin()`, `logoutAdmin()`, `isAdminLoggedIn()`, `getCurrentAdmin()`. Session `{isLoggedIn, username, role, loginAt}` di `localStorage`.
- **Peserta:** `lib/auth/applicant-auth.ts` — `loginApplicant()` cari di `applicants` by email+password (plain untuk demo), session `applicant_session`. Validasi ownership saat fetch data by `applicantId`.
- Route protection: client guard redirect `/admin/*` → `/admin/login`, `/dashboard/*` → `/login`.

## Akun Demo

- Admin: `admin` / `admin123` → `/admin/login`
- Peserta: buat via `/register` lalu login `/login`

## Build & Test

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Manual QA checklist: Homepage, Navbar mobile, Register → Login → Dashboard → Form → Submit → Proof → Status publik → Admin login → Dashboard → Applicants (search/filter/CSV) → ubah status → verifikasi dokumen → buat interview → News/Events/Gallery/Fasilitas/FAQ CRUD → Settings PPDB toggle → Logout → akses terlarang.

## Deploy

- Vercel: `vercel --prod` (set env di dashboard)
- Atau: `npm run build && npm start`

## Known Limitations (Security Disclaimer)

> Authentication project menggunakan local credentials & localStorage karena project ini dibuat untuk ujian/demo dan tidak menggunakan Firebase Authentication. Untuk production direkomendasikan Firebase Authentication atau backend authentication yang proper. Firebase Security Rules tidak dapat mengenali identitas admin secara aman tanpa Auth — jangan expose database di production dengan rules terbuka.

## Struktur Project

```
src/
├── app/ (page.tsx, about, programs, majors, facilities, gallery, news, events, admissions, login, register, dashboard, admin)
├── components/ui (button, input, card, badge, tabs, dialog, toast, ... )
├── components/layout (Navbar, Footer)
├── components/admin (AdminShell)
├── lib/
│   ├── firebase.ts (singleton)
│   ├── auth/ (local-auth, applicant-auth)
│   ├── services/ (applicant, news, event, gallery, facility, faq, program, major, document, interview, notification, announcement, audit, settings)
│   ├── schemas/ (applicant-schema, cms-schema)
│   ├── types/
│   └── utils/
└── config/site.ts
```

## Lisensi

Demo/ujian — bukan production.
