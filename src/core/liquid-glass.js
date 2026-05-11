/**
 * LiquidGlass - 4层液态玻璃核心类
 */

import { Shader } from './shader.js';
import { Filter } from './filter.js';

export class LiquidGlass {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      mode: options.mode || 'standard',
      scale: options.scale || 20,
      radius: options.radius || 16,
      blur: options.blur || 40,
      customSDF: options.customSDF || null,
      enableEffects: options.enableEffects !== false,
      ...options,
    };

    this.shader = new Shader();
    this.filter = new Filter();
    this.layers = {};
    this.initialized = false;

    this.init();
  }

  init() {
    if (this.initialized) return;
    this.element.classList.add('liquid-glass-container');
    this.createLayers();
    this.applyDisplacementMap();
    this.applyStyles();
    this.initialized = true;
  }

  createLayers() {
    const layerNames = ['outer', 'cover', 'sharp', 'reflect'];
    layerNames.forEach((name) => {
      let layer = this.element.querySelector(`.liquid-glass-${name}`);
      if (!layer) {
        layer = document.createElement('div');
        layer.className = `liquid-glass-${name}`;
        this.element.appendChild(layer);
      }
      this.layers[name] = layer;
    });

    let content = this.element.querySelector('.liquid-glass-content');
    if (!content) {
      content = document.createElement('div');
      content.className = 'liquid-glass-content';
      const children = Array.from(this.element.childNodes).filter(
        (node) => !node.classList || !node.classList.contains('liquid-glass-')
      );
      children.forEach((child) => content.appendChild(child));
      this.element.appendChild(content);
    }
    this.layers.content = content;
  }

  applyDisplacementMap() {
    if (this.options.mode === 'frosted') return;

    const rect = this.element.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 200;

    const displacementMapURL = this.shader.generateDisplacementMap(
      width, height, this.options.radius, this.options.mode, this.options.scale, this.options.customSDF
    );

    const filterURL = this.filter.createSVGFilter(displacementMapURL, this.options.scale);
    this.layers.outer.style.filter = filterURL;
  }

  applyStyles() {
    this.element.style.setProperty('--lg-blur', `${this.options.blur}px`);
    this.element.style.setProperty('--lg-radius', `${this.options.radius}px`);
    const modeClass = `liquid-glass-mode-${this.options.mode}`;
    this.element.classList.add(modeClass);
  }

  update(options = {}) {
    this.options = { ...this.options, ...options };
    this.applyDisplacementMap();
    this.applyStyles();
  }

  destroy() {
    this.filter.removeFilter();
    this.shader.clearCache();
    Object.values(this.layers).forEach((layer) => {
      if (layer && layer.parentNode) layer.remove();
    });
    this.element.classList.remove('liquid-glass-container');
    this.initialized = false;
  }
}

export function initAll(options = {}) {
  const elements = document.querySelectorAll('.liquid-glass');
  const instances = [];

  elements.forEach((element) => {
    const mode = element.dataset.mode || options.mode || 'standard';
    const scale = parseFloat(element.dataset.scale) || options.scale || 20;
    const radius = parseFloat(element.dataset.radius) || options.radius || 16;
    const blur = parseFloat(element.dataset.blur) || options.blur || 40;

    const instance = new LiquidGlass(element, { mode, scale, radius, blur, ...options });
    instances.push(instance);
  });

  return instances;
}

export default LiquidGlass;
