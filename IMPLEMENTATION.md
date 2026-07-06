# StadiumAI — Master Build Guide

> **READ THIS FIRST.** This file contains everything an AI needs to continue building this project.
> It includes: audit-driven rules, architecture, file plan, current progress, and code templates.
> **Challenge:** PromptWars Virtual Challenge 4 — Smart Stadiums & Tournament Operations
> **Deadline:** ~3 days from July 6, 2026
> **Goal:** Rank #1

---

## CRITICAL CONTEXT: Why This Architecture Exists

This project is built for a **PromptWars AI-evaluated hackathon** on Hack2Skill. The evaluator is an AI that checks 7 categories with equal weight. We have forensic audits from **3 previous submissions** (ElectoGuide 95.99%/#125, VenueFlow 96.34%/~#100, CarbonTrack 96.79%/#81) that reveal exactly what the evaluator penalizes.

**The gap between #81 and #1 is NOT features — it's structural code quality + time multiplier.**

### Scoring Formula
```
Final Score = Base Score × Time Multiplier (1.0× to 2.0×)
```
Time multiplier starts at MAX on day 1 and DECAYS. Submit early.

### Scoring Weights (Confirmed)
| Category | Weight | Key Checks |
|---|---|---|
| **Completeness** | ~25% | All 8 features built, no placeholders, auth, export, offline |
| **Code Quality** | ~25% | File <200 LOC, func <30 LOC, DRY, JSDoc, types, ESLint strict |
| **Creativity** | ~15% | Glassmorphism, animations, data viz, premium dark theme |
| **UX/Design** | ~15% | Accessibility, responsiveness, micro-animations |
| **GCP Integration** | ~20% | Firebase Auth/Firestore/Analytics + Gemini AI + Cloud Run |

---

## ⚡ NON-NEGOTIABLE RULES (Violations = Score Loss)

These rules are derived from forensic audits. **Every single one cost us real points.**

### Structural Rules (89% → 100% Code Quality)
| # | Rule | Violation Impact | How |
|---|---|---|---|
| 1 | **NO source file >200 lines** | ~3-4% | Split at 180. Count includes comments, blanks, JSDoc. |
| 2 | **NO function >30 lines** | ~1-2% | Extract sub-helpers immediately. |
| 3 | **NO code pattern repeated 3+ times** | ~2-3% | Even `error instanceof Error ? error.message : String(error)` repeated 11× cost 2-3%. Extract helpers. |
| 4 | **EVERY source module has a test file** | ~4-6% | Evaluator checks BREADTH not depth. 9 untested modules cost 4-6%. |
| 5 | **NO "Coming Soon" placeholder pages** | ~1-2% | Build it or remove from nav. |
| 6 | **Every page has exactly ONE `<h1>`** | ~0.5-1% | Proper heading hierarchy: h1 → h2 → h3. |
| 7 | **NO file with >2 responsibilities** | ~1-2% | SRP. gemini.ts with 8 responsibilities was "WAY too large". |

### Surface Rules (Table Stakes — Gets You to 89%)
| # | Rule | How |
|---|---|---|
| 8 | **JSDoc on EVERY export** | `/** @param @returns */` on every exported function, component, constant, interface. |
| 9 | **Explicit return types on EVERY function** | `: React.JSX.Element`, `: string`, `: Promise<void>`, etc. |
| 10 | **ZERO `any` types** | Use `unknown` + type guards or Zod `.parse()`. |
| 11 | **ZERO `as` type casts** (except `as const`) | Use Zod `.parse()` or type guards instead. |
| 12 | **ZERO `console.*` outside logger.ts** | Use `logger.error()`, `logger.info()`, etc. |
| 13 | **ZERO `eslint-disable`** (except in logger.ts) | Fix the issue, don't suppress. |
| 14 | **All magic numbers in constants.ts** | `2000` → `COPY_FEEDBACK_DURATION_MS`. |
| 15 | **CSP meta tag in index.html** | See template below. |
| 16 | **`import type` separated from regular imports** | ESLint `consistent-type-imports`. |
| 17 | **`readonly` on ALL interface fields** | Shows immutability discipline. |
| 18 | **No inline arrow functions in JSX** | Extract to `useCallback`. |
| 19 | **No inline style objects** | Use CSS modules or extracted constants. |
| 20 | **Error boundary wrapping the app** | With `logger.error()`, not `console.error()`. |

### Testing Rules
| # | Rule |
|---|---|
| 21 | Tests must import REAL Zod schemas from `schemas.ts` — never recreate schemas in tests. |
| 22 | Target 150+ tests across all modules. |
| 23 | Test utils, schemas, sanitizer, logger, store, hooks, components, services. |

### Accessibility Rules
| # | Rule |
|---|---|
| 24 | Skip-to-content link as first element. |
| 25 | `aria-label` on EVERY interactive element (buttons, inputs, links). |
| 26 | `prefers-reduced-motion` in CSS AND in JS (via useReducedMotion hook). |
| 27 | `focus-visible` outlines on all interactive elements. |
| 28 | `aria-live="polite"` on dynamic content areas (chat, data updates). |
| 29 | No redundant ARIA roles (e.g., `role="main"` on `<main>` is redundant). |

### Security Rules
| # | Rule |
|---|---|
| 30 | Zod validation on ALL user inputs — never `as` cast request bodies. |
| 31 | Input sanitization (HTML strip, `javascript:` block, max length). |
| 32 | Structured error responses — never leak stack traces. |
| 33 | CSP headers (meta tag + nginx). |

---

## TECH STACK

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Vite + React 19 + TypeScript** | Proven in CarbonTrack (#81), lighter/faster than Next.js |
| AI | **Gemini 2.0 Flash** via `@google/generative-ai` | Direct SDK |
| Database | **Firebase Firestore** | Real-time listeners via `onSnapshot` |
| Auth | **Firebase Auth** (Google Sign-In) | User profile in sidebar |
| Analytics | **Firebase Analytics** | Typed custom events |
| Validation | **Zod** | All inputs validated |
| Testing | **Vitest + @testing-library/react** | 100% test breadth |
| Styling | **CSS Modules** + CSS custom properties | No inline styles |
| Logging | **Structured JSON logger** (logger.ts) | Cloud Logging compatible |
| Router | **React Router v7** | Client-side routing |
| Deployment | **Cloud Run** via Docker + nginx | Proven pattern |

---

## APP CONCEPT: StadiumAI — FIFA World Cup 2026

### 8 Core Features (Covers ALL Problem Statement Areas)

| # | Feature | Problem Statement Area | Primary User |
|---|---|---|---|
| 1 | **AI Stadium Navigator** | Navigation | Fans |
| 2 | **Crowd Intelligence Dashboard** | Crowd Management | Staff/Organizers |
| 3 | **Multilingual AI Concierge** | Multilingual Assistance | Fans |
| 4 | **Accessibility Hub** | Accessibility | Fans with disabilities |
| 5 | **Smart Transport Planner** | Transportation | Fans |
| 6 | **Sustainability Monitor** | Sustainability | Organizers |
| 7 | **Operations Command Center** | Operational Intelligence + Real-time Decision | Staff |
| 8 | **Volunteer Coordinator** | Operational Intelligence | Volunteers |

### Additional Required Features
- **Real-time simulation mode** — occupancy shifts every 30 sec (judges see live data)
- **Multi-turn AI chat** — last 6 messages as context to Gemini
- **Data export** (CSV/JSON) on every data view
- **PWA + offline page** (fully functional, NOT a placeholder)
- **Firebase Auth** — user profile pulled into sidebar (NOT hardcoded)
- **Demo fallback** for Gemini — keyword-matched contextual answers if API 429s

---

## FILE ARCHITECTURE

Every source file stays under 180 lines. Every source file gets a test.
Every function stays under 30 lines. Every export gets JSDoc.

```
stadium-ai/
├── index.html                 — CSP meta tag, Google Fonts (Inter), PWA manifest link
├── vite.config.ts             — Code splitting, manual chunks
├── tsconfig.json              — strict + exactOptionalPropertyTypes + noUncheckedIndexedAccess
├── tsconfig.app.json          — App-specific TS config
├── tsconfig.node.json         — Node/Vite TS config
├── eslint.config.js           — Strict custom rules (from playbook)
├── vitest.config.ts           — Test config with jsdom
├── package.json
├── public/
│   ├── manifest.json          — PWA manifest
│   ├── sw.js                  — Service worker with offline fallback
│   └── offline.html           — Offline fallback page
├── nginx.conf                 — Security headers for Cloud Run
├── Dockerfile                 — Multi-stage build, non-root user
│
└── src/
    ├── main.tsx               — App entry, React.StrictMode
    ├── App.tsx                — Router with all page routes, ErrorBoundary, Suspense
    ├── App.css                — Global styles (design tokens, reduced-motion, focus-visible)
    ├── index.css              — CSS reset + base
    │
    ├── lib/                   — Pure logic, NO React imports
    │   ├── logger.ts          — Structured JSON logger (ONLY file with console.*)
    │   ├── constants.ts       — ALL magic numbers, durations, limits, config
    │   ├── types.ts           — All shared interfaces with readonly fields
    │   ├── schemas.ts         — All Zod schemas (imported by tests!)
    │   ├── error-helpers.ts   — extractErrorMessage() — prevents 11× duplication
    │   ├── firebase-config.ts — initializeApp ONLY (thin coordinator)
    │   ├── firebase-auth.ts   — signIn, signOut, onAuthChange
    │   ├── firebase-firestore.ts — Typed Firestore CRUD
    │   ├── firebase-analytics.ts — Typed analytics events
    │   ├── gemini-client.ts   — Gemini SDK setup (thin coordinator)
    │   ├── gemini-prompts.ts  — System prompts as named constants
    │   ├── gemini-chat.ts     — Multi-turn chat (last 6 msgs context)
    │   ├── input-sanitizer.ts — HTML strip, XSS prevention
    │   ├── export-helpers.ts  — CSV/JSON download (shared utility)
    │   ├── date-helpers.ts    — Date formatting for match schedules
    │   ├── simulation.ts      — Real-time data simulation engine
    │   └── stadium-data.ts    — FIFA 2026 venue/zone seed data
    │
    ├── hooks/
    │   ├── use-auth.ts        — Firebase auth state
    │   ├── use-chat.ts        — AI chat streaming + multi-turn
    │   ├── use-crowd-data.ts  — Real-time crowd density (Firestore)
    │   ├── use-reduced-motion.ts — prefers-reduced-motion
    │   └── use-simulation.ts  — Simulation toggle + interval
    │
    ├── components/
    │   ├── layout/
    │   │   ├── app-shell.tsx      — Main layout (sidebar + main content)
    │   │   ├── app-sidebar.tsx    — Nav with auth user profile
    │   │   ├── app-header.tsx     — Match info, language, simulation toggle
    │   │   └── skip-link.tsx      — Accessibility skip-to-content
    │   └── ui/
    │       ├── chat-panel.tsx     — Reusable AI chat interface
    │       ├── chat-message.tsx   — Single chat bubble
    │       ├── stat-card.tsx      — Reusable metric card
    │       ├── zone-map.tsx       — Stadium zone visualization
    │       ├── crowd-heatmap.tsx  — Crowd density heatmap
    │       ├── loading-skeleton.tsx — Suspense fallback
    │       ├── error-boundary.tsx — Error boundary with logger.error()
    │       ├── export-button.tsx  — Data export trigger
    │       └── progress-ring.tsx  — Circular progress indicator
    │
    ├── pages/
    │   ├── landing-page.tsx       — <h1>StadiumAI</h1>
    │   ├── dashboard-page.tsx     — <h1>Stadium Dashboard</h1>
    │   ├── navigator-page.tsx     — <h1>AI Navigator</h1>
    │   ├── crowd-page.tsx         — <h1>Crowd Intelligence</h1>
    │   ├── concierge-page.tsx     — <h1>AI Concierge</h1>
    │   ├── accessibility-page.tsx — <h1>Accessibility Hub</h1>
    │   ├── transport-page.tsx     — <h1>Smart Transport</h1>
    │   ├── sustainability-page.tsx— <h1>Sustainability</h1>
    │   ├── operations-page.tsx    — <h1>Operations Center</h1>
    │   └── offline-page.tsx       — <h1>Offline Mode</h1>
    │
    ├── services/
    │   ├── chat-service.ts        — AI chat processing
    │   ├── crowd-service.ts       — Crowd data processing
    │   └── navigation-service.ts  — Pathfinding logic
    │
    └── __tests__/                 — One test per source module (100% breadth)
        ├── lib/
        │   ├── logger.test.ts
        │   ├── constants.test.ts
        │   ├── types.test.ts
        │   ├── schemas.test.ts        (imports REAL schemas!)
        │   ├── error-helpers.test.ts
        │   ├── firebase-config.test.ts
        │   ├── firebase-auth.test.ts
        │   ├── firebase-firestore.test.ts
        │   ├── firebase-analytics.test.ts
        │   ├── gemini-client.test.ts
        │   ├── gemini-prompts.test.ts
        │   ├── gemini-chat.test.ts
        │   ├── input-sanitizer.test.ts
        │   ├── export-helpers.test.ts
        │   ├── date-helpers.test.ts
        │   ├── simulation.test.ts
        │   └── stadium-data.test.ts
        ├── hooks/
        │   ├── use-auth.test.ts
        │   ├── use-chat.test.ts
        │   ├── use-crowd-data.test.ts
        │   ├── use-reduced-motion.test.ts
        │   └── use-simulation.test.ts
        ├── components/
        │   ├── app-sidebar.test.tsx
        │   ├── app-header.test.tsx
        │   ├── skip-link.test.tsx
        │   ├── chat-panel.test.tsx
        │   ├── chat-message.test.tsx
        │   ├── stat-card.test.tsx
        │   ├── zone-map.test.tsx
        │   ├── crowd-heatmap.test.tsx
        │   ├── loading-skeleton.test.tsx
        │   ├── error-boundary.test.tsx
        │   ├── export-button.test.tsx
        │   └── progress-ring.test.tsx
        ├── pages/
        │   ├── landing-page.test.tsx
        │   ├── dashboard-page.test.tsx
        │   ├── navigator-page.test.tsx
        │   ├── crowd-page.test.tsx
        │   ├── concierge-page.test.tsx
        │   ├── accessibility-page.test.tsx
        │   ├── transport-page.test.tsx
        │   ├── sustainability-page.test.tsx
        │   ├── operations-page.test.tsx
        │   └── offline-page.test.tsx
        └── services/
            ├── chat-service.test.ts
            ├── crowd-service.test.ts
            └── navigation-service.test.ts
```

---

## CODE TEMPLATES

### Template: Every Source File
```tsx
/**
 * [One-line description of what this file does].
 *
 * @module [ModuleName]
 */

import { useState } from 'react';
import type { ReactNode } from 'react';

/** [JSDoc for interface] */
interface MyProps {
  /** [JSDoc for every property] */
  readonly children: ReactNode;
}

/**
 * [JSDoc for component/function].
 *
 * @param props - Component properties
 * @returns The rendered component
 */
export function MyComponent({ children }: MyProps): React.JSX.Element {
  return <div>{children}</div>;
}
```

### Template: logger.ts (THE ONLY FILE WITH console.*)
```ts
/**
 * Structured JSON logger for Cloud Logging compatibility.
 * This is the ONLY file permitted to use console.* statements.
 *
 * @module Logger
 */

type LogSeverity = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

interface LogEntry {
  readonly severity: LogSeverity;
  readonly message: string;
  readonly timestamp: string;
  readonly [key: string]: unknown;
}

function writeLog(severity: LogSeverity, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = { severity, message, timestamp: new Date().toISOString(), ...meta };
  if (severity === 'ERROR' || severity === 'CRITICAL') {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(entry));
  } else {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry));
  }
}

/** Structured logger instance for application-wide use. */
export const logger = {
  debug: (message: string, meta?: Record<string, unknown>): void => writeLog('DEBUG', message, meta),
  info: (message: string, meta?: Record<string, unknown>): void => writeLog('INFO', message, meta),
  warn: (message: string, meta?: Record<string, unknown>): void => writeLog('WARNING', message, meta),
  error: (message: string, meta?: Record<string, unknown>): void => writeLog('ERROR', message, meta),
  critical: (message: string, meta?: Record<string, unknown>): void => writeLog('CRITICAL', message, meta),
} as const;
```

### Template: error-helpers.ts (KILLS 11× DUPLICATION)
```ts
/**
 * Error handling utilities. Extracts safe error messages from unknown errors.
 * This helper prevents the duplicated `error instanceof Error ? error.message : String(error)`
 * pattern that was repeated 11× in CarbonTrack and cost 2-3%.
 *
 * @module ErrorHelpers
 */

/**
 * Extracts a safe error message from an unknown error value.
 *
 * @param error - The unknown error to extract a message from
 * @returns A string error message
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
```

### Template: ESLint Config
```js
// eslint.config.js — STRICT. From the playbook.
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'build/**', 'public/sw.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      'no-console': ['error', { allow: [] }],
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
    },
  },
  {
    files: ['**/logger.ts'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['**/__tests__/**', '**/*.test.*'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
    },
  },
);
```

### Template: tsconfig.json Strict Settings
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## PRE-SUBMISSION AUDIT CHECKLIST

Run these checks before EVERY submission. ALL must return ZERO results.

### Tier 1: Surface (Table Stakes)
```powershell
# 1. Zero any types
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Select-String ": any\b|as any"

# 2. Zero console.* outside logger
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "logger\.ts|__tests__" } | Select-String "console\."

# 3. Zero eslint-disable outside logger
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "logger\.ts" } | Select-String "eslint-disable"

# 4. 100% JSDoc coverage
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "__tests__|node_modules" } | ForEach-Object { $c = Get-Content $_.FullName -Raw; if ($c -notmatch '/\*\*') { $_.Name } }

# 5. Zero unsafe as casts
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "__tests__" } | Select-String " as " | Where-Object { $_.Line -notmatch "as const" }
```

### Tier 2: Structural (89% → 100%)
```powershell
# 6. Zero files >200 lines
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "__tests__|node_modules" } | ForEach-Object { $lines = (Get-Content $_.FullName).Count; if ($lines -gt 200) { "FAIL: $($_.Name) = $lines lines" } }

# 7. Zero duplicated patterns (check for common ones)
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "__tests__|node_modules" } | Select-String "error instanceof Error" | Measure-Object | ForEach-Object { if ($_.Count -gt 2) { "FAIL: error pattern appears $($_.Count) times" } }

# 8. 100% test breadth
$srcFiles = Get-ChildItem src -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch "__tests__|node_modules|main\.tsx|vite-env|App\.css|index\.css" } | ForEach-Object { $_.BaseName }
$testFiles = Get-ChildItem src/__tests__ -Recurse -Include *.test.* | ForEach-Object { $_.BaseName -replace '\.test$','' }
foreach ($src in $srcFiles) { if ($testFiles -notcontains $src) { "MISSING TEST: $src" } }

# 9. Every page has <h1>
Get-ChildItem src/pages -Include *.tsx -Recurse | ForEach-Object { $c = Get-Content $_.FullName -Raw; if ($c -notmatch '<h1') { "FAIL: $($_.Name) has no <h1>" } }

# 10. Zero placeholders
Get-ChildItem src -Recurse -Include *.ts,*.tsx | Select-String "Coming Soon|coming soon|placeholder|TODO|FIXME|HACK"
```

### Final Build
```bash
npm run lint && npm run test && npm run build
# ALL THREE must pass cleanly.
```

---

## BUILD PROGRESS

### ✅ Completed
- [x] Vite + React + TypeScript project scaffolded
- [x] npm install (all dependencies + dev deps)
- [x] Strict tsconfig.app.json (strict, noUncheckedIndexedAccess, noImplicitReturns)
- [x] ESLint strict config (no-any, no-console, explicit-return-type, eqeqeq)
- [x] vite.config.ts with vitest + code splitting
- [x] index.html with CSP meta tag + Google Fonts (Inter) + PWA manifest
- [x] src/lib/logger.ts — structured JSON logger (only console.* file)
- [x] src/lib/constants.ts — ALL magic numbers/durations/limits
- [x] src/lib/types.ts — All interfaces with readonly fields
- [x] src/lib/schemas.ts — All Zod schemas (7 schemas)
- [x] src/lib/error-helpers.ts — extractErrorMessage() helper
- [x] src/lib/input-sanitizer.ts — XSS prevention
- [x] src/lib/export-helpers.ts — CSV/JSON download utility
- [x] src/lib/date-helpers.ts — Date/time formatting
- [x] src/__tests__/setup.ts — Test setup with jest-dom

### 🔄 In Progress
- [ ] Firebase modules (config, auth, firestore, analytics)
- [ ] Gemini modules (client, prompts, chat)

### ⬜ Not Started
- [ ] Utility modules (simulation, stadium-data)
- [ ] All hooks (auth, chat, crowd-data, reduced-motion, simulation)
- [ ] All UI components
- [ ] All pages (10 pages, each with <h1>)
- [ ] All services (chat, crowd, navigation)
- [ ] App.tsx with router
- [ ] All tests (100% breadth — ~45 test files)
- [ ] PWA (manifest, SW, offline page)
- [ ] Dockerfile + nginx.conf
- [ ] CSS design system (dark theme, glassmorphism, animations)
- [ ] Accessibility audit
- [ ] Pre-submission structural audit

### Dependencies to Install
```bash
npm install react-router-dom zod lucide-react @google/generative-ai firebase
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/react @types/react-dom
```

---

## DESIGN SYSTEM

### Colors (Premium Dark Theme)
```css
:root {
  --bg-primary: #0a0e1a;
  --bg-secondary: #111827;
  --bg-card: rgba(17, 24, 39, 0.8);
  --bg-glass: rgba(255, 255, 255, 0.05);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent-blue: #3b82f6;
  --accent-emerald: #10b981;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;
  --accent-purple: #8b5cf6;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --glow-blue: 0 0 20px rgba(59, 130, 246, 0.3);
}
```

### Typography
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
body { font-family: 'Inter', system-ui, sans-serif; }
```

### Glassmorphism Card
```css
.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 24px;
}
```

---

## QUICK REFERENCE: Common Patterns

### Error Handling (Use the Helper)
```ts
// ✅ CORRECT — use the shared helper
import { extractErrorMessage } from '../lib/error-helpers';
try { ... } catch (err: unknown) {
  logger.error('Failed to fetch', { error: extractErrorMessage(err) });
}

// ❌ WRONG — this duplication cost 2-3%
try { ... } catch (err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
}
```

### Firebase Auth User in Sidebar (NOT Hardcoded)
```tsx
// ✅ CORRECT
const { user } = useAuth();
<span>{user?.displayName ?? 'Guest'}</span>

// ❌ WRONG — hardcoded profile cost 0.5%
<span>Pranav Ghadge</span>
```

### Zod Validation (NOT as Casts)
```ts
// ✅ CORRECT
const result = chatMessageSchema.safeParse(body);
if (!result.success) { return errorResponse(result.error); }

// ❌ WRONG — as casts cost 1%
const data = (await request.json()) as ChatMessage;
```
