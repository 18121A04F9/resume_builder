# ResumeForge 🚀

A production-ready, free Resume Builder SaaS built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Google OAuth**.

---

## ✨ Features

- 🎨 **3 Professional Templates** — Modern, Minimal, ATS Pro
- ⚡ **Live Preview** — Real-time resume update as you type
- 💾 **Auto-save** — Debounced auto-save every 2 seconds
- 📄 **PDF Export** — Browser print-to-PDF
- 🔐 **Google OAuth** — Secure authentication via NextAuth.js v5
- 🌙 **Dark Mode** — System-aware theme
- 📱 **Responsive** — Works on all screen sizes
- 🔍 **SEO Ready** — Metadata, Open Graph, sitemap, robots.txt

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v5 + Google OAuth |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Forms | React Hook Form + Zod |
| State | React Query |
| Animations | Framer Motion |
| Notifications | Sonner |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
cd "c:\dev\ResumeBuilder"
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `AUTH_SECRET` — Random 32+ char string (`openssl rand -base64 32`)
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — From [Google Console](https://console.cloud.google.com/)
- `DATABASE_URL` / `DIRECT_URL` — From [Supabase Dashboard](https://supabase.com/dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public Supabase keys

### 3. Google OAuth Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project → Enable **Google+ API**
3. Credentials → OAuth 2.0 Client ID → Web Application
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

### 4. Database Setup

```bash
# Push schema to Supabase
npx prisma db push

# OR run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth handler
│   │   ├── resumes/               # CRUD API routes
│   │   └── upload/                # File upload scaffold
│   ├── builder/                   # Resume builder page
│   ├── dashboard/                 # User dashboard
│   ├── login/                     # Auth page
│   ├── templates/                 # Template gallery
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── sitemap.ts                 # SEO sitemap
│   └── robots.ts                  # SEO robots
├── components/
│   ├── builder/                   # Form sections
│   ├── home/                      # Landing page sections
│   ├── layout/                    # Navbar, Footer, ThemeToggle
│   └── preview/                   # Resume templates
├── hooks/                         # React Query hooks
├── lib/                           # Utilities, auth, prisma
├── prisma/                        # Database schema
└── types/                         # TypeScript types
```

---

## 🌐 Deploying to Vercel

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add all environment variables from `.env.local`
4. Update Google OAuth redirect URI:
   `https://yourdomain.vercel.app/api/auth/callback/google`
5. Update `NEXT_PUBLIC_APP_URL` and `AUTH_URL` to your Vercel domain

```bash
# Build command (auto-detected)
npm run build

# Run Prisma migrations on first deploy
npx prisma db push
```

---

## 📝 Environment Variables Reference

| Variable | Description |
|---|---|
| `AUTH_SECRET` | NextAuth secret key |
| `AUTH_URL` | App base URL |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `DATABASE_URL` | Supabase pooled connection string |
| `DIRECT_URL` | Supabase direct connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

---

## 🗺 Roadmap

- [ ] AI-powered resume suggestions
- [ ] Drag-and-drop section reordering
- [ ] Resume PDF extraction (upload feature)
- [ ] Shareable resume public links
- [ ] More templates
- [ ] LinkedIn import
