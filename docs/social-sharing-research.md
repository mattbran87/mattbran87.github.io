# Social Sharing — Research Findings

> **Date:** 2026-02-24
> **Related roadmap item:** #020 Social Sharing

## Goal

Add share buttons to blog posts so readers can easily share articles to social platforms, copy the link, or send via email. No third-party scripts or tracking — just plain links and minimal JavaScript.

## Share Mechanisms

### Platform Share Links (No JavaScript Required)

Each social platform provides a URL-based sharing endpoint. These are plain `<a>` tags — no SDKs, no tracking scripts, no cookies.

| Platform | URL Pattern |
|----------|-------------|
| Twitter/X | `https://twitter.com/intent/tweet?url={url}&text={title}` |
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url={url}` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u={url}` |
| Reddit | `https://www.reddit.com/submit?url={url}&title={title}` |
| Hacker News | `https://news.ycombinator.com/submitlink?u={url}&t={title}` |

All values are URL-encoded using Liquid's `url_encode` filter.

### Copy Link Button (Minimal JavaScript)

A button that copies the current page URL to the clipboard using the Clipboard API:

```javascript
navigator.clipboard.writeText(url)
```

- Show brief visual feedback ("Copied!" tooltip or icon change)
- Falls back gracefully if Clipboard API is unavailable (older browsers)
- No external dependencies

### Email Share (No JavaScript Required)

A `mailto:` link with pre-filled subject and body:

```
mailto:?subject={title}&body=Check out this article: {url}
```

### Web Share API (Progressive Enhancement)

The Web Share API (`navigator.share()`) opens the native OS share sheet on supported devices (mobile browsers, some desktop browsers):

```javascript
navigator.share({ title: title, url: url })
```

- Best experience on mobile — gives access to all installed apps
- Not universally supported — use as progressive enhancement, not primary method
- Feature-detect and show only when available

## Recommended Approach

### Include Component

Build `_includes/social-share.html` that renders share buttons for each post. Include it in the post layout after the content.

### Platform Selection

Start with a focused set relevant to a tech/developer blog:

| Platform | Include? | Rationale |
|----------|----------|-----------|
| Twitter/X | Yes | Developer community is active here |
| LinkedIn | Yes | Professional audience, good for tech content |
| Reddit | Yes | Strong developer subreddits |
| Hacker News | Yes | Core tech audience |
| Facebook | Optional | Less relevant for a dev blog, but broad reach |
| Copy Link | Yes | Universal, works everywhere |
| Email | Yes | Simple, no platform dependency |
| Web Share | Yes | Progressive enhancement for mobile |

### Styling

- Use Bootstrap button group or inline list for layout
- Icon-based buttons (Bootstrap Icons or inline SVGs) with screen-reader-friendly labels
- Compact design that doesn't distract from post content
- Responsive — stack or wrap on narrow screens
- Match the site's existing visual style

### Placement

| Location | Recommendation |
|----------|---------------|
| Below post content | Yes — primary location, reader has finished the article |
| Above post content / near title | Optional — for quick sharing before reading |
| Floating sidebar | No — adds complexity, can be distracting |

## Privacy Considerations

- **No third-party scripts:** Platform share links are plain URLs — no JavaScript is loaded from Twitter, Facebook, etc.
- **No tracking pixels:** No embedded widgets that phone home
- **No cookies:** Share links open in a new tab on the platform's site; no cookies set on the blog
- **GDPR-friendly:** No personal data is collected or shared by the share buttons themselves

This is a significant advantage over widget-based solutions (e.g., AddThis, ShareThis) which inject tracking scripts.

## Relationship to Other Features

| Feature | Relationship |
|---------|-------------|
| #008 SEO Foundation | Open Graph and meta tags ensure shared links display rich previews (title, description, image) on social platforms |
| #012 Analytics | Can track share button clicks as events in GA4 (optional) |
| #017 Multi-Language Support | Share buttons should use the canonical URL for the current language version |

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Implementation | Plain share links + copy button | No third-party scripts, privacy-friendly, zero dependencies |
| Icons | Bootstrap Icons (already in the project) or inline SVGs | No additional icon library needed |
| Platforms | Twitter/X, LinkedIn, Reddit, Hacker News, Copy Link, Email | Focused on tech/developer audience |
| Web Share API | Progressive enhancement | Show native share on supported devices, hidden otherwise |
| Placement | Below post content | Natural share point after reading |

## Implementation Considerations

- **Open Graph dependency:** Share link previews (the card that shows when you paste a link on Twitter/LinkedIn) depend on proper Open Graph meta tags. #008 SEO Foundation handles this. Without it, shares will still work but show plain URLs instead of rich cards.
- **URL encoding:** Use Liquid's `url_encode` filter for all dynamic values in share URLs
- **New tab:** All share links should open in a new tab (`target="_blank" rel="noopener"`)
- **Accessibility:** Buttons need descriptive `aria-label` attributes (e.g., "Share on Twitter")
- **No JavaScript for core functionality:** Share links work without JS; only the copy button and Web Share API require it

## Out of Scope

- Share counts (require API calls to each platform, often rate-limited or deprecated)
- Social login or authentication
- Comment integration via social platforms
- Auto-posting to social media when a new post is published (could be a separate GitHub Action feature)

## References

- [Twitter Web Intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
- [LinkedIn Share URL](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)
- [Web Share API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Clipboard API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
