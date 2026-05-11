/**
 * Filter - SVG 滤镜构建器
 */

export class Filter {
  constructor() {
    this.filterId = 'liquid-glass-filter';
    this.filterElement = null;
  }

  createSVGFilter(displacementMapURL, scale = 20) {
    let svg = document.getElementById('liquid-glass-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'liquid-glass-svg';
      svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';
      document.body.appendChild(svg);
    }

    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
    }

    let filter = defs.querySelector(`#${this.filterId}`);
    if (filter) {
      filter.remove();
    }

    filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = this.filterId;
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    feImage.setAttribute('href', displacementMapURL);
    feImage.setAttribute('result', 'displacementMap');

    const feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    feDisplacementMap.setAttribute('in', 'SourceGraphic');
    feDisplacementMap.setAttribute('in2', 'displacementMap');
    feDisplacementMap.setAttribute('scale', scale);
    feDisplacementMap.setAttribute('xChannelSelector', 'R');
    feDisplacementMap.setAttribute('yChannelSelector', 'G');

    filter.appendChild(feImage);
    filter.appendChild(feDisplacementMap);
    defs.appendChild(filter);

    this.filterElement = filter;
    return `url(#${this.filterId})`;
  }

  createChromaticFilter(offset = 2) {
    const filterId = 'chromatic-aberration-filter';
    let svg = document.getElementById('liquid-glass-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'liquid-glass-svg';
      svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';
      document.body.appendChild(svg);
    }

    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
    }

    let filter = defs.querySelector(`#${filterId}`);
    if (filter) {
      filter.remove();
    }

    filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = filterId;

    const feOffset1 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset1.setAttribute('in', 'SourceGraphic');
    feOffset1.setAttribute('dx', -offset);
    feOffset1.setAttribute('result', 'red');

    const feOffset2 = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset2.setAttribute('in', 'SourceGraphic');
    feOffset2.setAttribute('dx', offset);
    feOffset2.setAttribute('result', 'blue');

    const feColorMatrix1 = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix1.setAttribute('in', 'red');
    feColorMatrix1.setAttribute('type', 'matrix');
    feColorMatrix1.setAttribute('values', '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0');
    feColorMatrix1.setAttribute('result', 'redChannel');

    const feColorMatrix2 = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix2.setAttribute('in', 'blue');
    feColorMatrix2.setAttribute('type', 'matrix');
    feColorMatrix2.setAttribute('values', '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0');
    feColorMatrix2.setAttribute('result', 'blueChannel');

    const feBlend1 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    feBlend1.setAttribute('in', 'redChannel');
    feBlend1.setAttribute('in2', 'SourceGraphic');
    feBlend1.setAttribute('mode', 'screen');
    feBlend1.setAttribute('result', 'temp');

    const feBlend2 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    feBlend2.setAttribute('in', 'blueChannel');
    feBlend2.setAttribute('in2', 'temp');
    feBlend2.setAttribute('mode', 'screen');

    filter.appendChild(feOffset1);
    filter.appendChild(feOffset2);
    filter.appendChild(feColorMatrix1);
    filter.appendChild(feColorMatrix2);
    filter.appendChild(feBlend1);
    filter.appendChild(feBlend2);
    defs.appendChild(filter);

    return `url(#${filterId})`;
  }

  removeFilter() {
    if (this.filterElement) {
      this.filterElement.remove();
      this.filterElement = null;
    }
  }
}

export default Filter;
