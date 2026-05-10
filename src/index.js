/**
 * XiaoP Liquid Glass Design System
 * @version 2.1.1
 * @author XiaoP
 * @license MIT
 */

// Core modules
import { initLiquidGlass, initLiquidGlassFilter, destroyLiquidGlass } from './core/liquid-glass.js';
import { generateDisplacementMap, getCachedDisplacementMap, clearDisplacementCache } from './core/shader.js';

// Components
import { LiquidGlassSelect, initAllSelects } from './components/select.js';

// Effects
import {
    initMouseTracking,
    initTiltEffect,
    initElasticMouse,
    initChromaticEffect,
    initMouseGlow,
    initClickBounce,
    initDynamicBorder
} from './effects/mouse.js';

import {
    initScrollBlur,
    initRippleEffect,
    initEntranceAnimations,
    initPageTransition,
    initScrollingBackground,
    initBackgroundSwitcher,
    initHoverGrowth
} from './effects/animations.js';

/**
 * Initialize all liquid glass effects
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoInit - Auto-initialize on DOMContentLoaded (default: true)
 * @param {boolean} options.effects - Enable all effects (default: true)
 * @param {boolean} options.select - Enable select transformation (default: true)
 */
function init(options = {}) {
    const config = {
        autoInit: true,
        effects: true,
        select: true,
        ...options
    };

    const initAll = () => {
        // Core
        initLiquidGlass();

        // Components
        if (config.select) {
            initAllSelects();
        }

        // Effects
        if (config.effects) {
            initMouseTracking();
            initScrollBlur();
            initRippleEffect();
            initEntranceAnimations();
            initPageTransition();
            initTiltEffect();
            initElasticMouse();
            initChromaticEffect();
            initMouseGlow();
            initClickBounce();
            initBackgroundSwitcher();
            initScrollingBackground();
            initHoverGrowth();
            initDynamicBorder();
        }
    };

    if (config.autoInit) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    } else {
        initAll();
    }
}

// Auto-initialize with default options
init();

// Export public API
export {
    // Core
    initLiquidGlass,
    initLiquidGlassFilter,
    destroyLiquidGlass,
    generateDisplacementMap,
    getCachedDisplacementMap,
    clearDisplacementCache,

    // Components
    LiquidGlassSelect,
    initAllSelects,

    // Mouse effects
    initMouseTracking,
    initTiltEffect,
    initElasticMouse,
    initChromaticEffect,
    initMouseGlow,
    initClickBounce,
    initDynamicBorder,

    // Animation effects
    initScrollBlur,
    initRippleEffect,
    initEntranceAnimations,
    initPageTransition,
    initScrollingBackground,
    initBackgroundSwitcher,
    initHoverGrowth,

    // Main init
    init
};

// Global exports for UMD build
if (typeof window !== 'undefined') {
    window.LiquidGlass = {
        init,
        initLiquidGlass,
        initLiquidGlassFilter,
        destroyLiquidGlass,
        LiquidGlassSelect,
        initLiquidGlassSelects: initAllSelects,
        generateDisplacementMap,
        getCachedDisplacementMap,
        clearDisplacementCache,
        initMouseTracking,
        initTiltEffect,
        initElasticMouse,
        initChromaticEffect,
        initMouseGlow,
        initClickBounce,
        initScrollBlur,
        initRippleEffect,
        initEntranceAnimations,
        initPageTransition,
        initBackgroundSwitcher,
        initScrollingBackground,
        initHoverGrowth,
        initDynamicBorder
    };
}
