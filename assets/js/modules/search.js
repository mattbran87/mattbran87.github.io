/**
 * @file search.js
 * @description Client-side blog search using Lunr.js. Operates in two modes:
 *
 * 1. **Navbar mode** (all pages): The navbar search input (#navbar-search-input)
 *    triggers smart navigation on Enter — if exactly 1 result, navigates directly
 *    to that post; otherwise navigates to /search/?q=... for full results.
 *
 * 2. **Results page mode** (/search/): The search page input (#search-input) and
 *    results container (#search-results) provide live, debounced search with full
 *    result rendering. Reads ?q= URL parameter on load for SearchAction integration.
 *
 * Both modes share the same Lunr index (fetched once from /search-index.json).
 */

(function () {
    /** @type {HTMLInputElement|null} */
    var navbarInput = document.getElementById('navbar-search-input');
    /** @type {HTMLInputElement|null} */
    var pageInput = document.getElementById('search-input');
    /** @type {HTMLElement|null} */
    var resultsContainer = document.getElementById('search-results');

    // Guard: only run if at least one search element exists
    if (!navbarInput && !pageInput) {
        return;
    }

    /** @type {boolean} True when on the /search/ page with full results UI */
    var isSearchPage = !!(pageInput && resultsContainer);

    /** @type {lunr.Index|null} Lunr search index, built after data loads */
    var searchIndex = null;

    /** @type {Array<Object>} Raw post documents for display after search */
    var searchDocuments = [];

    /** @type {number} Debounce timer ID */
    var debounceTimer = 0;

    /** @type {number} Debounce delay in milliseconds */
    var DEBOUNCE_MS = 300;

    /**
     * Renders a status message inside the results container. Replaces all
     * existing content with a single paragraph element.
     *
     * @param {string} message - The message text to display
     * @param {string} modifier - BEM modifier for the status element
     */
    function showStatus(message, modifier) {
        if (!resultsContainer) {
            return;
        }
        resultsContainer.innerHTML =
            '<p class="search-results__status search-results__status--' + modifier + '">' +
            message +
            '</p>';
    }

    /**
     * Escapes HTML special characters in a string to prevent XSS when
     * inserting user-provided or index content into the DOM via innerHTML.
     *
     * @param {string} text - The raw text to escape
     * @returns {string} The HTML-safe string
     */
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    /**
     * Queries the Lunr index and returns the results array.
     * Returns an empty array if the index isn't ready or the query is invalid.
     *
     * @param {string} query - The search query string
     * @returns {Array<Object>} Lunr search result objects
     */
    function queryIndex(query) {
        if (!searchIndex || !query.trim()) {
            return [];
        }
        try {
            return searchIndex.search(query);
        } catch (e) {
            return [];
        }
    }

    /**
     * Renders an array of search results into the results container. Each
     * result is displayed as a post card with linked title, date, excerpt,
     * and tags.
     *
     * @param {Array<Object>} results - Lunr search result objects
     */
    function renderResults(results) {
        if (results.length === 0) {
            showStatus('No posts found. Try a different search term.', 'no-results');
            return;
        }

        var html = '<p class="search-results__count">' +
            results.length + (results.length === 1 ? ' result' : ' results') +
            ' found</p>';

        for (var i = 0; i < results.length; i++) {
            var doc = searchDocuments[results[i].ref];
            if (!doc) {
                continue;
            }

            html += '<article class="post-card">';
            html += '<h2 class="post-card__title">';
            html += '<a href="' + escapeHtml(doc.url) + '">' + escapeHtml(doc.title) + '</a>';
            html += '</h2>';
            html += '<div class="post-card__meta">';
            html += '<time' + (doc.isoDate ? ' datetime="' + escapeHtml(doc.isoDate) + '"' : '') + '>' + escapeHtml(doc.date) + '</time>';
            html += '</div>';
            html += '<p class="post-card__excerpt">' + escapeHtml(doc.excerpt) + '</p>';

            if (doc.tags && doc.tags.length > 0) {
                html += '<div class="post-card__tags">';
                for (var j = 0; j < doc.tags.length; j++) {
                    var tag = doc.tags[j];
                    var tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                    html += '<a class="tag" href="/tags/' + escapeHtml(tagSlug) + '/">' +
                        escapeHtml(tag) + '</a> ';
                }
                html += '</div>';
            }

            html += '</article>';
        }

        resultsContainer.innerHTML = html;
    }

    /**
     * Performs a search on the results page — renders results into the
     * results container. Used for live/debounced search on /search/.
     */
    function performPageSearch() {
        if (!pageInput || !resultsContainer) {
            return;
        }
        var query = pageInput.value.trim();

        if (query.length === 0) {
            showStatus('Enter a search term to find posts.', 'default');
            return;
        }

        if (!searchIndex) {
            showStatus('Search index is loading...', 'loading');
            return;
        }

        var results = queryIndex(query);
        renderResults(results);
    }

    /**
     * Handles navbar search submission. Queries the index and navigates:
     * - 1 result: directly to the matching post URL
     * - 0 or 2+ results: to /search/?q=...
     *
     * @param {string} query - The trimmed search query
     */
    function handleNavbarSearch(query) {
        if (!query) {
            return;
        }

        if (!searchIndex) {
            // Index not ready yet — fall back to search page
            window.location.href = '/search/?q=' + encodeURIComponent(query);
            return;
        }

        var results = queryIndex(query);

        if (results.length === 1) {
            var doc = searchDocuments[results[0].ref];
            if (doc && doc.url) {
                window.location.href = doc.url;
                return;
            }
        }

        // 0 or multiple results — go to search page
        window.location.href = '/search/?q=' + encodeURIComponent(query);
    }

    /**
     * Debounced input handler for the search page input.
     */
    function onPageInput() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performPageSearch, DEBOUNCE_MS);
    }

    /**
     * Fetches the search index JSON, builds the Lunr index with field boosts,
     * and stores the raw documents for result rendering.
     *
     * @param {Function} [callback] - Called after index is ready
     */
    function loadSearchIndex(callback) {
        if (isSearchPage) {
            showStatus('Loading search index...', 'loading');
        }

        var request = new XMLHttpRequest();
        request.open('GET', '/search-index.json', true);

        request.onload = function () {
            if (request.status < 200 || request.status >= 400) {
                if (isSearchPage) {
                    showStatus('Failed to load search index. Please try refreshing the page.', 'error');
                }
                return;
            }

            try {
                searchDocuments = JSON.parse(request.responseText);
            } catch (e) {
                if (isSearchPage) {
                    showStatus('Failed to load search index. Please try refreshing the page.', 'error');
                }
                return;
            }

            searchIndex = lunr(function () {
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('tags', { boost: 5 });
                this.field('categories', { boost: 5 });
                this.field('excerpt', { boost: 2 });
                this.field('content');

                for (var i = 0; i < searchDocuments.length; i++) {
                    var doc = searchDocuments[i];
                    this.add({
                        id: doc.id,
                        title: doc.title,
                        tags: doc.tags ? doc.tags.join(' ') : '',
                        categories: doc.categories ? doc.categories.join(' ') : '',
                        excerpt: doc.excerpt,
                        content: doc.content
                    });
                }
            });

            if (callback) {
                callback();
            }
        };

        request.onerror = function () {
            if (isSearchPage) {
                showStatus('Failed to load search index. Please try refreshing the page.', 'error');
            }
        };

        request.send();
    }

    // --- Search page setup ---
    if (isSearchPage) {
        // Populate search page input from ?q= URL parameter
        try {
            var urlParams = new URLSearchParams(window.location.search);
            var queryParam = urlParams.get('q');
            if (queryParam) {
                pageInput.value = queryParam;
            }
        } catch (e) {
            // URLSearchParams not supported — ignore
        }

        // Bind input event for live search on the search page
        pageInput.addEventListener('input', onPageInput);

        // Enter key on search page input triggers immediate search
        pageInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                clearTimeout(debounceTimer);
                performPageSearch();
            }
        });
    }

    // --- Navbar search setup ---
    if (navbarInput) {
        var navbarForm = document.getElementById('navbar-search');

        // Handle Enter key on the input
        navbarInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                var query = navbarInput.value.trim();
                handleNavbarSearch(query);
            }
        });

        // Handle form submit (AT or mobile may trigger submit directly)
        if (navbarForm) {
            navbarForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var query = navbarInput.value.trim();
                handleNavbarSearch(query);
            });
        }
    }

    // Load the search index — on search page, auto-run if ?q= param present
    loadSearchIndex(function () {
        if (isSearchPage && pageInput.value.trim().length > 0) {
            performPageSearch();
        } else if (isSearchPage) {
            showStatus('Enter a search term to find posts.', 'default');
        }
    });
})();
