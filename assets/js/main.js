/**
 * @file main.js
 * @description Entry point for all client-side JavaScript. Imports feature
 * modules and initializes them. Loaded as an ES module via
 * <script type="module"> — deferred by default, executes after DOM parsing
 * and after all deferred classic scripts (Bootstrap, Lunr).
 */

import { initNavKeyboard } from './modules/nav-keyboard.js';
import { initCodeCopy } from './modules/code-copy.js';
import { initSearch } from './modules/search.js';
import { initThemeToggle } from './modules/theme-toggle.js';
import { initSocialShare } from './modules/social-share.js';
import { initToc } from './modules/toc.js';

initNavKeyboard();
initCodeCopy();
initSearch();
initThemeToggle();
initSocialShare();
initToc();
