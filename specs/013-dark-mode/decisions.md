# Decisions: Dark Mode

## Decision Log

### D1: FOUC Prevention Approach

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need to prevent flash of wrong theme on page load. Static site — no server-side rendering.
- **Options Considered:**
  1. Inline script in `_includes/head.html` — executes within `<head>`, but needs to set attribute on parent `<html>`
  2. Inline script in `_layouts/default.html` immediately after `<html>` tag — sets attribute before CSS loads
  3. No inline script, rely on `prefers-color-scheme` media query only — no manual override persistence
- **Decision:** Option 2 — inline sync script in `default.html` after `<html>` tag, before `head.html` include
- **Rationale:** Maximizes FOUC protection by setting `data-bs-theme` before the browser encounters the stylesheet. Must be synchronous and render-blocking (by design). Keep under 500 bytes. Jekyll SME confirmed no processing concerns.

---

### D2: Syntax Highlighting Dark Theme

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Syntax highlighting uses Rouge with GitHub light theme (hard-coded colors). Need dark equivalent.
- **Options Considered:**
  1. Custom properties per syntax token (~20 new vars) — fully tokenized but loses rougify regenerability
  2. Separate `_syntax-dark.scss` generated via `rougify style github.dark` — two independent files, each regenerable
- **Decision:** Option 2 — separate `_syntax-dark.scss` file
- **Rationale:** Follows spec 011 lesson: "Keep generated theme CSS close to original output." Override only `background-color` to use `var(--color-code-bg)`. Import after `_syntax` in `main.scss`. Both CSS/Design and Jekyll SMEs aligned on this approach.

---

### D3: No _config.yml Changes

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should theme preference be a site-level config or purely client-side?
- **Options Considered:**
  1. Add dark mode settings to `_config.yml` — build-time default
  2. Purely client-side via localStorage + `prefers-color-scheme` — runtime per-user preference
- **Decision:** Option 2 — purely client-side
- **Rationale:** Theme preference is per-user and per-session — `_config.yml` is build-time. System preference + localStorage covers all use cases. Remove `_config.yml` from affected files list.

---

### D4: Toggle Accessibility Pattern

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need an accessible toggle control. Multiple ARIA patterns available.
- **Options Considered:**
  1. `<button aria-pressed>` — toggle button pattern, broader support than switch
  2. `<button role="switch" aria-checked>` — switch pattern, uneven screen reader support
  3. Plain `<button>` with visually hidden text label + aria-live announcements — simplest, most universal
- **Decision:** Option 3 — plain button with visually hidden text + separate aria-live region
- **Rationale:** Aligns with spec 011 lesson: "Prefer visible text over aria-label." Avoids WCAG 2.5.3 (Label in Name) mismatches. Screen reader announcements via dedicated aria-live="polite" region (separate from code-copy's region). Button text updates to reflect available action ("Switch to dark mode" / "Switch to light mode").

---

### D5: Bootstrap Dark Mode Mechanism

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to activate Bootstrap's built-in dark mode support.
- **Options Considered:**
  1. `data-bs-theme="dark"` on `<html>` — attribute-based, supports manual toggle
  2. `@media (prefers-color-scheme)` only — no manual toggle, system-only
- **Decision:** Option 1 — `data-bs-theme` attribute on `<html>`
- **Rationale:** Bootstrap's `$color-mode-type` defaults to `data`. Setting the attribute auto-restyles all imported Bootstrap components (reboot, navbar toggler, etc.). Supports both system detection and manual override via JS.

---

### D6: Project Custom Property Dark Values — Use color-mode Mixin

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to define dark values for project Layer 2 custom properties.
- **Options Considered:**
  1. Write `[data-bs-theme="dark"] { ... }` selector manually
  2. Use Bootstrap's `@include color-mode(dark) { ... }` mixin
- **Decision:** Option 2 — use `color-mode(dark)` mixin
- **Rationale:** One-line abstraction that outputs `[data-bs-theme="dark"]`. Consistent with Bootstrap's own convention. Provides future flexibility if project ever switches to media-query mode. Place in `_variables.scss` after `:root` block.

---

### D7: Dark Color Palette

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need dark values for all 16 Layer 2 color tokens plus new semantic tokens.
- **Decision:** GitHub-dark inspired palette maintaining the blue hue family:

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | `#0060df` | `#4dabf7` |
| `--color-text` | `#1a1a1a` | `#c9d1d9` |
| `--color-heading` | `#0f1923` | `#e6edf3` |
| `--color-muted` | `#5c6470` | `#8b949e` |
| `--color-background` | `#ffffff` | `#0d1117` |
| `--color-bg-alt` | `#f7f8f9` | `#161b22` |
| `--color-link` | `#0060df` | `#4dabf7` |
| `--color-link-hover` | `#004cb3` | `#79c0ff` |
| `--color-border` | `#dee2e6` | `#30363d` |
| `--color-code-bg` | `#f5f5f5` | `#161b22` |
| `--color-nav-link` | `#1a1a1a` | `#c9d1d9` |
| `--color-tag-bg` | `#e9ecef` | `#21262d` |
| `--color-tag-text` | `#1a1a1a` | `#c9d1d9` |
| `--color-tag-border` | `#dee2e6` | `#30363d` |
| `--meta-color` | `#5c6470` | `#8b949e` |
| `--focus-ring-color` | `#005fcc` | `#58a6ff` |

New semantic tokens:

| Token | Light | Dark |
|-------|-------|------|
| `--color-success` | `#116329` | `#3fb950` |
| `--color-error` | `#c62828` | `#f85149` |
| `--color-focus-shadow` | `rgba(0,96,223,0.25)` | `rgba(77,171,247,0.3)` |
| `--color-status-progress-bg` | `#fff3cd` | `#3d2e00` |
| `--color-status-progress-text` | `#4d3a02` | `#ffd866` |
| `--color-status-complete-bg` | `#d1e7dd` | `#0d3320` |
| `--color-status-complete-text` | `#051f13` | `#56d364` |

- **Rationale:** Maintains brand identity (blue primary shifts lighter, not different hue). Avoids pure black/white. All pairings target WCAG AA contrast minimums. Values to be verified with contrast checker during implementation.

---

### D8: Theme Transition Approach

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Spec requires smooth transition when toggling. Need to balance visual effect with performance.
- **Options Considered:**
  1. Targeted transitions on structural elements only (body, header, footer, cards, etc.)
  2. Broad `*` selector transition — simple but performance risk
  3. Temporary transition class via JS — limits cost to transition duration
- **Decision:** Option 1 — targeted transitions
- **Rationale:** Performant and precise. Covers 90% of the visual effect. Duration 0.2s ease. `@media (prefers-reduced-motion: reduce)` disables transitions — instant swap for motion-sensitive users.

---

### D9: Toggle UI Design

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need a theme toggle control in the header.
- **Decision:** Minimal icon button with sun/moon inline SVGs. BEM block `.theme-toggle`. Placed between nav links and search form in header. On mobile: left of hamburger button, outside the collapsible nav so it's always visible. Borderless icon button, `--color-muted` default, `--color-text` on hover. 1.25rem icon, ~2rem tap target.
- **Rationale:** Universally recognized icons. Unobtrusive placement. Always accessible without opening mobile menu.

---

### D10: JS Pattern for Toggle

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Existing JS files use IIFEs with `<script defer>`. Code guidelines specify ES modules. Need to decide which pattern for the new toggle JS.
- **Options Considered:**
  1. IIFE with `<script defer>` — matches existing code, diverges from guidelines
  2. ES module with `<script type="module">` — matches guidelines, diverges from existing code
  3. ES module + migrate existing files — consistent but scope creep
- **Decision:** Option 2 — ES module for toggle. Existing IIFE migration deferred to roadmap item 022.
- **Rationale:** Follow documented code guidelines. `<script type="module">` is deferred by default. The FOUC-prevention inline script is a separate concern (sync, inline, not a module). Mixed loading strategies (`defer` + `type="module"`) coexist without conflict.

---

### D11: localStorage Key Name

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need a localStorage key for persisting theme preference. Must not collide with future features.
- **Decision:** Use `theme` as the key name. Values: `"light"` or `"dark"`.
- **Rationale:** Matches the code guidelines JS example (`localStorage.getItem('theme')`). Simple, descriptive, no namespace prefix needed at current project scale.

---

### D12: Separate aria-live Status Regions

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Theme toggle needs screen reader announcements. code-copy.js already has an aria-live region (`#code-copy-status`).
- **Options Considered:**
  1. Shared region — rename to `sr-status`, both features write to it
  2. Separate regions — each feature creates its own
- **Decision:** Option 2 — separate regions per feature
- **Rationale:** Avoids cross-feature dependency. Eliminates risk of simultaneous announcements overwriting each other. Extra invisible `<div>` is negligible.
