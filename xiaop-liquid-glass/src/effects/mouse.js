/**
 * Mouse Effects - 鼠标交互效果
 */

export class MouseEffects {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      elasticFollow: options.elasticFollow !== false,
      tilt3D: options.tilt3D !== false,
      glow: options.glow !== false,
      magnetic: options.magnetic || false,
      ripple: options.ripple || false,
      ...options,
    };

    this.mouseX = 0;
    this.mouseY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.animationId = null;

    this.init();
  }

  init() {
    this.updateCenter();
    this.bindEvents();
    if (this.options.elasticFollow || this.options.tilt3D) {
      this.startAnimation();
    }
  }

  updateCenter() {
    const rect = this.element.getBoundingClientRect();
    this.centerX = rect.left + rect.width / 2;
    this.centerY = rect.top + rect.height / 2;
  }

  bindEvents() {
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseEnter = this.onMouseEnter.bind(this);
    this.handleMouseLeave = this.onMouseLeave.bind(this);
    this.handleClick = this.onClick.bind(this);

    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
    
    if (this.options.ripple) {
      this.element.addEventListener('click', this.handleClick);
    }

    window.addEventListener('resize', () => this.updateCenter());
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.options.glow) {
      this.updateGlow(e);
    }
  }

  onMouseEnter() {
    this.element.classList.add('liquid-glass-hover');
  }

  onMouseLeave() {
    this.element.classList.remove('liquid-glass-hover');
    if (this.options.tilt3D) {
      this.element.style.transform = '';
    }
  }

  onClick(e) {
    if (!this.options.ripple) return;
    
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('div');
    ripple.className = 'liquid-glass-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  updateGlow(e) {
    const rect = this.element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.element.style.setProperty('--mouse-x', `${x}%`);
    this.element.style.setProperty('--mouse-y', `${y}%`);
  }

  startAnimation() {
    const animate = () => {
      const dx = this.mouseX - this.centerX;
      const dy = this.mouseY - this.centerY;

      if (this.options.elasticFollow) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        const scale = Math.min(distance / maxDistance, 1) * 0.05 + 1;
        const angle = Math.atan2(dy, dx);
        const scaleX = 1 + (scale - 1) * Math.abs(Math.cos(angle));
        const scaleY = 1 + (scale - 1) * Math.abs(Math.sin(angle));
        
        this.element.style.setProperty('--scale-x', scaleX);
        this.element.style.setProperty('--scale-y', scaleY);
      }

      if (this.options.tilt3D) {
        const maxTilt = 10;
        const tiltX = (dy / window.innerHeight) * maxTilt;
        const tiltY = -(dx / window.innerWidth) * maxTilt;
        
        this.element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    this.element.removeEventListener('click', this.handleClick);
  }
}

export default MouseEffects;
