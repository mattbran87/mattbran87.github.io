# Featured Posts — Research Findings

> **Date:** 2026-02-24
> **Related roadmap item:** #019 Featured Posts

## Goal

Display a curated "Featured Posts" section on the site highlighting the most popular or noteworthy articles. Start with a manually curated list, then automate using analytics data via a scheduled GitHub Action.

## The Static Site Challenge

Jekyll generates static HTML at build time. Popularity data lives in an external analytics service (Google Analytics) that Jekyll cannot query during builds. This means dynamic "most popular" content requires either manual curation, client-side JavaScript, or a build-time data pipeline.

## Approach: Two-Phase Rollout

### Phase 1 — Manual Curation

- Create `_data/featured_posts.yml` containing a list of featured post slugs/paths
- Build a reusable `_includes/featured-posts.html` component that reads from the data file
- Display featured posts with title, date, excerpt, and tags
- The site owner updates the YAML file manually based on analytics dashboard review
- No external API calls, no JavaScript, no additional dependencies

**Data file format:**

```yaml
# _data/featured_posts.yml
- slug: 2026-02-22-post-title
  reason: "Most viewed"      # optional — for internal tracking
- slug: 2026-02-20-another-post
  reason: "Reader favorite"
```

**Advantages:**
- Zero complexity — just a data file and a Liquid include
- Works immediately, no analytics data needed yet
- Full editorial control over what gets featured
- Same data file format used by Phase 2, so no migration needed

### Phase 2 — Automated via GitHub Action (Hybrid)

- Add a scheduled GitHub Action (e.g., weekly cron) that:
  1. Authenticates with the Google Analytics Data API (GA4)
  2. Queries the top N most-viewed posts over a configurable time window (e.g., last 30 days)
  3. Writes the results to `_data/featured_posts.yml`
  4. Commits and pushes the change, triggering a site rebuild
- The templates and includes from Phase 1 remain unchanged — only the data source changes
- Requires #012 Analytics to be implemented first (GA4 must be collecting data)

**GitHub Action overview:**

```yaml
name: Update Featured Posts
on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly on Monday at 6am UTC
  workflow_dispatch:       # Allow manual trigger

jobs:
  update-featured:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Query Google Analytics
        # Use a script (Node.js or Python) to call GA4 Data API
        # Write results to _data/featured_posts.yml
      - name: Commit and push
        # Only if file changed
```

**Requirements:**
- Google Analytics Data API credentials stored as a GitHub Actions secret
- A service account with read access to the GA4 property
- A small script (Node.js or Python) to query the API and format the YAML
- #012 Analytics must be live and collecting data for several weeks

## Placement Options

Where the featured posts section could appear:

| Location | Pros | Cons |
|----------|------|------|
| Homepage (above post list) | High visibility, first thing visitors see | Requires homepage layout changes |
| Sidebar (all pages) | Persistent visibility across the site | Current layout may not have a sidebar |
| Dedicated `/popular/` page | Clean separation, easy to link to | Lower discoverability |
| Post footer (below content) | Catches engaged readers | Competes with related posts (#010) |

**Recommendation:** Homepage placement for maximum visibility. If #007 Custom Homepage is implemented, featured posts would be a natural section within it. Otherwise, add it above or below the standard post list on the current homepage.

## Relationship to Other Features

| Feature | Relationship |
|---------|-------------|
| #007 Custom Homepage | Featured posts could be a section within a custom homepage layout |
| #010 Related Posts | Different purpose — related posts are per-post contextual suggestions; featured posts are site-wide highlights |
| #012 Analytics | Phase 2 depends on GA4 being live and collecting data |

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Phase 1 approach | Manual YAML curation | Zero complexity, immediate value, same format as Phase 2 |
| Phase 2 approach | Scheduled GitHub Action | Automates data refresh without client-side JS; keeps the site fully static |
| Data file location | `_data/featured_posts.yml` | Standard Jekyll data directory; accessible via `site.data.featured_posts` in Liquid |
| Analytics API | Google Analytics Data API (GA4) | Matches #012 Analytics provider choice |
| Automation frequency | Weekly | Balances freshness with API quota and unnecessary commits |

## Implementation Considerations

- **Fallback:** If the data file is empty or missing, the featured posts section should not render (graceful degradation)
- **Post validation:** The include should verify that referenced slugs match actual posts to avoid broken links
- **Count:** Display 3–5 featured posts (configurable via the data file or site config)
- **Styling:** Use existing Bootstrap card components consistent with the site theme
- **Cache/quota:** GA4 Data API has generous free quotas (25,000 requests/day) — weekly queries are well within limits
- **Manual override:** Even in Phase 2, allow manual entries in the YAML that the automation preserves (e.g., pinned posts)

## Out of Scope

- Real-time popularity counters or view counts displayed on posts
- Client-side JavaScript analytics widgets
- A/B testing of featured post selections
- Recommendation algorithms beyond "most viewed"

## References

- [Google Analytics Data API (GA4)](https://developers.google.com/analytics/devapis/reporting/data/v1)
- [Jekyll Data Files](https://jekyllrb.com/docs/datafiles/)
- [GitHub Actions scheduled events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
