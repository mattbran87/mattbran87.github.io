# Feature Roadmap

> **Last Updated:** 2026-02-22

## Feature Queue

Features listed in order of priority. Each feature gets its own spec directory when work begins.

| # | Feature | Spec | Status |
|---|---------|------|--------|
| 001 | Bootstrap Integration | `specs/001-bootstrap-integration/` | Completed |
| 002 | Custom Theme | `specs/002-custom-theme/` | Completed |
| 003 | Tags & Categories | `specs/003-tags-categories/` | Not Started |
| 004 | Series Support | `specs/004-series-support/` | Not Started |
| 005 | Contact Form | `specs/005-contact-form/` | Not Started |
| 006 | Personalize Site | `specs/006-personalize-site/` | Not Started |
| 007 | Custom Homepage | `specs/007-custom-homepage/` | Not Started |
| 008 | SEO Foundation | `specs/008-seo-foundation/` | Not Started |
| 009 | Search | `specs/009-search/` | Not Started |
| 010 | Related Posts | `specs/010-related-posts/` | Not Started |
| 011 | Code Block Enhancements | `specs/011-code-blocks/` | Not Started |
| 012 | Analytics | `specs/012-analytics/` | Not Started |
| 013 | Dark Mode | `specs/013-dark-mode/` | Not Started |
| 014 | Custom 404 | `specs/014-custom-404/` | Not Started |
| 015 | Uses Page | `specs/015-uses-page/` | Not Started |
| 016 | Resume/CV Page | `specs/016-resume-page/` | Not Started |

## Natural Groupings

Features that share dependencies or are closely related and benefit from being developed together or in sequence.

### Foundation (do first — everything builds on this)

| # | Feature | Rationale |
|---|---------|-----------|
| 001 | Bootstrap Integration | Changes the entire CSS foundation |
| 002 | Custom Theme | Builds layouts and visual identity on top of Bootstrap |
| 006 | Personalize Site | Replace placeholder content early so all subsequent work uses real data |

### Content Organization

| # | Feature | Rationale |
|---|---------|-----------|
| 003 | Tags & Categories | Taxonomy system for organizing posts |
| 004 | Series Support | Multi-part post linking — related taxonomy concept |
| 010 | Related Posts | Uses tags/categories to determine relatedness |

### Page Builds

| # | Feature | Rationale |
|---|---------|-----------|
| 005 | Contact Form | Single standalone page |
| 007 | Custom Homepage | Designed landing page |
| 014 | Custom 404 | Single standalone page |
| 015 | Uses Page | Single standalone page |
| 016 | Resume/CV Page | Single standalone page |

### Discovery & SEO

| # | Feature | Rationale |
|---|---------|-----------|
| 008 | SEO Foundation | Meta tags and structured data live in layouts — best done with the custom theme |
| 009 | Search | Client-side search for readers to find content |
| 012 | Analytics | Traffic tracking and user behavior insights |

### Enhancements

| # | Feature | Rationale |
|---|---------|-----------|
| 011 | Code Block Enhancements | Developer experience polish for code-heavy posts |
| 013 | Dark Mode | Theming enhancement — requires custom theme CSS custom properties in place |

## Feature Descriptions

### 001 — Bootstrap Integration

Replace Minima's CSS foundation with Bootstrap 5. Install Bootstrap's Sass source into the Jekyll build pipeline, set up the grid system, and establish the base component library. This is the foundation for all subsequent UI work.

### 002 — Custom Theme

Build custom Jekyll layouts and includes on top of Bootstrap, replacing Minima's default templates. Define the site's visual identity — typography, color palette, spacing, header, footer, and navigation. All pages and posts use the new theme.

### 003 — Tags & Categories

Add taxonomy pages for tags and categories. Each tag and category gets an archive page listing all associated posts. Posts display their tags and categories with links to the corresponding archive pages.

### 004 — Series Support

Enable multi-part blog post series. Posts within a series are linked together with previous/next navigation and a series table of contents. Series metadata is managed through front matter.

### 005 — Contact Form

Add a contact page with a mailto link for reader communication. Styled consistently with the site theme using Bootstrap components.

### 006 — Personalize Site

Replace all placeholder values in `_config.yml` with real site title, description, email, and social links. Update the about page with real content. Remove the default welcome post.

### 007 — Custom Homepage

Replace the default post list with a designed landing page featuring a hero section, featured posts, and an about blurb. Responsive layout using Bootstrap grid.

### 008 — SEO Foundation

Implement structured data (JSON-LD for BlogPosting, Person, WebSite), Open Graph meta tags for social sharing, XML sitemap via jekyll-sitemap, and canonical URLs. Configure jekyll-seo-tag for maximum coverage.

### 009 — Search

Add client-side search using Lunr.js. Build a search index at build time, add a search page with input and results display. Allow readers to find posts by title, content, tags, and categories.

### 010 — Related Posts

Display related content at the bottom of each blog post. Determine relatedness by shared tags and categories. Show 3-4 related posts with title, date, and excerpt.

### 011 — Code Block Enhancements

Improve the code block experience with a copy-to-clipboard button, a custom syntax highlighting theme, and optional line numbers. Styled to match the site theme.

### 012 — Analytics

Integrate Google Analytics (GA4) for tracking site traffic. Load the tracking script only in production (`JEKYLL_ENV=production`). Respect user privacy preferences where possible.

### 013 — Dark Mode

Add a light/dark theme toggle. Detect system preference via `prefers-color-scheme`, allow manual override, and persist the user's choice in localStorage. All components and Bootstrap customizations support both modes via CSS custom properties.

### 014 — Custom 404

Design a helpful, on-brand 404 error page. Include navigation back to the homepage, a search link (once search is built), and styling consistent with the site theme.

### 015 — Uses Page

Create a `/uses/` page listing tools, hardware, software, and development setup. Structured with categories and descriptions. A common page format in the developer blog community.

### 016 — Resume/CV Page

Create a dedicated `/resume/` page with professional experience, skills, education, and contact information. Styled for both web viewing and print. Separate from the about page.

## Dependencies

Features with hard dependencies on prior work:

- **002 Custom Theme** depends on **001 Bootstrap Integration**
- **007 Custom Homepage** depends on **002 Custom Theme**
- **013 Dark Mode** depends on **002 Custom Theme**
- **014 Custom 404** depends on **002 Custom Theme**

All other features can technically be built independently but will benefit from Bootstrap and the custom theme being in place first.

## Notes

- Priority order may shift as the project evolves
- New features are appended to the bottom of the queue and re-prioritized as needed
- Each feature follows the spec engineering workflow (Research & Planning → Implementation → Testing → Acceptance)
