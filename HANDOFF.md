# PROJECT HANDOFF — Z5meta Portfolio (v2 — Software Theme Rebuild)

> **Read this entire file before touching any code.** Multi-AI relay project.
> Update this file before finishing your session.

---

## 0. WHO THIS IS FOR

Any AI assistant (Claude, GPT, Gemini, etc.) picking up this project mid-stream.

---

## 1. WHAT CHANGED FROM v1 (PCB/chip theme)

The original 5-phase build (see design system below for what was replaced) used
a PCB/circuit-board visual language — copper-etched text, IC-chip cards, pin
headers, animated SVG traces. **Zem asked for a full pivot** away from that:

- **New theme:** modern SaaS/software-product look — clean cards, soft
  shadows, indigo→teal gradient accents. No chip/circuit imagery anywhere.
- **Multi-page, not single-scroll:** split into 5 real HTML pages —
  `index.html` (Home), `about.html`, `projects.html`, `skills.html`,
  `contact.html`. Each has its own `<title>`/meta and is a full page load,
  not an anchor-scroll section.
- **Light/dark theme toggle:** `data-theme` attribute on `<html>`, persisted
  in `localStorage` (`z5meta-theme` key), defaults to system preference.
  Toggle button lives in the topbar on every page (`js/theme.js`).
- **Device-distinct navigation (not just responsive resize):**
  - **Mobile (<700px):** slim topbar (logo + theme toggle only) + a fixed
    **bottom tab bar** (`js/main.js` handles active-state, markup is
    per-page in each HTML file's `<nav class="tabbar">`), native-app style.
  - **Tablet (700–1023px):** topbar grows a condensed inline nav with
    icon+label pairs.
  - **Desktop (≥1024px):** full topbar nav, text-only links (icons hidden),
    underline-glow active/hover state, plus a `cta-mini` "Let's talk" button
    that's hidden below desktop.
  - See `css/nav.css` — breakpoints and rules are there, not scattered.
- **Fixed viewport / no zoom / no long-press:**
  - `<meta viewport>` has `maximum-scale=1.0, user-scalable=no` on every page.
  - `css/base.css` sets `-webkit-user-select: none` / `-webkit-touch-callout:
    none` on `body`, then re-enables selection explicitly on real reading
    content (`p, li, h1-h4, .selectable`, form inputs) so text is still
    copyable where it should be — only chrome (nav, buttons, cards-as-whole)
    suppresses the long-press callout menu.
  - `touch-action: manipulation` removes double-tap-to-zoom delay site-wide.
- **Signature element:** the "build pipeline" strip on the homepage hero
  (`.pipeline` in `components.css`, animated in `main.js`) — a
  `write → build → test → ship` status row that lights up sequentially on
  load. This replaces the old circuit power-on animation as the one bold
  animated moment; respects `prefers-reduced-motion` (jumps straight to all
  "done" state).

---

## 2. DESIGN SYSTEM (v2 — LOCKED, do not deviate without asking Zem)

**Concept:** modern software/product studio — the kind of visual language a
polished SaaS dashboard or dev-tool landing page uses. Deliberately NOT
PCB/circuit/chip imagery.

### Color tokens (`css/tokens.css`, dark is default, `[data-theme="light"]` overrides)
| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0B0D12` | `#F7F8FA` | Page background |
| `--bg-card` | `#161A24` | `#FFFFFF` | Card/panel surfaces |
| `--brand-indigo` | `#5B5FEF` | same | Primary accent |
| `--brand-teal` | `#22D3B8` | same | Secondary accent (gradient partner) |
| `--text-primary` | `#F1F2F6` | `#14161F` | Headings, primary text |
| `--text-secondary` | `#ABB0C0` | `#52586B` | Body copy |
| `--border` | `#262B3A` | `#E4E6EE` | Card/section borders |

`--brand-gradient` = `linear-gradient(135deg, indigo, teal)` — used on
buttons, active nav underline, icon tiles, pipeline dots. Used sparingly per
frontend-design principles — not on every element.

### Typography
- **Display/headings:** `Space Grotesk` (Google Fonts) — geometric,
  software-y, replaces the old JetBrains Mono display usage
- **Body:** `Inter` — unchanged from v1
- **Utility/mono (tags, eyebrows, stat labels):** `IBM Plex Mono` — replaces
  JetBrains Mono in that role

### Layout language
- Rounded cards (`--r-lg` = 22px), soft shadows (`--shadow-md`), NOT the old
  sharp-cornered chip-with-pins motif
- Pill-shaped buttons and filter chips
- Eyebrow labels use a small gradient dot instead of the old uppercase-only
  styling — kept the uppercase-mono convention, changed the accent

### Motion
- Reveal-on-scroll via `IntersectionObserver` (`js/main.js`, `.reveal` class)
  — same mechanism as v1, kept because it works well
- Skill bars fill on scroll-into-view (`skills.html`)
- Pipeline strip animates once on homepage load
- All motion respects `prefers-reduced-motion` (see `base.css` global query)

---

## 3. FILE STRUCTURE (flat — GitHub Pages root deploy)

All files sit at repo root, no subfolders, so `index.html` and everything it
references works directly from a GitHub Pages root deploy with no base-path
config needed.

```
/
├── index.html              ← Home
├── about.html                ← About (bio + timeline)
├── projects.html               ← Projects (filterable grid)
├── skills.html                    ← Skills (animated skill bars)
├── contact.html                      ← Contact (form + channel cards)
├── HANDOFF.md                          ← this file — READ FIRST
├── css-tokens.css         ← color/type/spacing/radius variables (LOCKED)
├── css-base.css             ← reset, base type, no-zoom/no-long-press rules
├── css-nav.css                 ← topbar + tabbar, ALL device-tier breakpoints
├── css-components.css             ← cards, buttons, hero, pipeline, forms, etc.
├── js-theme.js             ← light/dark toggle + localStorage persistence
├── js-main.js                 ← reveal-on-scroll, pipeline anim, active-nav
├── js-project-filter.js          ← projects.html category filter
└── js-contact-form.js               ← builds mailto: link from form fields
```

**Naming convention:** CSS files are prefixed `css-`, JS files `js-`, so
they sort together and stay unambiguous at root without needing folders.
If you add a new stylesheet or script, follow the same `css-name.css` /
`js-name.js` pattern and reference it as a bare filename (no `css/` or
`js/` prefix) in every HTML `<link>`/`<script>` tag.

Every page repeats the same topbar/tabbar/footer markup block (no
templating layer since this is a no-build static site) — if you add a page,
copy an existing page's header/footer exactly and update the `is-active`
class + `data-nav-link` targets in both the topbar and tabbar nav.

---

## 4. CONTENT NOTES

- Contact form targets `frosternx@gmail.com` (set in `js/contact-form.js`
  `CONTACT_EMAIL` const) — same as v1. Brand address
  `z5metaofficial@gmail.com` is shown as a separate channel card on
  `contact.html`, not wired into the form. Same open question as v1: confirm
  with Zem if the brand address should be the form target instead.
- Project content (Mpro/TextPro, TextPro Android, TicTacITZ, Camuz, Three.js
  experiments, HtmlSimulator, RPG bot, photo-styling bot, dual-ESP32 concept)
  was pulled from known project history — real project names/descriptions,
  not placeholders. If Zem has more recent status changes (e.g. HtmlSimulator
  ships), update the `.project-status` badge class
  (`status-shipped`/`status-active`) and copy in `projects.html`.
- **Live deploy links (added, confirmed by Zem):**
  - TextPro (web/Mpro card) → `https://text5pro.vercel.app`
  - TicTacITZ → `https://1tic.vercel.app`
  - Camuz (new card, quick-snap camera web app — category `web`) →
    `https://camuz.vercel.app`
  - These render as a "View live ↗" link (`.card-live-link` in
    `components.css`) inside the project card, opens in a new tab
    (`target="_blank" rel="noopener noreferrer"`). Other cards (TextPro
    Android, Three.js experiments, HtmlSimulator, RPG bot, photo-styling
    bot, dual-ESP32) have no live link yet since they're not deployed
    standalone — add the same `.card-live-link` markup if/when Zem shares
    URLs for those too.
  - Camuz's description ("quick-snap camera web app") is inferred from the
    name + Zem's one-line framing only — no deeper feature list was given.
    Flag to Zem to confirm/expand if they want more detail than the current
    one-sentence description.
- Skill percentages in `skills.html` are reasonable estimates based on
  project history depth, not measured — flag to Zem if they want to
  self-rate instead.
- No OG image / social preview asset carried over from v1 — v1's
  `assets/og-image.svg` was PCB-themed and doesn't fit the new visual
  system. **Open TODO for next session:** design a new OG image (1200×630)
  in the software/gradient visual language and wire up `og:image`/
  `twitter:image` meta tags (currently absent on all pages).
- No favicon PNG fallback — using an inline data-URI SVG (`Z5` on gradient
  square) same pattern as v1 used for its circuit-node favicon.
- Domain/canonical URL not set — v1 used a placeholder `z5meta.dev`, this
  version doesn't set `rel="canonical"` at all yet. Confirm real domain with
  Zem before adding it back.

---

## 5. NOT DONE YET / OPEN ITEMS

- No formal Lighthouse/cross-browser pass done this session (no network
  access in this sandbox to run one).
- No automated tests for the mailto contact form — manually reasoned through
  the encode/decode logic only.
- `about.html` timeline is short (3 entries) — could be expanded with more
  specific dates/milestones if Zem wants a fuller career narrative.
- Consider adding real screenshots/preview images to project cards once
  Zem has some to share — currently text/icon only, no visual project
  previews.
