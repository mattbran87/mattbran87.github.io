/**
 * @file toc.js
 * @description Auto-generates a table of contents from h2–h4 headings in
 * .post__content. Inserts a <nav> element before the first h2. Provides
 * active heading highlighting via IntersectionObserver and adds tabindex="-1"
 * to target headings for focus management on fragment navigation.
 *
 * Controlled by:
 *   - data-toc="false" on .post__content to suppress TOC
 *   - data-toc-exclude on any heading to skip it
 *   - Minimum 3 qualifying headings required to display
 */

/** CSS selectors for headings to include in the TOC */
const HEADING_SELECTOR = 'h2, h3, h4';

/** Minimum number of headings required to generate a TOC */
const MIN_HEADINGS = 3;

/** Margin above the viewport for IntersectionObserver to trigger */
const OBSERVER_ROOT_MARGIN = '0px 0px -70% 0px';

/**
 * Collects qualifying headings from the content area.
 * Skips headings with [data-toc-exclude] attribute.
 *
 * @param {HTMLElement} contentEl - The .post__content element
 * @returns {HTMLElement[]} Array of heading elements
 */
function collectHeadings(contentEl) {
    const all = contentEl.querySelectorAll(HEADING_SELECTOR);
    const headings = [];

    for (const heading of all) {
        if (heading.hasAttribute('data-toc-exclude')) {
            continue;
        }
        // Ensure heading has an id (Kramdown auto-generates these)
        if (!heading.id) {
            continue;
        }
        headings.push(heading);
    }

    return headings;
}

/**
 * Returns the numeric heading level (2, 3, or 4) for an element.
 *
 * @param {HTMLElement} heading - An h2, h3, or h4 element
 * @returns {number} The heading level
 */
function getLevel(heading) {
    return parseInt(heading.tagName.charAt(1), 10);
}

/**
 * Builds a nested list structure from a flat array of headings.
 * h2 entries are top-level, h3 entries nest under the preceding h2,
 * h4 entries nest under the preceding h3.
 *
 * @param {HTMLElement[]} headings - Array of heading elements
 * @returns {HTMLOListElement} The root <ol> element
 */
function buildList(headings) {
    const root = document.createElement('ol');
    root.className = 'article-toc__list';

    /** @type {{ list: HTMLOListElement, level: number }[]} */
    const stack = [{ list: root, level: 1 }];

    for (const heading of headings) {
        const level = getLevel(heading);

        // Pop stack until we find the parent level
        while (stack.length > 1 && stack[stack.length - 1].level >= level) {
            stack.pop();
        }

        // If we need to nest deeper, create a sub-list inside the last <li>
        const parent = stack[stack.length - 1];
        if (level > parent.level) {
            const lastItem = parent.list.lastElementChild;
            if (lastItem) {
                const subList = document.createElement('ol');
                subList.className = 'article-toc__list';
                lastItem.appendChild(subList);
                stack.push({ list: subList, level: level });
            }
        }

        const currentList = stack[stack.length - 1].list;

        const li = document.createElement('li');
        li.className = 'article-toc__item';
        li.dataset.tocTarget = heading.id;

        const link = document.createElement('a');
        link.className = 'article-toc__link';
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;

        li.appendChild(link);
        currentList.appendChild(li);
    }

    return root;
}

/**
 * Builds the full <nav> element for the TOC.
 *
 * @param {HTMLElement[]} headings - Array of heading elements
 * @returns {HTMLElement} The <nav> element
 */
function buildTocNav(headings) {
    const nav = document.createElement('nav');
    nav.className = 'article-toc';
    nav.setAttribute('aria-labelledby', 'article-toc-heading');

    const heading = document.createElement('h2');
    heading.className = 'article-toc__heading';
    heading.id = 'article-toc-heading';
    heading.textContent = 'Table of Contents';

    nav.appendChild(heading);
    nav.appendChild(buildList(headings));

    return nav;
}

/**
 * Sets up IntersectionObserver to highlight the active TOC item
 * as the user scrolls through the post.
 *
 * @param {HTMLElement[]} headings - Array of heading elements
 * @param {HTMLElement} nav - The TOC <nav> element
 */
function observeActiveHeading(headings, nav) {
    /** @type {string|null} */
    let activeId = null;

    function setActive(id) {
        if (id === activeId) {
            return;
        }

        // Remove previous active state
        if (activeId) {
            const prev = nav.querySelector(
                '[data-toc-target="' + activeId + '"]'
            );
            if (prev) {
                prev.classList.remove('article-toc__item--active');
            }
        }

        // Set new active state
        activeId = id;
        if (id) {
            const current = nav.querySelector(
                '[data-toc-target="' + id + '"]'
            );
            if (current) {
                current.classList.add('article-toc__item--active');
            }
        }
    }

    const observer = new IntersectionObserver(
        function (entries) {
            // Find the topmost visible heading
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                    return;
                }
            }
        },
        { rootMargin: OBSERVER_ROOT_MARGIN }
    );

    for (const heading of headings) {
        observer.observe(heading);
    }
}

/**
 * Initializes the article table of contents. Scans .post__content for
 * headings, builds the TOC, and inserts it before the first h2.
 * Adds tabindex="-1" to target headings for focus management.
 */
export function initToc() {
    const contentEl = document.querySelector('.post__content');
    if (!contentEl) {
        return;
    }

    // Respect data-toc="false" opt-out
    if (contentEl.dataset.toc === 'false') {
        return;
    }

    const headings = collectHeadings(contentEl);

    // Only show TOC if minimum heading count is met
    if (headings.length < MIN_HEADINGS) {
        return;
    }

    // Add tabindex="-1" to target headings for focus management (S9)
    for (const heading of headings) {
        heading.setAttribute('tabindex', '-1');
    }

    // Build and insert TOC before the first h2
    const nav = buildTocNav(headings);
    const firstH2 = contentEl.querySelector('h2');
    if (firstH2) {
        firstH2.parentNode.insertBefore(nav, firstH2);
    } else {
        // Fallback: prepend to content (after any series line)
        const seriesLine = contentEl.querySelector('.post__series-line');
        if (seriesLine) {
            seriesLine.after(nav);
        } else {
            contentEl.prepend(nav);
        }
    }

    // Set up active heading tracking
    observeActiveHeading(headings, nav);
}
