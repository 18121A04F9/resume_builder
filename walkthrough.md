# ResumeForge — How It All Works

A visual breakdown of the app from the browser to the database.

---

## 1 · Big Picture — System Architecture

```mermaid
graph TB
    Browser["🌐 Browser (User)"]

    subgraph NextJS["Next.js 16 App (localhost:3000)"]
        Proxy["proxy.ts\n(Route Guard)"]
        Pages["Pages\n/ · /login · /dashboard\n/builder · /templates"]
        API["API Routes\n/api/resumes\n/api/auth\n/api/upload"]
        Components["React Components\nNavbar · Builder · Preview\nTemplates · Forms"]
    end

    subgraph External["External Services"]
        Google["Google OAuth\n(Sign In)"]
        Supabase["Supabase\n(Postgres DB)"]
    end

    Browser -->|"every request"| Proxy
    Proxy -->|"allowed"| Pages
    Proxy -->|"not logged in → redirect"| Pages
    Pages --> Components
    Pages --> API
    API -->|"session check"| Google
    API -->|"read / write"| Supabase
    Components -->|"fetch"| API
```

---

## 2 · User Journey — What a User Does

```mermaid
flowchart TD
    Start(["User opens\nlocalhost:3000"])
    Home["🏠 Home Page\nHero · Features · Templates · FAQ"]
    Templates["📄 Templates Page\nBrowse 3 templates"]
    Login["🔐 Login Page\nSign in with Google"]
    Google["Google OAuth\n(external)"]
    Dashboard["📊 Dashboard\nSee all my resumes"]
    Builder["✏️ Builder\nEdit resume live"]
    Save["💾 Save\nAuto-save every 2s\nor manual Save button"]
    Export["📥 Export PDF\nwindow.print()"]
    Done(["✅ Resume ready!"])

    Start --> Home
    Home -->|"Browse templates"| Templates
    Home -->|"Get Started / Sign In"| Login
    Templates -->|"Use this template"| Login
    Login -->|"Google sign in"| Google
    Google -->|"redirect back"| Dashboard
    Dashboard -->|"New Resume"| Builder
    Dashboard -->|"Edit existing"| Builder
    Builder -->|"fill in sections"| Save
    Save -->|"when happy"| Export
    Export --> Done
```

---

## 3 · Route Guard — How `proxy.ts` Protects Pages

```mermaid
flowchart TD
    Req(["Incoming Request\n e.g. GET /dashboard"])
    CheckCreds{"Real Google\ncredentials set\nin .env.local?"}
    Allow1["✅ Allow through\n(dev mode — no auth)"]
    CheckCookie{"Session cookie\npresent?"}
    IsProtected{"Route is\n/dashboard or\n/builder?"}
    IsAuth{"Route is\n/login?"}
    Redirect1["↩️ Redirect to /login"]
    Redirect2["↩️ Redirect to /dashboard"]
    Allow2["✅ Serve the page"]

    Req --> CheckCreds
    CheckCreds -->|"No (dev mode)"| Allow1
    CheckCreds -->|"Yes"| CheckCookie
    CheckCookie -->|"cookie found = logged in"| IsAuth
    CheckCookie -->|"no cookie = not logged in"| IsProtected
    IsProtected -->|"yes"| Redirect1
    IsProtected -->|"no"| Allow2
    IsAuth -->|"yes → already logged in"| Redirect2
    IsAuth -->|"no"| Allow2
```

---

## 4 · Builder — Data Flow (Form → Preview → DB)

```mermaid
flowchart LR
    subgraph Form["📝 Left Panel — Form"]
        PersonalInfo["Personal Info"]
        Summary["Summary"]
        WorkExp["Work Experience"]
        Education["Education"]
        Skills["Skills"]
        Projects["Projects"]
        Certs["Certifications"]
        Langs["Languages"]
    end

    subgraph State["⚙️ React State\n(builder-client.tsx)"]
        ResumeData["resumeData\n(ResumeData object)"]
        Debounce["debounce(2s)\nauto-save"]
    end

    subgraph Preview["👁️ Right Panel — Live Preview"]
        Template["Template Component\nModern / Minimal / ATS"]
    end

    subgraph DB["🗄️ Database\n(Supabase + Prisma)"]
        ResumesTable["resumes table\n{ id, title, template, data }"]
    end

    Form -->|"onChange"| ResumeData
    ResumeData -->|"re-render"| Template
    ResumeData -->|"after 2s idle"| Debounce
    Debounce -->|"PATCH /api/resumes/id"| ResumesTable
```

---

## 5 · Component Tree

```mermaid
graph TD
    Layout["app/layout.tsx\n(Root Layout)"]
    Providers["Providers\nSessionProvider\nThemeProvider\nQueryClientProvider"]
    Navbar["Navbar\n+ ThemeToggle\n+ UserMenu"]
    Main["main (page content)"]
    Footer["Footer"]

    Layout --> Providers
    Providers --> Navbar
    Providers --> Main
    Providers --> Footer

    Main -->|"/"| HomePage
    Main -->|"/login"| LoginPage
    Main -->|"/dashboard"| DashboardPage
    Main -->|"/builder"| BuilderPage
    Main -->|"/templates"| TemplatesPage

    BuilderPage --> BuilderClient
    BuilderClient --> ResumeForm
    BuilderClient --> ResumePreview

    ResumeForm --> PersonalInfo
    ResumeForm --> Summary
    ResumeForm --> WorkExp["WorkExperience"]
    ResumeForm --> Education
    ResumeForm --> Skills
    ResumeForm --> Projects
    ResumeForm --> Certs["Certifications"]
    ResumeForm --> Langs["Languages"]

    ResumePreview -->|"template='modern'"| ModernTemplate
    ResumePreview -->|"template='minimal'"| MinimalTemplate
    ResumePreview -->|"template='professional-ats'"| ATSTemplate
```

---

## 6 · API Request Lifecycle — Saving a Resume

```mermaid
sequenceDiagram
    participant U as Browser
    participant P as proxy.ts
    participant A as API Route<br/>/api/resumes/[id]
    participant Auth as NextAuth<br/>lib/auth.ts
    participant DB as Prisma → Supabase

    U->>P: PATCH /api/resumes/abc123
    P->>A: passes through (API routes not guarded)
    A->>Auth: auth() — check session
    Auth-->>A: { user: { id: "xyz" } }
    A->>DB: findUnique({ where: { id: "abc123" } })
    DB-->>A: resume record
    A->>A: verify resume.userId === user.id
    A->>DB: update({ data: { title, template, data } })
    DB-->>A: updated resume
    A-->>U: 200 { resume }
```

---

## 7 · Auth Flow — Google Sign In

```mermaid
sequenceDiagram
    participant U as User
    participant L as /login page
    participant NA as NextAuth<br/>/api/auth/...
    participant G as Google OAuth
    participant DB as Supabase (DB)

    U->>L: clicks "Sign in with Google"
    L->>NA: signIn("google")
    NA->>G: redirect to accounts.google.com
    G-->>U: Google consent screen
    U-->>G: grants permission
    G-->>NA: callback with code
    NA->>DB: upsert User + Account records
    NA-->>U: set session cookie
    U->>NA: redirect to /dashboard
```

---

## 8 · File Structure Map

```
ResumeForge/
├── proxy.ts               ← Route guard (Next.js 16)
├── app/
│   ├── layout.tsx         ← Root HTML shell + providers
│   ├── page.tsx           ← Home page (/)
│   ├── login/             ← /login
│   ├── dashboard/         ← /dashboard (protected)
│   ├── builder/           ← /builder  (protected)
│   ├── templates/         ← /templates
│   └── api/
│       ├── auth/          ← NextAuth handler
│       ├── resumes/       ← CRUD for resumes
│       └── upload/        ← File upload (stub)
├── components/
│   ├── layout/            ← Navbar, Footer, ThemeToggle
│   ├── home/              ← Hero, Features, FAQ, CTA
│   ├── builder/           ← ResumeForm + all form sections
│   ├── preview/           ← ResumePreview + 3 templates
│   └── providers.tsx      ← Wraps the whole app
├── lib/
│   ├── auth.ts            ← NextAuth config
│   ├── prisma.ts          ← DB client
│   ├── utils.ts           ← cn(), debounce, formatDate
│   └── resume-defaults.ts ← Empty resume starter data
├── hooks/
│   └── use-resumes.ts     ← React Query CRUD hook
├── types/
│   └── resume.ts          ← ResumeData TypeScript types
└── prisma/
    └── schema.prisma      ← DB schema (User, Resume…)
```
