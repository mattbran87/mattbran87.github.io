/**
 * @file cookie-consent.js
 * @description Cookie consent banner interaction logic. Reads/writes consent
 * state in localStorage. Updates Google Consent Mode v2 on user choice.
 * Clears GA4 cookies when consent is withdrawn.
 */

/** localStorage key for consent state */
const STORAGE_KEY = 'cookie_consent';

/** Consent values */
const CONSENT_GRANTED = 'granted';
const CONSENT_DENIED = 'denied';

/**
 * Reads the stored consent value from localStorage.
 * @returns {string|null} 'granted', 'denied', or null if no choice stored
 */
function getStoredConsent() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        // localStorage unavailable (private browsing, quota exceeded, etc.)
        return null;
    }
}

/**
 * Saves the consent value to localStorage.
 * @param {string} value - 'granted' or 'denied'
 */
function setStoredConsent(value) {
    try {
        localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // localStorage unavailable — consent applies to this page load only
    }
}

/**
 * Updates Google Consent Mode v2 consent state.
 * @param {string} analyticsStorage - 'granted' or 'denied'
 */
function updateGtagConsent(analyticsStorage) {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': analyticsStorage
        });
    }
}

/**
 * Clears all GA4 cookies (_ga, _ga_*) by setting them as expired.
 * Covers both root path and common path variations.
 */
function clearGaCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
            // Clear with multiple domain/path combinations
            const hostname = window.location.hostname;
            const domain = hostname.startsWith('www.')
                ? hostname.substring(3)
                : hostname;

            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`;
        }
    }
}

/**
 * Shows the consent banner by removing the hidden attribute.
 * @param {HTMLElement} banner - The cookie consent banner element
 */
function showBanner(banner) {
    banner.removeAttribute('hidden');
}

/**
 * Hides the consent banner by setting the hidden attribute.
 * @param {HTMLElement} banner - The cookie consent banner element
 */
function hideBanner(banner) {
    banner.setAttribute('hidden', '');
}

/**
 * Handles the user accepting cookies. Updates consent state, hides banner,
 * and persists the choice.
 * @param {HTMLElement} banner - The cookie consent banner element
 */
function handleAccept(banner) {
    updateGtagConsent(CONSENT_GRANTED);
    setStoredConsent(CONSENT_GRANTED);
    hideBanner(banner);
}

/**
 * Handles the user declining cookies. Updates consent state, hides banner,
 * and persists the choice.
 * @param {HTMLElement} banner - The cookie consent banner element
 */
function handleDecline(banner) {
    updateGtagConsent(CONSENT_DENIED);
    setStoredConsent(CONSENT_DENIED);
    hideBanner(banner);
}

/**
 * Initializes the cookie consent banner. Checks for stored consent and
 * either applies it silently or shows the banner for user choice. Also
 * wires up the footer Cookie Settings button to re-show the banner.
 */
export function initCookieConsent() {
    const banner = document.querySelector('.cookie-consent');
    if (!banner) {
        return;
    }

    const acceptBtn = banner.querySelector('.cookie-consent__btn--accept');
    const declineBtn = banner.querySelector('.cookie-consent__btn--decline');
    const settingsBtn = document.querySelector('.site-footer__consent-btn');

    const storedConsent = getStoredConsent();

    if (storedConsent === CONSENT_GRANTED) {
        // User previously accepted — update consent silently
        updateGtagConsent(CONSENT_GRANTED);
    } else if (storedConsent === CONSENT_DENIED) {
        // User previously declined — clear any lingering cookies
        clearGaCookies();
    } else {
        // No stored consent — show the banner
        showBanner(banner);
    }

    // Banner button handlers
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => handleAccept(banner));
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => handleDecline(banner));
    }

    // Footer Cookie Settings button — re-shows the banner
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showBanner(banner);
        });
    }
}
