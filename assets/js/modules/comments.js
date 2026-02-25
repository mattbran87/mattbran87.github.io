/**
 * @file comments.js
 * @description Lazy-loads the Giscus comment widget into the offcanvas panel
 * on first open. Reads configuration from data attributes on the panel
 * element. Sets the Giscus theme to match the current site theme
 * (data-bs-theme). Prevents re-injection on subsequent opens.
 */

/** Selector for the offcanvas panel element */
const PANEL_SELECTOR = '#comments-panel';

/** Selector for the container where Giscus is injected */
const GISCUS_CONTAINER_SELECTOR = '.post-comments__giscus';

/** Giscus script source URL */
const GISCUS_SRC = 'https://giscus.app/client.js';

/**
 * Returns the Giscus theme name that matches the current site theme.
 * Maps data-bs-theme values to Giscus theme identifiers.
 *
 * @returns {string} Giscus theme name
 */
export function getGiscusTheme() {
    const siteTheme = document.documentElement.getAttribute('data-bs-theme');
    return siteTheme === 'dark' ? 'dark_dimmed' : 'light';
}

/**
 * Injects the Giscus script tag into the container element. Reads all
 * configuration from data attributes on the panel element.
 *
 * @param {HTMLElement} panel - The offcanvas panel with data-giscus-* attributes
 * @param {HTMLElement} container - The element to inject the script into
 */
function injectGiscus(panel, container) {
    const script = document.createElement('script');
    script.src = GISCUS_SRC;
    script.setAttribute('data-repo', panel.dataset.giscusRepo);
    script.setAttribute('data-repo-id', panel.dataset.giscusRepoId);
    script.setAttribute('data-category', panel.dataset.giscusCategory);
    script.setAttribute('data-category-id', panel.dataset.giscusCategoryId);
    script.setAttribute('data-mapping', panel.dataset.giscusMapping);
    script.setAttribute('data-strict', panel.dataset.giscusStrict);
    script.setAttribute('data-reactions-enabled', panel.dataset.giscusReactionsEnabled);
    script.setAttribute('data-emit-metadata', panel.dataset.giscusEmitMetadata);
    script.setAttribute('data-input-position', panel.dataset.giscusInputPosition);
    script.setAttribute('data-theme', getGiscusTheme());
    script.setAttribute('data-lang', panel.dataset.giscusLang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
}

/**
 * Sends a theme update message to the Giscus iframe via postMessage.
 * Giscus listens for messages with type "set-theme" on its iframe.
 *
 * @param {string} theme - Giscus theme name (e.g., "light", "dark_dimmed")
 */
export function setGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: theme } } },
            'https://giscus.app'
        );
    }
}

/**
 * Initializes the comments module. Listens for the first offcanvas
 * open event to lazy-load Giscus. Prevents re-injection on
 * subsequent opens.
 */
export function initComments() {
    const panel = document.querySelector(PANEL_SELECTOR);
    if (!panel) {
        return;
    }

    const container = panel.querySelector(GISCUS_CONTAINER_SELECTOR);
    if (!container) {
        return;
    }

    let loaded = false;

    // Lazy-load Giscus on first panel open
    panel.addEventListener('show.bs.offcanvas', function () {
        if (!loaded) {
            injectGiscus(panel, container);
            loaded = true;
        }
    });
}
