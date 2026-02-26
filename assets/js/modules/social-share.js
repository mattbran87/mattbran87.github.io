/**
 * @file social-share.js
 * @description Handles Copy Link and Web Share API functionality for social
 * share buttons. Reveals JS-dependent buttons on load, copies URLs to
 * clipboard with visual feedback, and invokes the native share sheet on
 * supported devices. Works with multiple instances on a single page
 * (post-card lists) via data-url attributes.
 */

/** Duration in ms to show "Copied!" feedback before reverting */
const FEEDBACK_DURATION = 2000;

/**
 * Creates the aria-live status region for screen reader announcements.
 *
 * @returns {HTMLDivElement} The status element
 */
function createStatusRegion() {
    const status = document.createElement('div');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.id = 'social-share-status';
    document.body.appendChild(status);
    return status;
}

/**
 * Handles the Copy Link button click. Copies the URL from the button's
 * data-url attribute to the clipboard and shows visual feedback.
 *
 * @param {HTMLButtonElement} button - The copy button that was clicked
 * @param {HTMLElement} statusRegion - The aria-live status region
 */
function handleCopy(button, statusRegion) {
    const url = button.getAttribute('data-url');

    navigator.clipboard.writeText(url).then(function () {
        // Visual feedback — color change via CSS modifier
        button.classList.add('social-share__button--copied');

        // Screen reader announcement
        statusRegion.textContent = 'Link copied to clipboard';

        // Revert after delay
        setTimeout(function () {
            button.classList.remove('social-share__button--copied');
            statusRegion.textContent = '';
        }, FEEDBACK_DURATION);
    }).catch(function () {
        statusRegion.textContent = 'Failed to copy link';
    });
}

/**
 * Handles the Web Share button click. Invokes the native share sheet
 * with the URL and title from the button's data attributes.
 *
 * @param {HTMLButtonElement} button - The share button that was clicked
 */
function handleNativeShare(button) {
    const url = button.getAttribute('data-url');
    const title = button.getAttribute('data-title');

    navigator.share({ title: title, url: url }).catch(function () {
        // User cancelled or share failed — no action needed
    });
}

/**
 * Initializes social share functionality on the page.
 * Reveals JS-dependent buttons, attaches click handlers, and sets up
 * Web Share API feature detection.
 */
export function initSocialShare() {
    const copyButtons = document.querySelectorAll('[data-social-share="copy"]');
    const nativeButtons = document.querySelectorAll('[data-social-share="native"]');
    const compactContainers = document.querySelectorAll('[data-social-share-compact]');

    // No share components on this page
    if (copyButtons.length === 0 && nativeButtons.length === 0) {
        return;
    }

    const statusRegion = createStatusRegion();

    // Reveal and wire up Copy Link buttons
    copyButtons.forEach(function (button) {
        button.removeAttribute('hidden');
        button.addEventListener('click', function () {
            handleCopy(button, statusRegion);
        });
    });

    // Reveal and wire up Web Share buttons (only if API is available)
    if (navigator.share) {
        nativeButtons.forEach(function (button) {
            button.removeAttribute('hidden');
            button.addEventListener('click', function () {
                handleNativeShare(button);
            });
        });
    }

    // Reveal compact containers (entirely JS-dependent)
    compactContainers.forEach(function (container) {
        container.removeAttribute('hidden');
    });
}
