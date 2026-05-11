/**
 * Animations - 动画效果系统
 */

export class Animations {
  constructor() {
    this.observers = new Map();
  }

  initIntersectionObserver(elements, options = {}) {
    const observerOptions = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('liquid-glass-visible');
          if (options.once) {
            observer.unobserve(entry.target);
          }
        } else if (!options.once) {
          entry.target.classList.remove('liquid-glass-visible');
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));
    this.observers.set('intersection', observer);

    return observer;
  }

  addScrollParallax(element, speed = 0.5) {
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }

  addBreathingGlow(element, duration = 3000) {
    element.style.animation = `liquid-glass-breathe ${duration}ms ease-in-out infinite`;
  }

  addRotatingHighlight(element, duration = 5000) {
    element.style.setProperty('--rotate-duration', `${duration}ms`);
    element.classList.add('liquid-glass-rotating-highlight');
  }

  addElasticScale(element, options = {}) {
    const scale = options.scale || 1.05;
    const duration = options.duration || 300;

    element.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    
    element.addEventListener('mouseenter', () => {
      element.style.transform = `scale(${scale})`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  }

  addPageTransition(fromElement, toElement, type = 'fade') {
    return new Promise((resolve) => {
      fromElement.classList.add(`liquid-glass-transition-out-${type}`);
      
      setTimeout(() => {
        fromElement.style.display = 'none';
        toElement.style.display = 'block';
        toElement.classList.add(`liquid-glass-transition-in-${type}`);
        
        setTimeout(() => {
          toElement.classList.remove(`liquid-glass-transition-in-${type}`);
          resolve();
        }, 300);
      }, 300);
    });
  }

  addChromaticAberration(element, offset = 2) {
    element.classList.add('liquid-glass-chromatic');
    element.style.setProperty('--chromatic-offset', `${offset}px`);
  }

  addGradientMaskBlur(element, angle = 45) {
    element.classList.add('liquid-glass-gradient-mask');
    element.style.setProperty('--mask-angle', `${angle}deg`);
  }

  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

export function initAnimations(selector = '.liquid-glass-animate', options = {}) {
  const animations = new Animations();
  const elements = document.querySelectorAll(selector);
  
  if (elements.length > 0) {
    animations.initIntersectionObserver(elements, {
      threshold: 0.1,
      once: true,
      ...options,
    });
  }

  return animations;
}

export default Animations;
