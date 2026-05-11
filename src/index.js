/**
 * XiaoP Liquid Glass v3.0
 * 主入口文件
 */

import { LiquidGlass, initAll } from './core/liquid-glass.js';
import { Shader } from './core/shader.js';
import { Filter } from './core/filter.js';
import { MouseEffects } from './effects/mouse.js';
import { Animations, initAnimations } from './effects/animations.js';

const LiquidGlassLib = {
  LiquidGlass,
  Shader,
  Filter,
  MouseEffects,
  Animations,
  
  init(options = {}) {
    const instances = initAll(options);
    
    if (options.effects !== false) {
      instances.forEach((instance) => {
        new MouseEffects(instance.element, options.mouseEffects || {});
      });
    }

    if (options.animations !== false) {
      initAnimations('.liquid-glass-animate', options.animationOptions || {});
    }

    return instances;
  },

  version: '3.0.0',
};

if (typeof window !== 'undefined') {
  window.LiquidGlass = LiquidGlassLib;
}

export default LiquidGlassLib;
export { LiquidGlass, Shader, Filter, MouseEffects, Animations, initAll, initAnimations };
