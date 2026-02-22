# Decisions: Bootstrap Integration

## Decision Log

### D1: Bootstrap Installation Method

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to determine how Bootstrap 5 Sass source is added to the Jekyll project
- **Options Considered:**
  1. Sass source via npm — full customization, requires node_modules in the project
  2. Sass source vendored — full customization, no npm dependency, manual updates
  3. CDN links — simplest setup, no Sass customization, external dependency
- **Decision:** Sass source vendored
- **Rationale:** Full Sass customization control without adding npm as a build dependency. Bootstrap source files will live in `assets/vendor/bootstrap/` and be updated manually.

---

### D2: Minima Theme During Transition

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to determine whether Minima is kept or removed when Bootstrap is integrated
- **Options Considered:**
  1. Remove Minima entirely — clean slate, all layouts and styles from scratch, but more upfront work and risk of broken pages
  2. Keep Minima as fallback — override incrementally, site never breaks during transition
- **Decision:** Keep Minima as fallback
- **Rationale:** The site stays functional throughout the Bootstrap integration. Minima's layouts and includes continue to render for any pages not yet overridden. Full Minima removal will happen in spec 002 (Custom Theme).
