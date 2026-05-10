/**
 * Animation effects
 * @module effects/animations
 */

import { rafThrottle, debounce } from '../utils/helpers.js';

/**
 * Initialize scroll blur effect for navigation
 */
export function initScrollBlur() {
    const handleScroll = rafThrottle(() => {
        const navContainers = document.querySelectorAll('.nav-container');
        navContainers.forEach(nav => {
            const blur = Math.min(20 + window.scrollY * 0.02, 30);
            nav.style.setProperty('--nav-blur', `${blur}px`);
        });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Initialize ripple effect on buttons
 */
export function initRippleEffect() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.btn, .hero-btn, .nav-btn, button[class*="btn"], .liquid-glass-btn, .liquid-glass-pill');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const ripple = document.createElement('span');
        ripple.className = 'glass-ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size / 2}px`;
        ripple.style.top = `${y - size / 2}px`;

        if (!target.classList.contains('glass-ripple-container')) {
            target.classList.add('glass-ripple-container');
        }

        target.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
}

/**
 * Initialize entrance animations with IntersectionObserver
 */
export function initEntranceAnimations() {
    const elements = document.querySelectorAll('.glass-entrance');
    if (elements.length === 0) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('glass-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(el => el.classList.add('glass-visible'));
    }
}

/**
 * Initialize page transition effect
 */
export function initPageTransition() {
    const mainContent = document.querySelector('.container, .page-content, main, .login-card, .register-card, .register-container');
    if (mainContent) {
        mainContent.classList.add('glass-page-transition');
    }
}

/**
 * Initialize scrolling background effect
 */
export function initScrollingBackground() {
    const elements = document.querySelectorAll('.glass-scrolling-bg');
    elements.forEach(el => {
        el.style.backgroundSize = 'cover';
    });
}

/**
 * Initialize background switcher
 */
export function initBackgroundSwitcher() {
    const container = document.querySelector('.glass-bg-switcher');
    if (!container) return;

    const btn = container.querySelector('.glass-bg-switcher-btn');
    const panel = document.querySelector('.glass-bg-panel');
    const urlInput = document.querySelector('.glass-bg-url-input');
    const applyBtn = document.querySelector('.glass-bg-apply-btn');
    const uploadArea = document.querySelector('.glass-bg-upload-area');
    const fileInput = document.querySelector('.glass-bg-file-input');
    const presetsContainer = document.querySelector('.glass-bg-presets');
    const resetBtn = document.querySelector('.glass-bg-reset');

    if (!btn || !panel) return;

    const pageKey = `lg-bg-${window.location.pathname}`;

    // Create or get background layer
    let bgLayer = document.querySelector('.lg-custom-bg');
    if (!bgLayer) {
        bgLayer = document.createElement('div');
        bgLayer.className = 'lg-custom-bg';
        bgLayer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none;transition:opacity 0.5s ease;opacity:0;';
        document.body.insertBefore(bgLayer, document.body.firstChild);
    }

    // Toggle panel
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && !panel.contains(e.target)) {
            panel.classList.remove('show');
        }
    });

    // Apply background
    function applyBackground(url) {
        bgLayer.style.backgroundImage = `url(${url})`;
        bgLayer.style.opacity = '1';
        try {
            localStorage.setItem(pageKey, url);
        } catch (e) {
            console.warn('Failed to save background to localStorage:', e);
        }
    }

    // Reset background
    function resetBackground() {
        bgLayer.style.opacity = '0';
        setTimeout(() => {
            bgLayer.style.backgroundImage = '';
        }, 500);
        try {
            localStorage.removeItem(pageKey);
        } catch (e) {
            console.warn('Failed to remove background from localStorage:', e);
        }
    }

    // URL input
    if (applyBtn && urlInput) {
        applyBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (url) applyBackground(url);
        });

        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const url = urlInput.value.trim();
                if (url) applyBackground(url);
            }
        });
    }

    // File upload
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (ev) => applyBackground(ev.target.result);
                reader.readAsDataURL(file);
            }
        });

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (ev) => applyBackground(ev.target.result);
                reader.readAsDataURL(file);
            }
        });
    }

    // Presets
    if (presetsContainer) {
        const presets = presetsContainer.querySelectorAll('.glass-bg-preset');
        presets.forEach(preset => {
            preset.addEventListener('click', () => {
                const url = preset.getAttribute('data-url') ||
                    preset.style.backgroundImage.slice(4, -1).replace(/['"]/g, '');
                if (url) {
                    applyBackground(url);
                    presets.forEach(p => p.classList.remove('active'));
                    preset.classList.add('active');
                }
            });
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', resetBackground);
    }

    // Load saved background
    try {
        const savedBg = localStorage.getItem(pageKey);
        if (savedBg) applyBackground(savedBg);
    } catch (e) {
        console.warn('Failed to load background from localStorage:', e);
    }
}

/**
 * Initialize hover growth effect
 */
export function initHoverGrowth() {
    const style = document.createElement('style');
    style.textContent = `
        .liquid-glass-nav:hover { padding: 8px 14px; }
        .liquid-glass-btn:hover { padding: 10px 22px; }
        .liquid-glass-pill:hover { padding: 6px 16px; }
    `;
    document.head.appendChild(style);
}
