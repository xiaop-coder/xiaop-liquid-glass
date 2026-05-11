/**
 * Utility helper functions for Liquid Glass
 * @module utils/helpers
 */

/**
 * Smooth step interpolation function
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor
 * @returns {number} Interpolated value
 */
export function smoothStep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
}

/**
 * Calculate 2D vector length
 * @param {number} x - X component
 * @param {number} y - Y component
 * @returns {number} Vector length
 */
export function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

/**
 * Rounded rectangle Signed Distance Field
 * @param {number} x - X coordinate (centered)
 * @param {number} y - Y coordinate (centered)
 * @param {number} width - Half width
 * @param {number} height - Half height
 * @param {number} radius - Corner radius
 * @returns {number} Signed distance
 */
export function roundedRectSDF(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}

/**
 * Throttle function execution using requestAnimationFrame
 * @param {Function} fn - Function to throttle
 * @returns {Function} Throttled function
 */
export function rafThrottle(fn) {
    let rafId = null;
    return function(...args) {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            fn.apply(this, args);
            rafId = null;
        });
    };
}

/**
 * Debounce function execution
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay) {
    let timeoutId = null;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'lg') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} Is element visible
 */
export function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return vertInView && horInView;
}
