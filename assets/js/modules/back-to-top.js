/**
 * @file back-to-top.js
 * @description Floating "back to top" button that appears after the user
 * scrolls past a threshold. Smooth-scrolls to the top of the page on click.
 * Respects prefers-reduced-motion by using instant scroll behavior.
 */

/** Scroll distance (px) before the button appears */
const SCROLL_THRESHOLD = 300;

/** BEM modifier class for the visible state */
const VISIBLE_CLASS = 'back-to-top--visible';

/**
 * Initializes the back-to-top button. Attaches a scroll listener that
 * toggles visibility and a click handler that scrolls to the top.
 */
export function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) {
        return;
    }

    // Remove the hidden attribute so CSS controls visibility via opacity
    button.removeAttribute('hidden');

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    /** Toggle button visibility based on scroll position */
    function onScroll() {
        const isVisible = button.classList.contains(VISIBLE_CLASS);
        const pastThreshold = window.scrollY > SCROLL_THRESHOLD;

        if (pastThreshold && !isVisible) {
            button.classList.add(VISIBLE_CLASS);
        } else if (!pastThreshold && isVisible) {
            button.classList.remove(VISIBLE_CLASS);
        }
    }

    /** Scroll to the top of the page */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion.matches ? 'instant' : 'smooth'
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    button.addEventListener('click', scrollToTop);

    // Check initial scroll position (e.g., page reload mid-scroll)
    onScroll();
}
