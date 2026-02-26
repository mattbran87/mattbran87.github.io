/**
 * @file main.js
 * @description Entry point for all client-side JavaScript. Imports feature
 * modules and initializes them. Loaded as an ES module via
 * <script type="module"> — deferred by default, executes after DOM parsing
 * and after all deferred classic scripts (Bootstrap, Lunr).
 */

import { initCookieConsent } from './modules/cookie-consent.js';
import { initNavKeyboard } from './modules/nav-keyboard.js';
import { initCodeCopy } from './modules/code-copy.js';
import { initSearch } from './modules/search.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initSocialShare } from './modules/social-share.js';
import { initToc } from './modules/toc.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initScrollProgress } from './modules/scroll-progress.js';
import { initComments } from './modules/comments.js';
import { initStickyHeader } from './modules/sticky-header.js';
import { initSidebarSticky } from './modules/sidebar-sticky.js';

initCookieConsent();
initNavKeyboard();
initCodeCopy();
initSearch();
initThemeToggle();
initSocialShare();
initToc();
initBackToTop();
initScrollProgress();
initComments();
initStickyHeader();
initSidebarSticky();
