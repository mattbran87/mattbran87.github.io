# Decisions: Code Block Enhancements

## Decision Log

### D1: No kramdown config changes needed

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should we add explicit `kramdown.syntax_highlighter_opts` to `_config.yml`?
- **Options Considered:**
  1. Add explicit kramdown config with `line_numbers: false` — documents intent, no functional change
  2. Leave config as-is — defaults work correctly, less config to maintain
- **Decision:** Leave config as-is
- **Rationale:** The defaults produce the correct HTML structure. Adding config only to set `line_numbers: false` (already the default) adds noise. If line numbers are needed later, config can be added then.

---

### D2: Rouge theme approach — rougify CLI with github theme

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to generate and integrate a syntax highlighting theme
- **Options Considered:**
  1. `rougify style github` CLI → SCSS partial — fast, complete, proven
  2. Hand-crafted SCSS mapping each token class — full control, much more work
  3. CSS custom properties for every token — dark mode ready, but premature (spec 013 will handle dark mode)
- **Decision:** Use `rougify style github --scope '.highlight'` to generate a base, save as `_syntax.scss`, customize background to use existing `--color-code-bg` custom property
- **Rationale:** The github theme closely matches the site's light gray code background (`#f5f5f5` vs `#f6f8fa`). Generating from CLI gives a complete, tested theme in seconds. Concrete color values are fine — dark mode (spec 013) will add a companion `_syntax-dark.scss` file. Over-abstracting now adds complexity without benefit.

---

### D3: Line numbers — defer to a future enhancement

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to implement optional line numbers on code blocks
- **Options Considered:**
  1. Rouge built-in `linenos` — table-based HTML, complicates CSS and copy UX, can't toggle per fenced block
  2. CSS counters + JS line wrapping — clean copy UX (`user-select: none`), but requires DOM manipulation and fragile HTML splitting
  3. Defer line numbers — focus on copy button + syntax theme which deliver more value with less complexity
- **Decision:** Defer line numbers to a future enhancement
- **Rationale:** The copy button and syntax theme are the high-value deliverables. Line numbers add significant complexity (JS DOM manipulation, table-based HTML handling, interaction with copy logic) for a feature that many modern developer blogs omit entirely (GitHub, MDN, dev.to don't show line numbers). If users want to reference specific lines, they can use the copy button and paste into their editor. Line numbers can be added as a follow-up if there's demand.

---

### D4: Copy success announcement — aria-live region with role="status"

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to announce copy success to screen reader users
- **Options Considered:**
  1. `aria-live="polite"` with `role="status"` — standard approach, broad support
  2. `role="alert"` — too aggressive for a non-urgent confirmation
  3. Update button `aria-label` dynamically — screen readers don't automatically re-announce on attribute change
- **Decision:** Single `<div>` with `class="visually-hidden"`, `role="status"`, `aria-live="polite"` placed in the DOM on page load
- **Rationale:** This is the standard accessible pattern. `polite` is correct for non-urgent feedback. The container must exist at page load (not dynamically created) for reliable screen reader detection. Belt-and-suspenders with both `role="status"` and explicit `aria-live="polite"`.

---

### D5: Copy button style — visible text, not icon-only

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should the copy button use an icon, visible text, or both?
- **Options Considered:**
  1. Icon-only (clipboard → checkmark swap) — compact, modern, requires `aria-label`
  2. Visible text ("Copy" → "Copied!") — benefits all users, self-documenting, no icon dependency
  3. Icon + text — clearest, but takes more space
- **Decision:** Visible text ("Copy" → "Copied!")
- **Rationale:** Visible text benefits all users — sighted users who don't recognize icons, touch device users, and screen reader users. The text change doubles as visual feedback (no separate tooltip or icon swap needed). Keeps the implementation simple with no SVG dependencies. Can always add an icon alongside the text later if desired.

---

### D6: Copy button visibility — always visible with enhanced hover

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should the copy button be hidden until hover or always visible?
- **Options Considered:**
  1. Hidden (opacity: 0) until hover/focus — cleaner aesthetic, excludes touch users
  2. Always visible at full opacity — most accessible, but adds visual noise
  3. Always visible at reduced opacity, full opacity on hover/focus — balanced approach, accessible on all devices
- **Decision:** Always visible at reduced opacity (baseline). Use `@media (hover: hover)` to apply hide-until-hover only on hover-capable devices. Always visible on `:focus-visible`. Disable transition in `prefers-reduced-motion: reduce`.
- **Rationale:** Touch devices have no hover state — hiding the button by default makes it undiscoverable on mobile. The `@media (hover: hover)` query targets only desktop/mouse users for the hide-reveal pattern. Keyboard users see the button on focus. This satisfies WCAG 1.4.13 and provides a good experience across all input methods.

---

### D7: JavaScript pattern — IIFE with defer (match existing)

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** The code guidelines recommend ES modules, but existing scripts use IIFE + `<script defer>`
- **Options Considered:**
  1. ES module (`<script type="module">`) — matches code guidelines, modern
  2. IIFE + `<script defer>` — matches existing `nav-keyboard.js` and `search.js`
- **Decision:** Use IIFE + `<script defer>` pattern
- **Rationale:** Consistency with existing codebase. Both `nav-keyboard.js` and `search.js` use this pattern. Migrating to ES modules should be a separate effort that converts all scripts at once, not a per-feature decision that creates inconsistency.
