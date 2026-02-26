# Theme Refresh Research

> **Date:** 2026-02-26
> **Status:** Research in progress
> **Goal:** Move the site from a generic Bootstrap feel to a polished, distinctive visual identity — editorial/magazine meets developer/technical, with cool tones, calming palette, and spacious feel.
>
> **Decisions:**
> - **Fonts:** Option A — Newsreader (headings) + IBM Plex Sans (body) + IBM Plex Mono (code)
> - **Colors:** Palette 3 — Cool Minimal (pure white bg, dark blue-gray text, clean blue accent)

## Current State

The site uses Minima 2.5 with Bootstrap 5 and a two-layer variable architecture (SCSS variables for Bootstrap overrides, CSS custom properties for runtime theming). The visual identity is functional but generic:

- **Typography:** System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`) — Bootstrap's default. No personality.
- **Colors:** Primary `#0060df` (functional blue), GitHub-like dark mode (`#0d1117` bg, `#c9d1d9` text, `#4dabf7` links). Reads as "developer tool."
- **Visual language:** Flat surfaces, minimal shadows, 1px borders, pill-shaped tags, uppercase letter-spaced section titles. Could be any Bootstrap site.
- **Layout:** Standard 8/4 grid, sticky header with hamburger at `md`, centered 42rem content column.

The two-layer variable architecture means most of the identity lives in `_variables.scss`, so a visual refresh doesn't require restructuring CSS partials or layouts.

## Design Direction

- **Vibe:** Editorial/magazine authority + developer/technical precision
- **Color temperature:** Cool tones (blues, slates, teals). Blue is in play.
- **Feeling:** Calming, spacious, polished
- **Scope:** Visual refresh first (fonts, colors, spacing), layout rethinking later

## Spaciousness Techniques

Research surfaced specific techniques for creating the spacious, calming feel:

1. **Low-chroma backgrounds.** Near-white with a subtle hue tint (not pure `#ffffff`). Content floats; the background recedes.
2. **Restrained contrast range.** Dark blue-grays or charcoals for body text (10:1–15:1 range) instead of pure black (21:1). Still well above WCAG AA but calmer.
3. **Muted text hierarchy.** Visible but restrained difference between body, headings, and meta text. The muted layer is clearly subordinate but still readable (4.5:1+).
4. **One distinctive accent, used sparingly.** Restraint creates openness. Less color = more powerful per instance.
5. **Surface elevation through tonal shifts.** Cards and code blocks differ by background shade rather than hard borders. Surfaces "float" through color difference.
6. **Cool tones recede.** Blues, slates, and teals are psychologically "receding" colors — they feel farther away, creating a sense of openness.

---

## Font Pairings

### Loading Strategy

Self-host as WOFF2 variable fonts. This is the recommended approach for 2025–2026:

- **Performance:** Browser cache partitioning (Chrome 86+, Firefox 85+, Safari) eliminated the CDN advantage. Self-hosting removes the extra DNS lookup and TLS handshake to Google's servers.
- **Privacy/GDPR:** No visitor IP addresses sent to Google. A German court ruled in 2022 that Google Fonts CDN violates GDPR.
- **Reliability:** No dependency on Google's servers.

Implementation:

1. Download WOFF2 variable font files (use [google-webfonts-helper](https://gwfh.mranftl.com/) or download directly from Google Fonts)
2. Place in `assets/fonts/`
3. Define `@font-face` declarations with `font-display: swap` in `assets/main.scss`
4. Preload critical fonts (body + heading) in `_includes/head.html` — max 2–3 preloads
5. Do NOT preload monospace (below the fold in most layouts)
6. The `crossorigin` attribute is required on preload links even for same-origin fonts

### Option A: Newsreader + IBM Plex Sans + IBM Plex Mono

**Category:** Serif headings + sans-serif body (classic editorial)

| Role | Font | Weights | Variable? |
|------|------|---------|-----------|
| Headings | Newsreader | 200–800 + italics | Yes (with optical size axis) |
| Body | IBM Plex Sans | 100–700 + italics | Yes |
| Code | IBM Plex Mono | 100–700 + italics | Yes |

**Why it works:**

- Newsreader was commissioned by Google, designed by Production Type for long-form on-screen reading. It has a classic newspaper editorial feel with modern refinement.
- Newsreader's optical size axis (`opsz`) automatically adjusts x-height, contrast, and spacing for different sizes (captions, text, display). The font optimizes itself for context — a significant accessibility win.
- IBM Plex Sans has humanist warmth layered over geometric structure. Subtle distinguishing details (seriffed uppercase I, tailed lowercase l) give it character without distraction.
- The IBM Plex superfamily (Sans, Serif, Mono) shares design DNA, so code blocks feel native to the rest of the page. This is the strongest advantage of this pairing.
- Newsreader's sharp, high-contrast serifs at display sizes create unmistakable editorial authority. Neither font is the default of anything.

**Accessibility:** Newsreader's optical size axis is a standout feature. IBM Plex Sans has open letterforms and consistent stroke widths, performing well at 16–18px. Both have excellent character differentiation (1/l/I, 0/O).

**Feel:** Newspaper editorial meets developer tooling. Composed, authoritative, calm.

### Option B: Fraunces + Source Sans 3 + Source Code Pro

**Category:** Serif headings + sans-serif body (expressive editorial)

| Role | Font | Weights | Variable? |
|------|------|---------|-----------|
| Headings | Fraunces | 100–900 + italics | Yes (with optical size, softness, wonk axes) |
| Body | Source Sans 3 | 200–900 + italics | Yes |
| Code | Source Code Pro | 200–900 + italics | Yes |

**Why it works:**

- Fraunces is an expressive "Old Style" soft-serif with a warm, retro-modern personality. Designed by Phaedra Charles and Flavia Zimbardi, commissioned by Google Fonts.
- Fraunces has four variable axes: weight, optical size, softness (SOFT), and wonk (WONK). The wonk axis introduces playful, organic letter substitutions. This level of personality in headings immediately signals intentional design.
- Source Sans 3 (updated Source Sans Pro) is Adobe's first open-source typeface — neutral, highly legible, and refined without being sterile.
- Source Code Pro completes the Adobe Source family for code blocks. The same seamless sans-to-mono transition as Option A's IBM Plex family.

**Accessibility:** Fraunces has a generous x-height and clear letterforms at all sizes. Source Sans 3 was designed from the start for screen readability. Both perform well for users with dyslexia due to distinct letterforms.

**Feel:** More personality than Option A. Warm, inviting, slightly playful headings against clean body text.

### Option C: Space Grotesk + IBM Plex Sans + IBM Plex Mono

**Category:** Sans-serif headings + sans-serif body (modern technical)

| Role | Font | Weights | Variable? |
|------|------|---------|-----------|
| Headings | Space Grotesk | 300–700 | Yes (no italics) |
| Body | IBM Plex Sans | 100–700 + italics | Yes |
| Code | IBM Plex Mono | 100–700 + italics | Yes |

**Why it works:**

- Space Grotesk is derived from Space Mono (by Colophon Foundry). It retains the monospace font's idiosyncratic, slightly quirky geometric details but adapts them for proportional text.
- Rounded terminals, diagonal cuts, and oval counters create a quietly distinctive identity that signals "built by people who care about code."
- Paired with IBM Plex Sans (developer-world associations through the IBM brand), the combination feels like a design system from a technical company, not a template.

**Accessibility:** Space Grotesk has a generous x-height and open counters. At heading sizes (24px+), its geometric forms are clear and scannable. No true italics — relies on oblique or weight contrast. For heading-only use, this is acceptable.

**Feel:** Developer-first. Clean, geometric, quietly distinctive. Less editorial, more Vercel/Linear.

### Monospace Options (for any pairing)

| Font | Character | Best Paired With |
|------|-----------|-----------------|
| **IBM Plex Mono** | Humanist, old-school typewriter modernized. No ligatures by default. Feels "designed" when used for dates/metadata. | IBM Plex Sans (naturally), Source Sans 3, Newsreader pairings |
| **JetBrains Mono** | Designed for developers. 147 optional code ligatures. Increased letter height. Clean, modern. | Inter, IBM Plex Sans, Outfit — geometric/modern sans-serifs |
| **Source Code Pro** | Adobe's neutral monospace. Clean, doesn't draw attention. Well-tested hinting at small sizes. | Source Sans 3, Libre Franklin — safe, seamless choice |

### Additional Pairings Researched (Runners-Up)

**Literata + Inter + JetBrains Mono:** Literata was Google Play Books' default — purpose-built for extended screen reading. Inter is one of the most carefully engineered screen sans-serifs. Strong pairing but Inter is becoming ubiquitous, which works against distinctiveness.

**Libre Franklin + Source Sans 3 + Source Code Pro:** Libre Franklin channels Franklin Gothic's century-long editorial legacy. Feels "editorial publication that covers technical topics" — think Wired or Ars Technica. 9 weights with italics.

**Outfit + Inter + JetBrains Mono:** Outfit is geometric with slightly rounded warmth. Contemporary and polished. No true italics. Risk: Inter's ubiquity.

---

## Color Palettes

All three palettes are WCAG 2.2 AA compliant for normal text (4.5:1) on both primary and secondary backgrounds, in both light and dark modes. Dark mode accent colors use the 300–400 range (desaturated) to avoid eye strain on dark backgrounds.

### Palette 1: Slate & Teal

**Mood:** Calm, focused, quietly confident. An architect's studio with a glimpse of ocean. Slate grays provide a composed, neutral foundation; teal adds life without loudness.

**Why it's distinctive:** Teal is uncommon in developer blogs. The slate foundation reads as sophisticated and restrained. Strongest dark mode of the three (rich slate-navy instead of generic dark gray).

#### Light Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#f8fafc` | — | Slate-tinted off-white. Cool but not sterile. |
| Card/alt background | `#f1f5f9` | — | Slightly deeper slate tint. Code blocks, cards, sidebar. |
| Inline code background | `#e8eef4` | — | Noticeably tinted for inline code distinction. |
| Body text | `#1e293b` | 13.98:1 | Dark slate. Rich, not black. |
| Headings | `#0f172a` | 17.06:1 | Near-black slate. |
| Muted/meta text | `#5b6a7d` | 5.28:1 (5.04:1 on alt) | Cool blue-gray. |
| Primary accent (links) | `#0f766e` | 5.23:1 | Teal-700. Earthy, grounded. |
| Link hover | `#0e6b64` | 6.07:1 | Slightly darker teal. |
| Tag text / Tag bg | `#115e59` / `#ccfbf1` | 6.73:1 | Dark teal on pale teal. |
| Border (decorative) | `#cbd5e1` | — | Subtle slate. Separators, card outlines. |
| Border (interactive) | `#728494` | 3.69:1 | Darker slate for form inputs. |
| Success | `#15803d` | 4.79:1 | Forest green. |
| Error | `#b91c1c` | 6.18:1 | Deep red. |

#### Dark Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#0f172a` | — | Deep slate-navy. Rich but not pure black. |
| Card/alt background | `#1e293b` | — | Elevated slate surface. |
| Inline code background | `#1a2535` | — | Slightly lighter than alt bg. |
| Body text | `#e2e8f0` | 14.48:1 | Cool off-white. |
| Headings | `#f1f5f9` | 16.30:1 | Near-white. |
| Muted/meta text | `#94a3b8` | 6.96:1 (5.71:1 on alt) | Desaturated slate. |
| Primary accent (links) | `#2dd4bf` | 9.59:1 | Teal-400, desaturated for dark mode. |
| Link hover | `#5eead4` | 12.07:1 | Lighter teal. |
| Tag text / Tag bg | `#5eead4` / `#1a3a36` | — | Light teal on dark teal. |
| Border (decorative) | `#334155` | — | Subtle dark slate. |
| Border (interactive) | `#5e7384` | 3.62:1 | Visible slate for form inputs. |
| Success | `#4ade80` | 10.25:1 | Bright green. |
| Error | `#fca5a5` | 9.41:1 | Soft red. |

### Palette 2: Deep Blue & Warm Gray

**Mood:** Scholarly, contemplative, trusted. A leather-bound journal in a university library. Indigo accent carries intellectual weight; warm stone grays soften what could otherwise feel cold and formal.

**Why it's distinctive:** Indigo + warm gray is rare in developer blogs (which tend toward cool grays + blue). Reads as more editorial and less utilitarian. Most "magazine" of the three.

#### Light Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#fafaf9` | — | Warm off-white (stone-50). Slightly creamy. |
| Card/alt background | `#f5f5f4` | — | Stone-100. Warm gray tint. |
| Inline code background | `#edecea` | — | Warm tinted for inline code distinction. |
| Body text | `#1c1917` | 16.74:1 | Near-black warm. |
| Headings | `#1e1b4b` | 15.31:1 | Indigo-950. Dark indigo. |
| Muted/meta text | `#6d6862` | 5.28:1 (5.06:1 on alt) | Warm gray. |
| Primary accent (links) | `#4338ca` | 7.57:1 | Indigo-700. Deep, rich. |
| Link hover | `#3730a3` | 9.51:1 | Indigo-800. Deeper. |
| Tag text / Tag bg | `#3730a3` / `#e0e7ff` | 8.06:1 | Dark indigo on pale lavender. |
| Border (decorative) | `#d6d3d1` | — | Warm stone divider. |
| Border (interactive) | `#8a847f` | 3.54:1 | Medium warm gray. |
| Success | `#166534` | 6.83:1 | Dark green. |
| Error | `#dc2626` | 4.62:1 | Classic red. |

#### Dark Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#171923` | — | Blue-tinted near-black. |
| Card/alt background | `#1e2030` | — | Slightly elevated blue-dark. |
| Inline code background | `#211f2d` | — | Subtly purple-tinted dark surface. |
| Body text | `#e7e5e4` | 13.94:1 | Warm off-white. |
| Headings | `#f5f5f4` | 16.04:1 | Near-white. |
| Muted/meta text | `#a8a29e` | 6.94:1 (6.38:1 on alt) | Desaturated warm gray. |
| Primary accent (links) | `#a5b4fc` | 8.78:1 | Indigo-300. Lavender. |
| Link hover | `#c7d2fe` | 11.73:1 | Indigo-200. Lighter lavender. |
| Tag text / Tag bg | `#c7d2fe` / `#252340` | — | Light lavender on deep indigo. |
| Border (decorative) | `#2d3048` | — | Deep blue-gray. |
| Border (interactive) | `#686b88` | 3.37:1 | Indigo-tinted gray. |
| Success | `#4ade80` | 10.04:1 | Bright green. |
| Error | `#fca5a5` | 9.22:1 | Soft red. |

### Palette 3: Cool Minimal

**Mood:** Clean, precise, modern. A Scandinavian design studio. Maximum restraint with one confident blue accent. Typography and whitespace do all the heavy lifting.

**Why it's distinctive:** It isn't, inherently — this palette depends entirely on typography carrying the personality. Most spacious of the three but highest risk of feeling generic. Best if paired with a strong font choice (Options A or B).

#### Light Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#ffffff` | — | Pure white. Maximum spaciousness. |
| Card/alt background | `#f4f7fa` | — | Cool-tinted off-white. Barely there. |
| Inline code background | `#eef2f7` | — | Subtle cool tint for inline code. |
| Body text | `#2c3e50` | 10.98:1 | Dark blue-gray. Not black. |
| Headings | `#1a2332` | 15.78:1 | Very dark blue-gray. |
| Muted/meta text | `#5b697b` | 5.60:1 (5.21:1 on alt) | Cool blue-gray. |
| Primary accent (links) | `#2563eb` | 5.17:1 | Blue-600. Clean, confident. |
| Link hover | `#1d4ed8` | 6.70:1 | Blue-700. Deeper. |
| Tag text / Tag bg | `#1e40af` / `#dbeafe` | 7.15:1 | Dark blue on pale blue. |
| Border (decorative) | `#e2e8f0` | — | Very subtle cool gray. |
| Border (interactive) | `#8595a7` | 3.06:1 | Cool gray for inputs. |
| Success | `#15803d` | 5.02:1 | Forest green. |
| Error | `#dc2626` | 4.83:1 | Classic red. |

#### Dark Mode

| Token | Hex | Contrast on Page BG | Role |
|-------|-----|---------------------|------|
| Page background | `#111827` | — | Very dark blue-gray. |
| Card/alt background | `#1f2937` | — | Elevated dark surface. |
| Inline code background | `#1a2030` | — | Slightly different from alt bg. |
| Body text | `#e5e7eb` | 14.33:1 | Cool off-white. |
| Headings | `#f3f4f6` | 16.12:1 | Near-white. |
| Muted/meta text | `#9ca3af` | 6.99:1 (5.78:1 on alt) | Desaturated cool gray. |
| Primary accent (links) | `#60a5fa` | 6.98:1 | Blue-400. Desaturated. |
| Link hover | `#93c5fd` | 9.84:1 | Blue-300. Lighter. |
| Tag text / Tag bg | `#93c5fd` / `#1a2744` | — | Light blue on deep blue. |
| Border (decorative) | `#374151` | — | Subtle dark gray. |
| Border (interactive) | `#5a6a80` | 3.22:1 | Visible gray for inputs. |
| Success | `#4ade80` | 10.18:1 | Bright green. |
| Error | `#fca5a5` | 9.35:1 | Soft red. |

### Palette Comparison

| Criteria | Slate & Teal | Deep Blue & Warm Gray | Cool Minimal |
|----------|-------------|----------------------|--------------|
| Distinctiveness | High — teal is uncommon | High — indigo + warm gray is rare | Medium — blue is common |
| Editorial feel | Strong — composed, architectural | Strongest — scholarly, print-like | Good — minimal, Scandinavian |
| Spaciousness | Strong — cool slate recedes | Good — warm grays slightly heavier | Strongest — pure white, minimal color |
| Dark mode quality | Excellent — slate-navy is rich | Very good — blue-tinted dark | Good — standard dark gray |
| Muted text contrast | 5.28:1 to 17.06:1 | 5.28:1 to 16.74:1 | 5.60:1 to 15.78:1 |
| All combos AA? | Yes | Yes | Yes |
| Risk of generic | Low | Low | Medium |
| Implementation complexity | Medium | Medium-High (warm + cool mix) | Low |

---

## Other Theme Ideas to Explore

The following areas have not been researched yet but were identified as part of the visual refresh scope:

### Visual Language
- **Border treatment:** Reduce reliance on 1px solid borders. Use tonal surface elevation (background shade differences) instead of hard lines where possible.
- **Shadow system:** Consider subtle, layered shadows for depth (cards, header on scroll, dropdowns) instead of flat + border.
- **Border radius:** Evaluate current pill (1rem) and badge (0.75rem) radii. Consider a more consistent radius scale.

### Spacing & Rhythm
- **Vertical rhythm:** Evaluate the current spacing scale (xs through xxl) for consistency with the chosen body font's line-height and cap-height.
- **Content width:** Current max-width is 42rem. May benefit from adjustment depending on chosen body font's ideal characters-per-line (typically 60–75 characters).

### Component Refinements

Detailed analysis of current component styling and options for each. These are cross-cutting patterns — decisions here cascade across multiple components.

#### Pattern 1: Border-Heavy Separation

**Current state:** Almost every component uses `1px solid --color-border` as dividers — post cards (bottom), related posts (bottom), post nav (top), footer (top), newsletter CTA (top), social share (bottom), article TOC (all sides). This creates a lot of visual lines on the page, which works against the spacious, minimal feel.

**Components affected:** Post cards, related posts, post navigation, footer, newsletter CTA, social share, article TOC.

**Options:**
- **A. Spacing-only separation** — remove borders between post cards entirely, let generous whitespace do the work. Most minimal.
- **B. Selective borders** — keep borders only for major section breaks (post nav, footer) and drop them from repeating list items (post cards, related posts). Balanced approach.
- **C. Tonal separation** — use subtle background color shifts instead of lines (e.g., alternating cards on the `--color-bg-alt` background). Surface elevation over hard lines.

#### Pattern 2: Uppercase Letter-Spaced Labels

**Current state:** Sidebar section titles, TOC heading, newsletter heading, and post nav labels all use `text-transform: uppercase` + `letter-spacing: 0.05em`. This is a Bootstrap convention that reads as utilitarian. With Newsreader as the heading font, there are more expressive options.

**Components affected:** Sidebar section titles, article TOC heading, newsletter CTA heading, post nav "Previous"/"Next" labels.

**Options:**
- **A. Small caps** — Newsreader supports them. More refined and editorial than full uppercase.
- **B. Regular case with weight contrast** — semibold or bold at a small size in IBM Plex Sans. Calmer, more editorial.
- **C. Newsreader at small sizes** — use the heading font for section labels. The optical size axis will optimize it automatically for small sizes.

#### Pattern 3: Tag Pills

**Current state:** Bordered pills with background fill (`--color-tag-bg`), 1px border, 1rem border-radius, 0.75rem font-size. They're visually chunky and draw a lot of attention. In the Cool Minimal palette, heavy tag styling could fight the clean aesthetic.

**Components affected:** Post pages (new `post__tags` section), tag archive pages, sidebar tags widget, tags index page.

**Options:**
- **A. Ghost tags** — no background, just a subtle border. Lighter presence on the page.
- **B. Text-only tags** — no pill, no border. Just colored text with a separator (comma or middot). Most minimal.
- **C. Softer pills** — keep the pill shape but remove the border, use only a light background tint (`--color-bg-alt` / `#f4f7fa`). Quieter presence.

#### Pattern 4: Article TOC

**Current state:** Bordered card with background fill (`--color-bg-alt`), `1px solid --color-border`, `0.75rem` border-radius, `1.5rem` padding. It looks like a callout box — visually heavy. Active item has a `2px solid --color-primary` left border and bold text.

**Components affected:** Article TOC (in-post), indirectly sets the visual tone for other card-like containers.

**Options:**
- **A. Borderless with left accent** — remove the card treatment entirely. Use a left border in the primary color on the whole TOC, or just on the active item. More editorial.
- **B. Inline with spacing** — no background, no border. Just an indented list with smaller text. Let the heading and whitespace define the TOC area.
- **C. Soften the card** — remove the border but keep the subtle background. Lighter than current but still visually distinct from body content.

#### Pattern 5: Social Share Buttons

**Current state:** Brand-colored circles (44px) with a lift-on-hover effect (`translateY(-2px)` + `box-shadow`). Brand colors: X (#000), LinkedIn (#0a66c2), Reddit (#ff4500). Primary color for Email, Copy, Share, Comments. In dark mode, buttons get a `rgba(255,255,255,0.1)` background with lighter brand colors.

**Components affected:** Social share section on post pages.

**Consideration:** The brand-colored circles create a colorful strip that contrasts sharply with the restrained Cool Minimal palette. The hover animation is nice but the overall treatment is the most visually assertive component on the page. Options to explore:
- Keep brand colors but on a muted/ghost background instead of solid circles
- Use a single muted color for all icons, reserving brand colors for hover only
- Reduce button size or switch to inline icon links instead of circles

#### Pattern 6: Post Cards

**Current state:** List items separated by `1px solid --color-border` bottom borders. Title at 1.5rem, meta in muted small text, excerpt in body text, read-more link at font-weight 500. No background, no shadow. Simple but not distinctive.

**Components affected:** Homepage post list, tag archive, series archive.

**Options:**
- **A. Larger titles** — bump heading size to let Newsreader make more of an impression. Increase visual hierarchy between title and excerpt.
- **B. Spacing over borders** — remove the bottom border, increase vertical spacing between cards. Relies on whitespace.
- **C. Date/meta in monospace** — use IBM Plex Mono for dates and reading time to create a subtle technical accent that distinguishes meta from body text.
- These options are not mutually exclusive — they can be combined.

#### Pattern 7: Header Brand

**Current state:** Bold text at 1.25rem in `--color-heading`, using the system font stack. Hover changes to `--color-primary`. Sits in a Bootstrap navbar with collapse at `md` breakpoint.

**Components affected:** Site header (every page).

**Consideration:** With Newsreader available, rendering the brand/site name in the serif heading font would immediately distinguish the header from a generic Bootstrap navbar. This is a small change with high visual impact — the brand is the first thing readers see on every page.

### Layout Rethinking (Phase 2)
- Header/navigation redesign
- Post card layout variations
- Sidebar presentation
- Footer redesign
- Mobile-specific refinements

---

## Implementation Notes

### Key Files

| File | Role |
|------|------|
| `assets/css/_partials/_variables.scss` | All design tokens — colors, fonts, spacing, borders. Two-layer architecture (SCSS + CSS custom properties). |
| `assets/main.scss` | Import orchestration. Bootstrap partials, then project partials. `@font-face` declarations would go here. |
| `_includes/head.html` | Font preload `<link>` tags would go here (override from Minima). |
| `assets/fonts/` | Self-hosted font files (to be created). |

### Change Scope

A visual refresh primarily touches `_variables.scss` (design tokens) and `assets/main.scss` (font-face declarations). Component-level SCSS partials may need minor adjustments if spacing or border treatments change significantly, but the token-based architecture means most changes propagate automatically.

---

## Sources

### Font Research
- [Google Font Pairings for 2026 — LandingPageFlow](https://www.landingpageflow.com/post/google-font-pairings-for-websites)
- [30 Google Font Pairings — The Brief](https://www.thebrief.ai/blog/google-font-pairings/)
- [Best Google Font Pairings for UI Design 2025 — Matt Medley / Medium](https://medium.com/design-bootcamp/best-google-font-pairings-for-ui-design-in-2025-ba8d006aa03d)
- [The 40 Best Google Fonts — Typewolf](https://www.typewolf.com/google-fonts)
- [Newsreader — Production Type](https://productiontype.com/font/newsreader)
- [Fraunces — Google Design](https://design.google/library/a-new-take-on-old-style-typeface)
- [IBM Plex Sans — Beautiful Web Type](https://beautifulwebtype.com/ibm-plex-sans)
- [Space Grotesk — Typewolf](https://www.typewolf.com/space-grotesk)
- [Best Monospaced Google Fonts 2026 — Lexington Themes](https://lexingtonthemes.com/blog/best-new-monospaced-google-fonts-2026)
- [Self-Hosting Google Fonts — Tune The Web](https://www.tunetheweb.com/blog/should-you-self-host-google-fonts/)
- [Fonts — 2025 Web Almanac](https://almanac.httparchive.org/en/2025/fonts)
- [Speed Up Google Fonts — CSS Wizardry](https://csswizardry.com/2020/05/the-fastest-google-fonts/)

### Color Research
- [2026 Web Design Color Trends — Lounge Lizard](https://www.loungelizard.com/blog/web-design-color-trends/)
- [Website Color Trends 2026 — Wix](https://www.wix.com/blog/website-color-trends)
- [Color Palettes for Balanced Web Design — Elegant Themes](https://www.elegantthemes.com/blog/design/color-palettes-for-balanced-web-design)
- [12 Principles of Dark Mode Design — Uxcel](https://uxcel.com/blog/12-principles-of-dark-mode-design-627)
- [Dark Mode UI Best Practices — Atmos](https://atmos.style/blog/dark-mode-ui-best-practices)
- [Material Design Dark Theme — Google](https://design.google/library/material-design-dark-theme)
- [WCAG 2.2 Contrast Requirements — Make Things Accessible](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
