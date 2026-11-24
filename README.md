# Research Foundations Lab

An interactive, bilingual (English / Español) lab for learning how research works: from a first
observation to a written article. Students flip through the steps of the scientific method, explore
real cases, run a study simulator that draws **real random samples and computes real statistics**,
and turn their own everyday observations into a full research design with AI.

**Live demo:** _coming soon_ · **Category:** Education & Accessibility · Built for the
[Global STEM Innovation Challenge 2026](https://stem-innovation-challenge-2026.devpost.com/)

## The problem

Students often memorise the steps of the scientific method without ever seeing why design decisions
matter: why sample size changes everything, why one "significant" result can be luck, or why a
correlation is not a cause. Most materials are static text, available in one language, and hard to
use with a keyboard or a screen reader.

## What it does

| Module | What students do |
| --- | --- |
| **The Method** | Flip ten flashcards, from observation to communication. |
| **Research Types / Instruments / Concepts** | Flashcards for quantitative, qualitative and mixed designs; surveys, interviews and lab equipment; variables, control groups, bias and correlation vs. causation. |
| **Cases** | Four classroom studies (music and concentration, AI and first drafts, phone use and sleep, online forums) with question, variables and design. |
| **Article** | The structure of a scientific article, section by section. |
| **Simulator** | Pick a case, choose the **sample size** and the **true effect** in the population, and run the study. Each run draws a new seeded random sample; the lab computes the statistics, plots every participant, and can **repeat the study 100 times** to show statistical power, or the ~5 % false positives when there is no real effect. |
| **AI Designer** | Describe something noticed in daily life; the AI returns a complete design: question, hypothesis, variables, groups, possible bias, ethics and how to communicate it. Prepared examples keep it usable when the AI service is not configured. |

## What was built during GSIC 2026 (and what already existed)

The starting point is a Spanish-only teaching app I made in **April 2026** ("Fundamentos de la
Investigación"). It is imported unchanged as the first commit so that every change made during the
competition (which began on November 23, 2026) is visible in the history.

**Before (April 2026):** a single 1,885-line `App.jsx`, Spanish only; the simulator always showed the
same fixed bars (82 vs. 68) with no data or statistics; the AI feature called Gemini from the browser
with a `VITE_` key, which would be bundled into the public JavaScript; tabs had no ARIA semantics,
the flip cards exposed both faces to screen readers and had a fixed height that cut text when zoomed,
and some text colours were below WCAG AA contrast.

**During the competition (November 23–25, 2026):**

| Commit | Change |
| --- | --- |
| [`58cab5a`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/58cab5a) | Baseline: the April 2026 app, imported as it was. |
| [`546209e`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/546209e) | Removed dead code (an unused legacy simulator and template CSS). |
| [`5e446cf`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/5e446cf) | English as the default language; content separated from structure; `App.jsx` split into modules. |
| [`52542dd`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/52542dd) | Secure AI: a Vercel Function keeps the key on the server, validates input, limits requests and forces a JSON schema; prepared example designs. |
| [`175aaba`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/175aaba) | Accessibility: keyboard tabs (WAI-ARIA), flashcards as real buttons, visible focus, contrast, reduced motion, skip link. |
| [`27ffeb2`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/27ffeb2) | Simulator with real statistics: seeded samples, Welch's t-test, Cohen's d, Pearson's r, power by replication, accessible charts. |
| [`f476d89`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/f476d89) | Full Spanish version with correct accents; remembered language choice. |
| [`c5fbd81`](https://github.com/SantiagoBetancurZa/research-foundations-lab/commit/c5fbd81) | Redesign with the visual system of my YouTube channel; English / Español switcher. |

Development during the competition was assisted by Claude Code (Anthropic), credited as co-author
on those commits.

## Statistics, implemented from scratch

`src/lib/stats.js` has no dependencies and is covered by tests against reference values:

- Seeded random numbers (mulberry32) and normal samples (Box–Muller), so every run is reproducible.
- Student's t distribution through the regularised incomplete beta function (Lanczos log-gamma,
  continued fraction), with quantiles by bisection.
- Welch's t-test with Welch–Satterthwaite degrees of freedom and a 95 % confidence interval.
- Cohen's d with the pooled standard deviation.
- Pearson's r with its t-test, a Fisher-z confidence interval and the least-squares line.
- Empirical power: the same study repeated 100 times with new samples.
- p-values formatted in APA style (`p = .032`, `p < .001`), with a decimal comma in Spanish.

## Accessibility

- Tabs follow the WAI-ARIA pattern: one Tab stop, then ←/→/Home/End.
- Flashcards are real buttons with `aria-expanded`; the hidden face is `aria-hidden`, and cards grow
  with text zoom instead of clipping it.
- Visible focus ring that adapts to the surface (white on blue, ink on white); a skip link; focus
  moves to each simulator step's heading; results are announced politely.
- Text contrast of at least 4.5:1, checked on every tab and simulator state in both languages.
- `prefers-reduced-motion` is respected (no flips, lifts or fades).
- Every chart is an SVG with a title and a description, and its key numbers are also given as text.
- The page language (`lang`) follows the selected language; each language name in the switcher is
  marked with its own language.
- Inclusive Sans, a typeface designed for legibility, is used throughout.

## Security and privacy

- The Gemini key exists only on the server (`GEMINI_API_KEY`); no key reaches the browser bundle.
- `/api/design` accepts JSON only, limits the body to 4 KB and the text to 15–1,200 characters,
  strips control characters, rate-limits each IP (8 requests per minute, best effort), times out
  after 25 s, falls back to a second model and returns friendly error codes.
- The model must answer with a fixed JSON schema; the observation is treated as data, not as
  instructions.
- No accounts, cookies or analytics. The only thing stored is the language choice, in the
  browser. The font is self-hosted, so no third-party font server is contacted. The observation is
  sent to Google's Gemini API only when the student presses **Generate**.

## Run it locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev       # http://localhost:5173 — the AI Designer shows the prepared examples
npm test          # statistics and API tests (node:test)
npm run lint
npm run build
```

To try the live AI Designer locally, copy `.env.example` to `.env.local`, add a Gemini API key and
run `vercel dev`. Never use the `VITE_` prefix for the key: Vite would publish it.

## Deploy

Import the repository in Vercel (framework: Vite) and add `GEMINI_API_KEY` under
**Settings → Environment Variables**. `GEMINI_MODEL` is optional.

## Project structure

```
api/design.js           Vercel Function: POST /api/design (GET reports availability)
api/_lib/design.js      validation, prompt, schema, model fallback, rate limiter
src/content/            course content: structure.js (ids, icons) + en.js / es.js (text)
src/i18n/               interface strings and the language provider
src/lib/stats.js        statistics
src/lib/simulations.js  data generators for the four cases
src/components/         tabs, flashcards, charts, language switcher
src/tabs/               one file per module
tests/                  node:test suites
```

## Built with

React 19, Vite 8, Tailwind CSS 4, lucide-react icons, Inclusive Sans (Fontsource, SIL OFL),
Vercel Functions and the Google Gemini API.

## License

[MIT](LICENSE) © 2026 Santiago Betancur Zapata · [santiagobetancur.site](https://santiagobetancur.site)
