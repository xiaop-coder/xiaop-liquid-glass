/**
 * Shader - SDF 位移贴图生成核心
 * 基于 shuding/liquid-glass 的 Canvas SDF 算法
 */

export class Shader {
  constructor(options = {}) {
    this.cache = new Map();
    this.maxCacheSize = options.maxCacheSize || 50;
  }

  smoothStep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  length(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  roundedRectSDF(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return (
      Math.min(Math.max(qx, qy), 0) +
      this.length(Math.max(qx, 0), Math.max(qy, 0)) -
      radius
    );
  }

  polarCircleSDF(x, y, radius) {
    return this.length(x, y) - radius;
  }

  diamondSDF(x, y, size) {
    const dx = Math.abs(x);
    const dy = Math.abs(y);
    return (dx + dy - size) / Math.sqrt(2);
  }

  hexagonSDF(x, y, radius) {
    const k = [-0.866025404, 0.5, 0.577350269];
    const px = Math.abs(x);
    const py = Math.abs(y);
    const dot1 = k[0] * px + k[1] * py;
    const qx = px - 2 * Math.min(0, dot1) * k[0];
    const qy = py - 2 * Math.min(0, dot1) * k[1];
    const d = this.length(
      qx - Math.max(-k[2] * radius, Math.min(k[2] * radius, qx)),
      qy - radius
    );
    return d * Math.sign(qy - radius);
  }

  waveSDF(x, y, width, height, radius, frequency = 3, amplitude = 5) {
    const wave = Math.sin((x / width) * Math.PI * frequency) * amplitude;
    return this.roundedRectSDF(x, y + wave, width, height, radius);
  }

  generateDisplacementMap(width, height, radius, mode = 'standard', scale = 20, customSDF = null) {
    const cacheKey = `${width}-${height}-${radius}-${mode}-${scale}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const canvas = document.createElement('canvas');
    const padding = Math.ceil(scale * 2);
    canvas.width = width + padding * 2;
    canvas.height = height + padding * 2;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const w = width / 2;
    const h = height / 2;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const px = x - centerX;
        const py = y - centerY;

        let distance;
        switch (mode) {
          case 'polar':
            distance = this.polarCircleSDF(px, py, Math.min(w, h));
            break;
          case 'diamond':
            distance = this.diamondSDF(px, py, Math.min(w, h));
            break;
          case 'hexagon':
            distance = this.hexagonSDF(px, py, Math.min(w, h));
            break;
          case 'wave':
            distance = this.waveSDF(px, py, w, h, radius);
            break;
          case 'prominent':
            distance = this.roundedRectSDF(px, py, w, h, radius) * 1.5;
            break;
          case 'frosted':
            distance = 0;
            break;
          case 'custom':
            distance = customSDF ? customSDF(px, py, w, h, radius) : 0;
            break;
          default:
            distance = this.roundedRectSDF(px, py, w, h, radius);
        }

        const edgeDistance = Math.abs(distance);
        const displacement = this.smoothStep(scale, 0, edgeDistance);

        const idx = (y * canvas.width + x) * 4;
        const value = Math.floor(displacement * 255);
        data[idx] = value;
        data[idx + 1] = value;
        data[idx + 2] = value;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL();

    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, dataURL);

    return dataURL;
  }

  clearCache() {
    this.cache.clear();
  }
}

export default Shader;
