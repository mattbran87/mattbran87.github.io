/**
 * @file scroll-progress.js
 * @description Thin progress bar fixed to the top of the viewport that fills
 * left-to-right as the reader scrolls through a post. Only activates on post
 * pages (when .post__content exists). Uses transform: scaleX() for
 * GPU-accelerated rendering. Respects prefers-reduced-motion.
 */

/** CSS class for the progress bar element */
const BAR_CLASS = 'scroll-progress';

/**
 * Creates the progress bar element and prepends it to document.body.
 *
 * @returns {HTMLElement} The progress bar element
 */
function createBar() {
    const bar = document.createElement('div');
    bar.className = BAR_CLASS;
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Reading progress');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', '0');

    document.body.prepend(bar);
    return bar;
}

/**
 * Calculates the scroll percentage based on the post content area.
 *
 * @param {HTMLElement} contentEl - The .post__content element
 * @returns {number} Scroll percentage between 0 and 1
 */
function getScrollPercent(contentEl) {
    const rect = contentEl.getBoundingClientRect();
    const contentTop = rect.top + window.scrollY;
    const contentHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // How far the user has scrolled into the content area
    const scrolled = window.scrollY - contentTop;
    // Total scrollable distance within the content
    const scrollable = contentHeight - viewportHeight;

    if (scrollable <= 0) {
        return 1;
    }

    return Math.min(Math.max(scrolled / scrollable, 0), 1);
}

/**
 * Initializes the scroll progress indicator. Creates the bar element and
 * attaches a scroll listener that updates its width on post pages.
 */
export function initScrollProgress() {
    const contentEl = document.querySelector('.post__content');
    if (!contentEl) {
        return;
    }

    const bar = createBar();

    /** Update the bar width on scroll */
    function onScroll() {
        const percent = getScrollPercent(contentEl);
        bar.style.transform = 'scaleX(' + percent + ')';
        bar.setAttribute('aria-valuenow', Math.round(percent * 100).toString());
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Set initial state
    onScroll();
}
