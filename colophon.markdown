---
layout: page
title: Colophon
permalink: /colophon/
description: "How this site is built — the frameworks, plugins, libraries, and services behind AI Code Blog."
---

## Static Site Generator

This site is built with [Jekyll](https://jekyllrb.com/), a static site generator written in Ruby. Posts are authored in Markdown, processed through Liquid templates, and compiled into plain HTML files — no server-side runtime, no database.

## Theme & Styling

The layout and components are built on [Bootstrap 5](https://getbootstrap.com/) with custom SCSS using BEM naming conventions. CSS custom properties power the light and dark theme toggle. Typography uses a system font stack — no web fonts are loaded, which keeps pages fast.

## JavaScript

All interactivity is written in vanilla JavaScript using ES modules — no frameworks like React or jQuery. Features include client-side search (powered by [Lunr.js](https://lunrjs.com/)), a dark mode toggle, code block copy buttons, a table of contents generator, scroll progress indicator, and keyboard navigation.

## Jekyll Plugins

- [jekyll-feed](https://github.com/jekyll/jekyll-feed) — Generates the RSS feed
- [jekyll-paginate](https://github.com/jekyll/jekyll-paginate) — Paginates the homepage post list
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) — Outputs meta tags, Open Graph, and JSON-LD structured data
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) — Generates the XML sitemap
- [jekyll-archives](https://github.com/jekyll/jekyll-archives) — Creates tag archive pages

## Syntax Highlighting

Code blocks are highlighted by [Rouge](https://github.com/rouge-ruby/rouge), with separate color schemes for light and dark mode.

## Comments

Post comments are powered by [Giscus](https://giscus.app/), which stores discussions in GitHub Discussions rather than a third-party database.

## Newsletter

The email newsletter is managed through [Buttondown](https://buttondown.com/), a lightweight email subscription service.

## Analytics

Traffic is measured with Google Analytics 4, loaded only in production and only after the visitor grants consent via a cookie banner (Consent Mode v2).

## Hosting & Deployment

The site is hosted on [GitHub Pages](https://pages.github.com/). Every push to the main branch triggers a [GitHub Actions](https://github.com/features/actions) workflow that builds the site and deploys it automatically.

## Accessibility

The site targets [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) compliance with semantic HTML, ARIA labels, keyboard navigation, visible focus indicators, and sufficient color contrast in both themes.
