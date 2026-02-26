/**
 * @file sidebar-sticky.js
 * @description Calculates the correct sticky `top` value for the sidebar
 * based on its height relative to the viewport. When the sidebar is shorter
 * than the viewport, it sticks below the header. When taller, it uses a
 * negative top so the sidebar scrolls naturally until its bottom edge
 * reaches the viewport bottom, then sticks. Scrolling back up reverses
 * the behavior automatically via CSS position: sticky.
 */

/** Bootstrap md breakpoint (px) — sidebar is only beside content above this */
const MD_BREAKPOINT = 768;

/** Spacing gap in px (~1.5rem at default font size) */
const GAP = 24;

/**
 * Initializes the sidebar sticky positioning. Measures the sidebar and
 * header heights, calculates the optimal sticky top, and recalculates
 * on window resize.
 */
export function initSidebarSticky() {
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.site-header');
    if (!sidebar || !header) {
        return;
    }

    /** Calculate and apply the sticky top value */
    function update() {
        // Only apply on desktop when sidebar is beside content
        if (window.innerWidth < MD_BREAKPOINT) {
            sidebar.style.top = '';
            return;
        }

        const headerHeight = header.offsetHeight;
        const sidebarHeight = sidebar.offsetHeight;
        const viewportHeight = window.innerHeight;

        // When sidebar fits: stick below the header with a gap
        const headerOffset = headerHeight + GAP;

        // When sidebar is taller: negative top so it scrolls until
        // its bottom edge reaches the viewport bottom, then sticks
        const bottomAligned = viewportHeight - sidebarHeight - GAP;

        sidebar.style.top = `${Math.min(headerOffset, bottomAligned)}px`;
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(update, 150);
    });

    update();
}
