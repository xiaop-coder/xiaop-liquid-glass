/**
 * Shader and displacement map generation
 * @module core/shader
 */

import { smoothStep, roundedRectSDF, length } from '../utils/helpers.js';

/**
 * Generate displacement map from fragment shader function
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {Function} fragmentFn - Fragment shader function
 * @returns {string} Data URL of displacement map
 */
export function generateDisplacementMap(width, height, fragmentFn) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const data = new Uint8ClampedArray(width * height * 4);
    let maxScale = 0;
    const rawValues = [];

    // First pass: calculate displacement values
    for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        const uv = { x: x / width, y: y / height };
        const pos = fragmentFn(uv);
        const dx = pos.x * width - x;
        const dy = pos.y * height - y;
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
    }

    // Normalize scale
    maxScale *= 0.5;
    if (maxScale < 1) maxScale = 1;

    // Second pass: encode to RGB
    let idx = 0;
    for (let j = 0; j < data.length; j += 4) {
        const r = rawValues[idx++] / maxScale + 0.5;
        const g = rawValues[idx++] / maxScale + 0.5;
        data[j] = r * 255;
        data[j + 1] = g * 255;
        data[j + 2] = 128;
        data[j + 3] = 255;
    }

    ctx.putImageData(new ImageData(data, width, height), 0, 0);
    return canvas.toDataURL();
}

// SDF parameters
const SDF_WIDTH = 0.35;
const SDF_HEIGHT = 0.25;
const SDF_RADIUS = 0.6;

/**
 * Standard liquid glass fragment shader
 * @param {Object} uv - UV coordinates {x, y}
 * @returns {Object} Displaced UV coordinates
 */
export function liquidGlassFragmentStandard(uv) {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const d = roundedRectSDF(ix, iy, SDF_WIDTH, SDF_HEIGHT, SDF_RADIUS);
    const disp = smoothStep(0.05, -0.08, d);
    const s = 1 - smoothStep(-0.12, -0.02, d) * 0.4;
    return { x: ix * s + 0.5, y: iy * s + 0.5 };
}

/**
 * Polar coordinate liquid glass fragment shader
 * @param {Object} uv - UV coordinates {x, y}
 * @returns {Object} Displaced UV coordinates
 */
export function liquidGlassFragmentPolar(uv) {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const r = Math.sqrt(ix * ix + iy * iy);
    const angle = Math.atan2(iy, ix);
    const d = r - 0.38;
    const disp = smoothStep(0.06, -0.06, d);
    const s = 1 - disp * 0.5;
    return { x: Math.cos(angle) * r * s + 0.5, y: Math.sin(angle) * r * s + 0.5 };
}

/**
 * Prominent edge refraction fragment shader
 * @param {Object} uv - UV coordinates {x, y}
 * @returns {Object} Displaced UV coordinates
 */
export function liquidGlassFragmentProminent(uv) {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const d = roundedRectSDF(ix, iy, SDF_WIDTH, SDF_HEIGHT, SDF_RADIUS);
    const disp = smoothStep(0.08, -0.1, d);
    const s = 1 - disp * 0.65;
    return { x: ix * s + 0.5, y: iy * s + 0.5 };
}

/**
 * Frosted glass (no refraction)
 * @param {Object} uv - UV coordinates {x, y}
 * @returns {Object} Original UV coordinates
 */
export function liquidGlassFragmentFrosted(uv) {
    return { x: uv.x, y: uv.y };
}

/**
 * Shader mode registry
 */
export const shaderModes = {
    standard: liquidGlassFragmentStandard,
    polar: liquidGlassFragmentPolar,
    prominent: liquidGlassFragmentProminent,
    frosted: liquidGlassFragmentFrosted
};

/**
 * Displacement map cache
 */
const displacementCache = new Map();

/**
 * Get cached displacement map or generate new one
 * @param {number} size - Map size
 * @param {string} mode - Shader mode
 * @returns {string} Data URL
 */
export function getCachedDisplacementMap(size, mode) {
    const key = `${size}_${mode}`;
    if (displacementCache.has(key)) {
        return displacementCache.get(key);
    }
    const shaderFn = shaderModes[mode] || shaderModes.standard;
    const url = generateDisplacementMap(size, size, shaderFn);
    displacementCache.set(key, url);
    return url;
}

/**
 * Clear displacement map cache
 */
export function clearDisplacementCache() {
    displacementCache.clear();
}
