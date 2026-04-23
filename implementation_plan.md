# ResumeForge — Complete Redesign Plan
### Inspired by Novoresume · Enhancv · Overleaf

---

## What We're Building (Vision)

> A **minimal, modern** resume builder with:
> - **Overleaf-style compile workflow** — Form editor on left, PDF-quality preview on right, green "Compile" button
> - **6 beautiful templates** drawn from all 3 reference sites
> - **Clean dark/light UI** — no clutter, lots of whitespace, monochrome palette with a single accent
> - **Global style controls** — accent color, font family, spacing density

---

## Reference Takeaways

| Source | What We're Taking |
|---|---|
| **Novoresume** | Template categories (Minimal, Creative, Sidebar, Executive), hover zoom preview, category filter tabs, teal+white aesthetic |
| **Enhancv** | ATS score section completeness panel, bold header style in Creative template, section visibility toggles |
| **Overleaf** | **Compile button** workflow (editor ↔ PDF side-by-side), "Auto-compile" toggle, green accent on action buttons, clean sans-serif UI, AltaCV sidebar layout, academic/precise template style |

---

## Design System (New)

### Color Palette
```
Background:   #0a0a0a (dark) / #fafafa (light)
Surface:      #141414 (dark) / #ffffff (light)
Border:       #262626 (dark) / #e5e5e5 (light)
Text:         #fafafa (dark) / #0a0a0a (light)
Muted:        #737373
Accent:       #22c55e  (green — Overleaf-inspired, user can change)
              Options: Indigo #6366f1, Teal #14b8a6, Rose #f43f5e, Amber #f59e0b
```

### Typography
```
UI Font:      Inter (already installed)
Heading:      Inter 700
Code-like:    JetBrains Mono (for form labels — gives Overleaf feel)
```

### Layout Principles
- Max content width: 1400px
- Builder split: 46% form / 54% preview (Overleaf proportion)
- Minimal borders, prefer subtle shadows
- 8pt spacing grid

---

## Phase 1 — Design System & UI Overhaul

### 1.1 Global CSS Redesign
**File:** `app/globals.css`

- Replace existing CSS variables with the new minimal palette above
- Add Overleaf-style `--accent` variable (default green, overridable)
- Add `@font-face` for JetBrains Mono (form label aesthetic)
- Add `.compile-btn` styles (green, rounded, with spinner state)
- Fix `@media print` fully — hide EVERYTHING except `.resume-page`
- A4 dimensions: `width: 210mm; min-height: 297mm` at print

### 1.2 Homepage Redesign
**File:** `components/home/hero-section.tsx`

**Inspired by:** Overleaf's split demo (editor left, PDF right animated)

Changes:
- Replace current hero with a **two-column layout**:
  - Left: Headline + subtext + CTA buttons + stats row
  - Right: Animated resume card mockup floating with subtle shadow
- Add **stats strip**: `50K+ Resumes Built · 6 Templates · 100% Free · ATS Friendly`
- Add **company trust logo strip**: Google · Amazon · Adobe · Netflix · Apple (grayscale logos)
- Headline copy: "Build a Resume That Gets You Hired" (bold, ~4xl)

**File:** `components/home/how-it-works.tsx` *(NEW)*
- 3 steps with numbered circles: "1. Pick a Template → 2. Fill Your Details → 3. Compile & Download"
- Overleaf-style step numbering in green circles

**File:** `components/home/testimonials-section.tsx` *(NEW)*
- 3 testimonial cards with avatar, name, role, quote
- Subtle card with border, minimal shadow

---

## Phase 2 — Builder: Compile Workflow (Overleaf-Inspired)

This is the core UX change. The builder transforms from "form + auto-updating preview" into an **Overleaf-style compile workflow**.

### How Compile Works
```
User fills form → clicks "Compile" → React state snapshot is taken →
Preview renders from snapshot → PDF is visually stable for export
```
- **Auto-compile toggle** (on by default for free flow, off for "compile on demand")
- When Auto-compile is ON: preview updates after 1.5s debounce (like Overleaf's auto-compile)
- When Auto-compile is OFF: preview only updates when user clicks green "Compile" button
- Visual state: "Compiling…" spinner → "Compiled ✓" → stale indicator if form changed

### 2.1 Builder Shell Redesign
**File:** `app/builder/builder-client.tsx`

**New top bar layout:**
```
[← Back]  [Resume Title (editable)]  ............  [Auto-compile ⟳] [Compile ▶] [Download PDF ↓]
```

**New panel proportions:**
- Left (46%): Form editor panel — dark sidebar feel, compact labels
- Right (54%): PDF Preview — white background, A4 shadow, grey surround (like Overleaf's PDF pane)

**New state:**
```ts
const [compiledData, setCompiledData] = useState<ResumeData>(resumeData);
const [compileStatus, setCompileStatus] = useState<'idle'|'compiling'|'compiled'|'stale'>('idle');
const [autoCompile, setAutoCompile] = useState(true);
```

**Compile button behavior:**
- Green button, rounded, with play icon ▶
- On click: set status to "compiling" (300ms fake delay for feel) → set `compiledData = resumeData` → status = "compiled"
- If auto-compile ON: fires automatically after 1.5s debounce on form change
- Shows "● Changes pending" badge when stale

**New ResumeSettings state (global controls):**
```ts
interface ResumeSettings {
  accentColor: string;   // hex
  fontFamily: 'inter' | 'playfair' | 'mono';
  spacing: 'compact' | 'normal' | 'spacious';
  template: TemplateId;
}
```

### 2.2 Style Controls Panel
**File:** `components/builder/style-panel.tsx` *(NEW)*

A collapsible drawer/panel (triggered by "Design" button in top bar):
- **Template picker**: 6 template cards with mini thumbnails, click to switch
- **Accent color**: 6 color swatches (Green, Indigo, Teal, Rose, Amber, Slate)
- **Font**: 3 radio options — Sans (Inter) / Serif (Playfair Display) / Mono (JetBrains Mono)
- **Spacing**: Compact / Normal / Spacious toggle

### 2.3 Form Panel Redesign
**File:** `components/builder/resume-form.tsx`

**Overleaf-inspired sidebar feel:**
- Left: Vertical tab list (icons + section names), compact, dark-mode friendly
- Section tabs show colored dot if section has content
- Eye (👁) icon per tab to toggle section visibility in the preview
- Tab list is scrollable if many sections

### 2.4 PDF Export Fix
**File:** `hooks/use-pdf-export.ts` *(NEW)*

Wire up `react-to-print` properly:
```ts
export function usePdfExport(ref: RefObject<HTMLDivElement>, title: string) {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: title,
    pageStyle: `@page { size: A4; margin: 0; }`,
  });
  return { exportPdf: handlePrint };
}
```
- Filename = resume title
- Page size forced to A4
- All non-resume elements hidden via print CSS

---

## Phase 3 — Templates (6 Total, from All 3 Reference Sites)

All templates receive `accentColor`, `fontFamily`, and `spacing` as props.

### Template 1: Modern ✅ (exists — refactor)
**Inspired by:** Novoresume "Hybrid"
- Clean two-column header (name left, contact right)
- Colored section dividers using accent color
- Full-width layout

### Template 2: Minimal ✅ (exists — refactor)
**Inspired by:** Novoresume "Minimalist" + Overleaf "Harshibar"
- Single column, generous whitespace
- Center-aligned name header
- Thin rule separators, no color except accent for links

### Template 3: ATS Pro ✅ (exists — refactor)
**Inspired by:** Novoresume "Traditional"
- Single column, black headers
- Bullet points, no colors
- Optimized for ATS parsers (no tables, no columns)

### Template 4: Creative *(NEW)*
**Inspired by:** Novoresume "Creative" CV (teal full-width header) + Enhancv bold style
- **Full-width colored header block** (accent color background, white text)
  - Name, job title, summary all in header
  - Contact info as icon row in header
- Body: Two-column — skills/languages/certifications (30%) + experience/education (70%)
- Bold section headings in accent color
**File:** `components/preview/templates/creative.tsx`

### Template 5: Sidebar *(NEW)*
**Inspired by:** Novoresume "Skill-Based" + Overleaf "AltaCV"
- **Left sidebar** (35%) — accent background color, white text
  - Profile photo placeholder circle
  - Contact info with icons
  - Skills with dot/bar indicators
  - Languages
  - Certifications
- **Right main** (65%) — white background
  - Experience, Education, Projects
  - Clean typography, accent used only for subheadings
**File:** `components/preview/templates/sidebar.tsx`

### Template 6: Academic *(NEW)*
**Inspired by:** Overleaf "A Customised CurVe CV" + academic precision style
- Single column, serif typography option
- Name centered at top with horizontal rule
- Publications section support
- Precise bullet formatting, understated design
- No accent color by default (purely typographic)
**File:** `components/preview/templates/academic.tsx`

---

## Phase 4 — Templates Gallery Page Overhaul

**File:** `app/templates/templates-client.tsx`

### Category Filter Tabs
```
[All]  [Clean]  [Creative]  [ATS-Friendly]  [Academic]
```

### Template Card Redesign
Each card:
- Large thumbnail (rendered mini-preview via CSS transform scale-down, or static image)
- Hover: card lifts + overlay appears with "Preview" (zoom icon) + "Use Template" button
- Badge chips: `ATS Friendly` · `Most Popular` · `Creative` · `Academic`
- "Best for": "Tech roles", "Design/Marketing", "Academia", etc.

### Preview Modal (NEW)
Click "Preview" → full-screen modal shows the template rendered with sample data:
- Can scroll through the full resume
- "Use This Template" CTA button

**File:** `components/templates/template-preview-modal.tsx` *(NEW)*

---

## Phase 5 — Additional UX Improvements

### 5.1 Section Visibility Toggles
Each form tab has an eye icon. When toggled off:
- Section is grayed out in form
- Section is hidden in `compiledData` before passing to template

### 5.2 Section Completeness Dots
In the form sidebar tab list:
- Filled green dot = section has content
- Empty grey dot = section is empty
- Helps user know what's left to fill

### 5.3 Welcome Modal (First-Time Users)
**File:** `components/builder/welcome-modal.tsx` *(NEW)*
- Appears on first visit to `/builder`
- "Start fresh" or "Use sample resume" (pre-fills with example data)
- Template picker with 6 options

### 5.4 Dashboard Improvements
**File:** `app/dashboard/dashboard-client.tsx`
- "Duplicate" button per resume card (calls new API)
- Inline title rename (click → input → save on blur)
- "Export PDF" from dashboard card (opens builder in print mode)

### 5.5 ATS Score Panel (Collapsible)
**File:** `components/builder/ats-panel.tsx` *(NEW)*
- Score 0–100 computed client-side
- Checks: Has summary? 3+ work experiences? Skills > 5? Contact complete? LinkedIn URL?
- Green/amber/red per section
- Tips list: "Add more bullet points to Work Experience"

---

## File Change Summary

| File | Action | Phase |
|---|---|---|
| `app/globals.css` | Rewrite design tokens + print CSS | 1 |
| `components/home/hero-section.tsx` | Major redesign | 1 |
| `components/home/how-it-works.tsx` | NEW | 1 |
| `components/home/testimonials-section.tsx` | NEW | 1 |
| `app/builder/builder-client.tsx` | Major rewrite (compile workflow) | 2 |
| `components/builder/style-panel.tsx` | NEW | 2 |
| `components/builder/resume-form.tsx` | Redesign sidebar tabs | 2 |
| `hooks/use-pdf-export.ts` | NEW | 2 |
| `types/resume.ts` | Add `ResumeSettings` type | 2 |
| `components/preview/templates/modern.tsx` | Refactor (accept settings props) | 3 |
| `components/preview/templates/minimal.tsx` | Refactor | 3 |
| `components/preview/templates/professional-ats.tsx` | Refactor | 3 |
| `components/preview/templates/creative.tsx` | NEW | 3 |
| `components/preview/templates/sidebar.tsx` | NEW | 3 |
| `components/preview/templates/academic.tsx` | NEW | 3 |
| `components/preview/resume-preview.tsx` | Pass settings to template | 3 |
| `app/templates/templates-client.tsx` | Redesign with filter + hover | 4 |
| `components/templates/template-preview-modal.tsx` | NEW | 4 |
| `components/builder/welcome-modal.tsx` | NEW | 5 |
| `components/builder/ats-panel.tsx` | NEW | 5 |
| `app/dashboard/dashboard-client.tsx` | Add duplicate, rename | 5 |
| `app/api/resumes/[id]/duplicate/route.ts` | NEW | 5 |

---

## Build Order (Recommended)

```
Week 1: Phase 1 + Phase 2
  → Design system (globals.css)
  → Homepage hero redesign  
  → Builder compile workflow (most important UX change)
  → PDF export fix

Week 2: Phase 3
  → Refactor 3 existing templates to accept settings
  → Build Creative template
  → Build Sidebar template  
  → Build Academic template

Week 3: Phase 4 + Phase 5
  → Templates gallery overhaul
  → Preview modal
  → Section visibility, completeness dots
  → Welcome modal
  → ATS panel
```

---

## What We Are NOT Doing
- LaTeX editor (too complex, different audience)
- Real AI suggestions (needs API key + cost)
- Cover letter builder (phase 3+)
- Mobile app
- Paywalled features (stays fully free)

---

> **Waiting for your approval to start Phase 1.**
> You can also tell me to skip or reprioritize any area.
