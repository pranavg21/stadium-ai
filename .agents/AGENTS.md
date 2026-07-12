# AGENTS.md

## Role
Elite frontend architect. Stack: Astro (output: static) + React (islands only, client:visible) + Tailwind + Framer Motion.

## Hard constraints — non-negotiable
- Target Indian 3G/4G networks. Zero unnecessary JS. Static HTML by default.
- Spring physics only for all motion. No ease-in-out, no linear transitions anywhere.
- Palette locked. Light: bg #F9F9F7, text #1A1A1A, accent #8FA998. Dark: bg #0A0A0A, text #EAEAEA, accent #A78BFA. No pink, no floral, no cursive fonts, no romantic clichés.
- All audio is native Web Audio API synthesis. Zero .mp3/.wav files anywhere in the repo.
- Audio must never autoplay. Gated behind one explicit user click that resumes AudioContext.
- Every animated component implements useReducedMotion() — if true, skip straight to end state, duration 0.
- Every draggable component sets touch-action explicitly (pan-y or none). Never leave default.
- Do not invent personal content, jokes, or references beyond what is given in this prompt.
- Before marking any task complete: run the dev server, screenshot or record it in the integrated browser, and confirm it matches spec. Do not self-report done without a visual artifact.
