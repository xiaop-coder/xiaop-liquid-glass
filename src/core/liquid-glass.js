/**
 * Liquid Glass 4-layer structure initialization
 * @module core/liquid-glass
 */

import { getCachedDisplacementMap } from './shader.js';
import { buildRefractionFilter, buildChromaFilter, createFilterContainer } from './filter.js';

/**
 * Initialize SVG filters for all refraction modes
 * @returns {SVGSVGElement} SVG filter container
 */
export function initLiquidGlassFilter() {
    // Check if already initialized
    if (document.getElementById('liquid-glass-svg-filters')) {
        return document.getElementById('liquid-glass-svg-filters');
    }

    const svg = createFilterContainer();
    const defs = svg.querySelector('defs');

    const modes = ['standard', 'polar', 'prominent'];
    const mapSize = 128;

    modes.forEach(mode => {
        const mapUrl = getCachedDisplacementMap(mapSize, mode);

        // Determine scale based on mode
        let modeScale = 60;
        if (mode === 'prominent') modeScale = 85;
        if (mode === 'polar') modeScale = 55;

        // Create refraction filter
        const refrFilter = buildRefractionFilter(`lg-rf-${mode}`, mapUrl, modeScale);
        defs.appendChild(refrFilter);

        // Create chromatic aberration filter
        const chromaScales = mode === 'prominent' ? [-85, -80, -75] : [-70, -66.5, -63];
        const chromaFilter = buildChromaFilter(`lg-cf-${mode}`, mapUrl, chromaScales);
        defs.appendChild(chromaFilter);
    });

    document.body.appendChild(svg);
    return svg;
}

/**
 * Create 4-layer liquid glass structure for an element
 * @param {HTMLElement} element - Target element
 * @param {string} mode - Refraction mode (standard, polar, prominent, frosted)
 */
export function createLiquidGlassLayers(element, mode = 'standard') {
    // Skip if already initialized
    if (element.querySelector('.liquid-glass-outer')) {
        return;
    }

    const filterId = mode === 'frosted' ? 'none' : `lg-rf-${mode}`;
    const chromaId = `lg-cf-${mode}`;

    // Move existing content to content layer
    const content = document.createElement('div');
    content.className = 'liquid-glass-content';
    while (element.firstChild) {
        content.appendChild(element.firstChild);
    }

    // Create 4 layers
    const outer = document.createElement('div');
    outer.className = 'liquid-glass-outer';
    outer.style.backdropFilter = `url(#${filterId})`;
    outer.style.webkitBackdropFilter = `url(#${filterId})`;

    const cover = document.createElement('div');
    cover.className = 'liquid-glass-cover';

    const sharp = document.createElement('div');
    sharp.className = 'liquid-glass-sharp';

    const reflect = document.createElement('div');
    reflect.className = 'liquid-glass-reflect';

    // Append layers in order
    element.appendChild(outer);
    element.appendChild(cover);
    element.appendChild(sharp);
    element.appendChild(reflect);
    element.appendChild(content);

    // Apply chromatic aberration if requested
    if (element.hasAttribute('data-chromatic') || element.classList.contains('glass-chromatic')) {
        element.style.setProperty('--lg-chroma-filter', `url(#${chromaId})`);
    }
}

/**
 * Initialize all liquid glass elements on the page
 * @param {string|NodeList|HTMLElement} selector - Elements to initialize
 */
export function initLiquidGlass(selector) {
    // Initialize SVG filters first
    initLiquidGlassFilter();

    // Get elements
    let elements = [];
    if (typeof selector === 'string') {
        const selectors = [
            '.liquid-glass',
            '.liquid-glass-btn',
            '.liquid-glass-pill',
            '.liquid-glass-nav',
            '[data-liquid-glass]',
            '[data-liquid-glass="card"]',
            '[data-liquid-glass="btn"]',
            '[data-liquid-glass="pill"]',
            '[data-liquid-glass="nav"]',
            '[data-liquid-glass="icon"]'
        ];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (!elements.includes(el)) elements.push(el);
            });
        });
    } else if (selector instanceof NodeList) {
        elements = Array.from(selector);
    } else if (selector instanceof HTMLElement) {
        elements = [selector];
    } else {
        // Default: find all liquid glass elements
        const selectors = ['.liquid-glass', '[data-liquid-glass]'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (!elements.includes(el)) elements.push(el);
            });
        });
    }

    // Initialize each element
    elements.forEach(el => {
        const mode = el.getAttribute('data-refraction-mode') || 'standard';
        createLiquidGlassLayers(el, mode);
    });
}

/**
 * Destroy liquid glass layers from an element
 * @param {HTMLElement} element - Target element
 */
export function destroyLiquidGlass(element) {
    const layers = [
        '.liquid-glass-outer',
        '.liquid-glass-cover',
        '.liquid-glass-sharp',
        '.liquid-glass-reflect'
    ];

    layers.forEach(selector => {
        const layer = element.querySelector(selector);
        if (layer) layer.remove();
    });

    // Move content back
    const content = element.querySelector('.liquid-glass-content');
    if (content) {
        while (content.firstChild) {
            element.appendChild(content.firstChild);
        }
        content.remove();
    }
}
