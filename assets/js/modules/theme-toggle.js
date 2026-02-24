/**
 * @file theme-toggle.js
 * @description Handles toggling between light and dark themes by updating
 * the data-bs-theme attribute on the document root and persisting the user's
 * preference to localStorage. Listens for system preference changes via
 * the prefers-color-scheme media query and syncs accordingly when no manual
 * preference is saved.
 */

/** Duration in ms to show screen reader announcement before clearing */
const ANNOUNCEMENT_DURATION = 2000;

/**
 * Applies the given theme to the document root by setting the
 * data-bs-theme attribute. Bootstrap and project custom properties
 * respond to this attribute automatically.
 *
 * @param {string} theme - The theme to apply ("light" or "dark")
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
}

/**
 * Updates the toggle button's visually hidden label text to reflect
 * the action that will occur on the next click.
 *
 * @param {string} currentTheme - The currently active theme
 * @param {HTMLElement} label - The visually hidden label element
 */
function updateToggleLabel(currentTheme, label) {
    if (label) {
        label.textContent = currentTheme === 'dark'
            ? 'Switch to light mode'
            : 'Switch to dark mode';
    }
}

/**
 * Announces a theme change to screen readers via the aria-live region.
 * Clears the announcement after a delay to prevent stale text.
 *
 * @param {string} theme - The theme that was just activated
 * @param {HTMLElement} statusRegion - The aria-live status element
 */
function announceThemeChange(theme, statusRegion) {
    if (statusRegion) {
        const modeName = theme === 'dark' ? 'Dark' : 'Light';
        statusRegion.textContent = modeName + ' mode enabled';

        // Clear after delay
        setTimeout(function () {
            statusRegion.textContent = '';
        }, ANNOUNCEMENT_DURATION);
    }
}

/**
 * Initializes the theme toggle functionality. Sets up click handler,
 * system preference listener, and initial label state.
 */
export function initThemeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    const label = document.querySelector('#theme-toggle-label');
    const statusRegion = document.querySelector('#theme-toggle-status');

    // Guard against missing elements
    if (!toggle) {
        return;
    }

    // Set initial label based on current theme
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    updateToggleLabel(currentTheme, label);

    // Handle toggle click
    toggle.addEventListener('click', function () {
        const active = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const next = active === 'dark' ? 'light' : 'dark';

        applyTheme(next);
        updateToggleLabel(next, label);
        announceThemeChange(next, statusRegion);

        // Persist manual choice
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Storage unavailable — continue without persistence
        }
    });

    // Listen for OS-level color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function (e) {
        // Only respond if no manual preference is saved
        try {
            if (localStorage.getItem('theme')) {
                return;
            }
        } catch (err) {
            // Storage unavailable — respond to system change
        }

        const systemTheme = e.matches ? 'dark' : 'light';
        applyTheme(systemTheme);
        updateToggleLabel(systemTheme, label);
    });
}
