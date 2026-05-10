/**
 * Mouse interaction effects
 * @module effects/mouse
 */

import { rafThrottle } from '../utils/helpers.js';

/**
 * Initialize mouse light tracking effect
 */
export function initMouseTracking() {
    const handleMouseMove = rafThrottle((e) => {
        const elements = document.querySelectorAll('.glass-light-track');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    document.addEventListener('mousemove', handleMouseMove);
}

/**
 * Initialize 3D tilt effect
 */
export function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.glass-tilt');

    tiltElements.forEach(el => {
        const maxTilt = 12;
        const perspective = 600;

        const handleTilt = rafThrottle((cx, cy) => {
            const rect = el.getBoundingClientRect();
            const x = cx - rect.left;
            const y = cy - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            const rotateX = -((y - centerY) / centerY) * maxTilt;
            el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mousemove', (e) => handleTilt(e.clientX, e.clientY));
        el.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handleTilt(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        const resetTilt = () => {
            el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
        };

        el.addEventListener('mouseleave', resetTilt);
        el.addEventListener('touchend', resetTilt);
    });
}

/**
 * Initialize elastic mouse following effect
 */
export function initElasticMouse() {
    const elasticElements = document.querySelectorAll('.glass-elastic');

    elasticElements.forEach(el => {
        const elasticity = parseFloat(el.getAttribute('data-elasticity')) || 0.15;
        const activationZone = parseFloat(el.getAttribute('data-activation-zone')) || 200;
        const containerId = el.getAttribute('data-mouse-container');
        const container = containerId ?
            (document.getElementById(containerId) || document.querySelector(containerId)) :
            el;

        const handleMouse = rafThrottle((clientX, clientY) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            // Calculate edge distance
            const edgeDistX = Math.max(0, Math.abs(deltaX) - rect.width / 2);
            const edgeDistY = Math.max(0, Math.abs(deltaY) - rect.height / 2);
            const edgeDistance = Math.sqrt(edgeDistX * edgeDistX + edgeDistY * edgeDistY);

            if (edgeDistance > activationZone) {
                el.style.transform = '';
                return;
            }

            const fadeInFactor = 1 - edgeDistance / activationZone;
            const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (centerDistance === 0) {
                el.style.transform = '';
                return;
            }

            const normalizedX = deltaX / centerDistance;
            const normalizedY = deltaY / centerDistance;
            const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

            // Directional scaling
            const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
            const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;

            const translateX = deltaX * elasticity * 0.1 * fadeInFactor;
            const translateY = deltaY * elasticity * 0.1 * fadeInFactor;

            el.style.transform = `translate(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px) scaleX(${Math.max(0.8, scaleX).toFixed(4)}) scaleY(${Math.max(0.8, scaleY).toFixed(4)})`;
        });

        container.addEventListener('mousemove', (e) => handleMouse(e.clientX, e.clientY));
        container.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handleMouse(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        el.addEventListener('mouseleave', () => el.style.transform = '');
        el.addEventListener('touchend', () => el.style.transform = '');
    });
}

/**
 * Initialize chromatic aberration effect
 */
export function initChromaticEffect() {
    const chromaticElements = document.querySelectorAll('.glass-chromatic');

    chromaticElements.forEach(el => {
        const handleChroma = rafThrottle((cx, cy) => {
            const rect = el.getBoundingClientRect();
            const x = ((cx - rect.left) / rect.width * 100).toFixed(1);
            const y = ((cy - rect.top) / rect.height * 100).toFixed(1);
            el.style.setProperty('--chroma-x', `${x}%`);
            el.style.setProperty('--chroma-y', `${y}%`);
        });

        el.addEventListener('mousemove', (e) => handleChroma(e.clientX, e.clientY));
        el.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handleChroma(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
    });
}

/**
 * Initialize mouse glow effect
 */
export function initMouseGlow() {
    const glowElements = document.querySelectorAll('.glass-mouse-glow');

    glowElements.forEach(el => {
        const handleGlow = rafThrottle((cx, cy) => {
            const rect = el.getBoundingClientRect();
            const x = cx - rect.left;
            const y = cy - rect.top;
            el.style.setProperty('--glow-x', `${x}px`);
            el.style.setProperty('--glow-y', `${y}px`);
        });

        el.addEventListener('mousemove', (e) => handleGlow(e.clientX, e.clientY));
        el.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handleGlow(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
    });
}

/**
 * Initialize click bounce effect
 */
export function initClickBounce() {
    document.addEventListener('mousedown', (e) => {
        const target = e.target.closest('.glass-click-bounce');
        if (target) target.style.transform = 'scale(0.95)';
    });

    document.addEventListener('mouseup', () => {
        document.querySelectorAll('.glass-click-bounce').forEach(el => {
            el.style.transform = '';
        });
    });
}

/**
 * Initialize dynamic border glow effect
 */
export function initDynamicBorder() {
    const elements = document.querySelectorAll('.liquid-glass, .liquid-glass-btn, .liquid-glass-pill, .liquid-glass-nav');

    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const distanceX = Math.min(Math.abs(e.clientX - rect.left), Math.abs(e.clientX - rect.right)) / rect.width;
            const distanceY = Math.min(Math.abs(e.clientY - rect.top), Math.abs(e.clientY - rect.bottom)) / rect.height;
            const proximity = Math.exp(-Math.max(distanceX, distanceY) * 3);
            el.style.setProperty('--border-glow', proximity.toFixed(3));
        });

        el.addEventListener('mouseleave', () => {
            el.style.setProperty('--border-glow', '0');
        });
    });
}
