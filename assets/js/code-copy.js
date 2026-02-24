/**
 * @file code-copy.js
 * @description Adds a copy-to-clipboard button to all code blocks on the page.
 * Injects a "Copy" button into each Rouge-generated code block container.
 * Uses the Clipboard API to copy code content. Provides visual feedback
 * ("Copied!" text) and screen reader announcements via an aria-live region.
 */

(function () {
    'use strict';

    /** Duration in ms to show "Copied!" feedback before reverting */
    var FEEDBACK_DURATION = 2000;

    /**
     * Creates the aria-live status region for screen reader announcements.
     * Must be in the DOM on page load for reliable screen reader detection.
     *
     * @returns {HTMLDivElement} The status element
     */
    function createStatusRegion() {
        var status = document.createElement('div');
        status.className = 'visually-hidden';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.id = 'code-copy-status';
        document.body.appendChild(status);
        return status;
    }

    /**
     * Extracts the text content from a code block, handling both standard
     * Rouge output and table-based line number layouts.
     *
     * Standard: div.highlighter-rouge > div.highlight > pre.highlight > code
     * Liquid:   figure.highlight > pre > code
     * Linenos:  td.rouge-code > pre (excludes line number gutter)
     *
     * @param {HTMLElement} container - The code block container element
     * @returns {string} The code text content
     */
    function getCodeText(container) {
        // If table-based line numbers, get code from the code column only
        var rougeCode = container.querySelector('td.rouge-code pre');
        if (rougeCode) {
            return rougeCode.textContent;
        }

        // Standard Rouge output — get text from the code element
        var codeEl = container.querySelector('pre code');
        if (codeEl) {
            return codeEl.textContent;
        }

        // Fallback — get text from the pre element directly
        var preEl = container.querySelector('pre');
        if (preEl) {
            return preEl.textContent;
        }

        return '';
    }

    /**
     * Handles the copy button click. Copies code text to clipboard and
     * shows visual and accessible feedback.
     *
     * @param {HTMLButtonElement} button - The copy button that was clicked
     * @param {HTMLElement} container - The parent code block container
     * @param {HTMLElement} statusRegion - The aria-live status region
     */
    function handleCopy(button, container, statusRegion) {
        var text = getCodeText(container);

        navigator.clipboard.writeText(text).then(function () {
            // Visual feedback
            button.textContent = 'Copied!';
            button.classList.add('code-block__copy--copied');

            // Screen reader announcement
            statusRegion.textContent = 'Code copied to clipboard';

            // Revert after delay
            setTimeout(function () {
                button.textContent = 'Copy';
                button.classList.remove('code-block__copy--copied');
                statusRegion.textContent = '';
            }, FEEDBACK_DURATION);
        }).catch(function () {
            // Clipboard write failed — notify the user
            statusRegion.textContent = 'Failed to copy code';
        });
    }

    /**
     * Creates a copy button element with proper accessibility attributes.
     *
     * @returns {HTMLButtonElement} The copy button
     */
    function createCopyButton() {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'code-block__copy';
        button.textContent = 'Copy';
        return button;
    }

    /**
     * Initializes copy buttons on all code blocks found on the page.
     * Targets both fenced code blocks (div.highlighter-rouge) and
     * Liquid highlight blocks (figure.highlight).
     */
    function init() {
        var codeBlocks = document.querySelectorAll(
            '.highlighter-rouge, figure.highlight'
        );

        // No code blocks on this page
        if (codeBlocks.length === 0) {
            return;
        }

        var statusRegion = createStatusRegion();

        codeBlocks.forEach(function (container) {
            var button = createCopyButton();

            button.addEventListener('click', function () {
                handleCopy(button, container, statusRegion);
            });

            container.appendChild(button);
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
