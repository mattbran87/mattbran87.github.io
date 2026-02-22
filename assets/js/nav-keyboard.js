/**
 * @file nav-keyboard.js
 * @description Enhances the Bootstrap navbar collapse with keyboard support.
 * When the mobile navigation menu is open, pressing the Escape key closes
 * the menu and returns focus to the hamburger toggle button. This fills a
 * gap in Bootstrap's default behavior where Escape does not close the
 * collapse or manage focus.
 */

(function () {
    /**
     * Initializes the Escape key handler for the mobile navigation menu.
     * Listens for keydown events on the document and closes the Bootstrap
     * collapse if the Escape key is pressed while the menu is open. After
     * closing, focus is returned to the navbar toggle button.
     */
    function initNavKeyboard() {
        var navCollapse = document.getElementById('main-nav');
        var navToggle = document.querySelector('.navbar-toggler');

        // Guard against missing elements — not all pages may have the navbar
        if (!navCollapse || !navToggle) {
            return;
        }

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') {
                return;
            }

            // Only act when the mobile menu is open
            if (!navCollapse.classList.contains('show')) {
                return;
            }

            // Use Bootstrap's Collapse API to close the menu
            var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }

            // Return focus to the toggle button
            navToggle.focus();
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavKeyboard);
    } else {
        initNavKeyboard();
    }
})();
