/**
 * @file search.js
 * @description Client-side blog search using Lunr.js. Fetches a JSON search
 * index generated at build time, builds a Lunr index with boosted fields
 * (title, tags, categories, excerpt, content), and renders results as the
 * user types. Debounced at 300ms to avoid excessive index queries. Handles
 * empty query, no results, and loading states. Supports ?q= URL parameter
 * for SearchAction integration (arriving from search engines).
 */

(function () {
    /** @type {HTMLInputElement|null} */
    var searchInput = document.getElementById('search-input');
    /** @type {HTMLElement|null} */
    var resultsContainer = document.getElementById('search-results');

    // Guard: only run on pages with the search input
    if (!searchInput || !resultsContainer) {
        return;
    }

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
     *     (e.g., "default", "loading", "no-results")
     */
    function showStatus(message, modifier) {
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
     * Renders an array of search results into the results container. Each
     * result is displayed as a post card with linked title, date, excerpt,
     * and tags. Matches the existing `.post-card` styling pattern.
     *
     * @param {Array<Object>} results - Lunr search result objects with
     *     `ref` and `score` properties
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
            html += '<time>' + escapeHtml(doc.date) + '</time>';
            html += '</div>';
            html += '<p class="post-card__excerpt">' + escapeHtml(doc.excerpt) + '</p>';

            // Render tags as pill links
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
     * Performs a search against the Lunr index using the current input value.
     * Handles empty queries by showing the default state. Wraps the Lunr
     * search call in a try/catch to gracefully handle malformed queries
     * (e.g., unmatched quotes or invalid syntax).
     */
    function performSearch() {
        var query = searchInput.value.trim();

        if (query.length === 0) {
            showStatus('Enter a search term to find posts.', 'default');
            return;
        }

        if (!searchIndex) {
            showStatus('Search index is loading...', 'loading');
            return;
        }

        try {
            var results = searchIndex.search(query);
            renderResults(results);
        } catch (e) {
            // Lunr throws on malformed queries (e.g., lone wildcard, unmatched quotes)
            showStatus('No posts found. Try a different search term.', 'no-results');
        }
    }

    /**
     * Debounced input handler. Clears any pending timer and schedules a new
     * search after DEBOUNCE_MS milliseconds of inactivity.
     */
    function onInput() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, DEBOUNCE_MS);
    }

    /**
     * Fetches the search index JSON from the server, builds the Lunr index
     * with field boosts, and stores the raw documents for result rendering.
     * Shows a loading state while the index is being built.
     */
    function loadSearchIndex() {
        showStatus('Loading search index...', 'loading');

        var request = new XMLHttpRequest();
        request.open('GET', '/search-index.json', true);

        request.onload = function () {
            if (request.status < 200 || request.status >= 400) {
                showStatus('Failed to load search index. Please try refreshing the page.', 'error');
                return;
            }

            try {
                searchDocuments = JSON.parse(request.responseText);
            } catch (e) {
                showStatus('Failed to load search index. Please try refreshing the page.', 'error');
                return;
            }

            // Build the Lunr index with field boosts
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

            // Index ready — show default state or run pending query
            if (searchInput.value.trim().length > 0) {
                performSearch();
            } else {
                showStatus('Enter a search term to find posts.', 'default');
            }
        };

        request.onerror = function () {
            showStatus('Failed to load search index. Please try refreshing the page.', 'error');
        };

        request.send();
    }

    // Populate search input from ?q= URL parameter (e.g., from SearchAction)
    try {
        var urlParams = new URLSearchParams(window.location.search);
        var queryParam = urlParams.get('q');
        if (queryParam) {
            searchInput.value = queryParam;
        }
    } catch (e) {
        // URLSearchParams not supported — ignore
    }

    // Bind input event for live search
    searchInput.addEventListener('input', onInput);

    // Also search on Enter key (for keyboard users)
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            clearTimeout(debounceTimer);
            performSearch();
        }
    });

    // Load the search index (will auto-search if ?q= param populated the input)
    loadSearchIndex();
})();
