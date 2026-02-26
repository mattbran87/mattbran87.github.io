/**
 * @file sticky-header.js
 * @description Adds a shadow to the sticky site header when the page is
 * scrolled, providing visual separation from content beneath.
 */

/** BEM modifier class for the scrolled state */
const SCROLLED_CLASS = 'site-header--scrolled';

/**
 * Initializes the sticky header shadow behavior. Attaches a scroll
 * listener that toggles the shadow class based on scroll position.
 */
export function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) {
        return;
    }

    /** Toggle shadow based on scroll position */
    function onScroll() {
        const isScrolled = header.classList.contains(SCROLLED_CLASS);
        const pastTop = window.scrollY > 0;

        if (pastTop && !isScrolled) {
            header.classList.add(SCROLLED_CLASS);
        } else if (!pastTop && isScrolled) {
            header.classList.remove(SCROLLED_CLASS);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Check initial scroll position (e.g., page reload mid-scroll)
    onScroll();
}
