/**
 * Type definitions for XiaoP Liquid Glass Design System
 * @version 2.1.1
 */

export interface LiquidGlassOptions {
    autoInit?: boolean;
    effects?: boolean;
    select?: boolean;
}

export interface UVCoordinates {
    x: number;
    y: number;
}

export type FragmentShaderFunction = (uv: UVCoordinates) => UVCoordinates;

export type RefractionMode = 'standard' | 'polar' | 'prominent' | 'frosted';

// Core API
export function init(options?: LiquidGlassOptions): void;
export function initLiquidGlass(selector?: string | NodeList | HTMLElement): void;
export function initLiquidGlassFilter(): SVGSVGElement;
export function destroyLiquidGlass(element: HTMLElement): void;

// Shader API
export function generateDisplacementMap(
    width: number,
    height: number,
    fragmentFn: FragmentShaderFunction
): string;
export function getCachedDisplacementMap(size: number, mode: RefractionMode): string;
export function clearDisplacementCache(): void;

// Component API
export class LiquidGlassSelect {
    constructor(selectEl: HTMLSelectElement);
    init(): void;
    toggle(): void;
    open(): void;
    close(): void;
    closeAll(): void;
    selectOption(index: number): void;
    destroy(): void;
}

export function initAllSelects(selector?: string): LiquidGlassSelect[];

// Mouse Effects API
export function initMouseTracking(): void;
export function initTiltEffect(): void;
export function initElasticMouse(): void;
export function initChromaticEffect(): void;
export function initMouseGlow(): void;
export function initClickBounce(): void;
export function initDynamicBorder(): void;

// Animation Effects API
export function initScrollBlur(): void;
export function initRippleEffect(): void;
export function initEntranceAnimations(): void;
export function initPageTransition(): void;
export function initScrollingBackground(): void;
export function initBackgroundSwitcher(): void;
export function initHoverGrowth(): void;

// Global namespace (for UMD builds)
declare global {
    interface Window {
        LiquidGlass: {
            init: typeof init;
            initLiquidGlass: typeof initLiquidGlass;
            initLiquidGlassFilter: typeof initLiquidGlassFilter;
            destroyLiquidGlass: typeof destroyLiquidGlass;
            LiquidGlassSelect: typeof LiquidGlassSelect;
            initLiquidGlassSelects: typeof initAllSelects;
            generateDisplacementMap: typeof generateDisplacementMap;
            getCachedDisplacementMap: typeof getCachedDisplacementMap;
            clearDisplacementCache: typeof clearDisplacementCache;
            initMouseTracking: typeof initMouseTracking;
            initTiltEffect: typeof initTiltEffect;
            initElasticMouse: typeof initElasticMouse;
            initChromaticEffect: typeof initChromaticEffect;
            initMouseGlow: typeof initMouseGlow;
            initClickBounce: typeof initClickBounce;
            initScrollBlur: typeof initScrollBlur;
            initRippleEffect: typeof initRippleEffect;
            initEntranceAnimations: typeof initEntranceAnimations;
            initPageTransition: typeof initPageTransition;
            initBackgroundSwitcher: typeof initBackgroundSwitcher;
            initScrollingBackground: typeof initScrollingBackground;
            initHoverGrowth: typeof initHoverGrowth;
            initDynamicBorder: typeof initDynamicBorder;
        };
    }
}

export {};
