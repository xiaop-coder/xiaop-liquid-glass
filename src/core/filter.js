/**
 * SVG filter construction for liquid glass effects
 * @module core/filter
 */

/**
 * Build SVG refraction filter
 * @param {string} id - Filter ID
 * @param {string} mapDataUrl - Displacement map data URL
 * @param {number} scale - Displacement scale
 * @returns {SVGFilterElement} Filter element
 */
export function buildRefractionFilter(id, mapDataUrl, scale) {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-10%');
    filter.setAttribute('y', '-10%');
    filter.setAttribute('width', '120%');
    filter.setAttribute('height', '120%');
    filter.setAttribute('filterUnits', 'objectBoundingBox');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    feImage.setAttribute('width', '100%');
    feImage.setAttribute('height', '100%');
    feImage.setAttribute('result', 'DISPLACEMENT_MAP');
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapDataUrl);

    const feDisp = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    feDisp.setAttribute('in', 'SourceGraphic');
    feDisp.setAttribute('in2', 'DISPLACEMENT_MAP');
    feDisp.setAttribute('scale', String(scale));
    feDisp.setAttribute('xChannelSelector', 'R');
    feDisp.setAttribute('yChannelSelector', 'G');

    filter.appendChild(feImage);
    filter.appendChild(feDisp);
    return filter;
}

/**
 * Build chromatic aberration filter
 * @param {string} id - Filter ID
 * @param {string} mapDataUrl - Displacement map data URL
 * @param {number[]} scales - RGB channel scales [R, G, B]
 * @returns {SVGFilterElement} Filter element
 */
export function buildChromaFilter(id, mapDataUrl, scales) {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-35%');
    filter.setAttribute('y', '-35%');
    filter.setAttribute('width', '170%');
    filter.setAttribute('height', '170%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    feImage.setAttribute('width', '100%');
    feImage.setAttribute('height', '100%');
    feImage.setAttribute('result', 'DM');
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapDataUrl);

    // Edge intensity calculation
    const cm1 = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    cm1.setAttribute('in', 'DM');
    cm1.setAttribute('type', 'matrix');
    cm1.setAttribute('values', '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0');
    cm1.setAttribute('result', 'EI');

    // Edge mask
    const ct = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
    ct.setAttribute('in', 'EI');
    ct.setAttribute('result', 'EM');
    const fa = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
    fa.setAttribute('type', 'discrete');
    fa.setAttribute('tableValues', '0 0.1 1');
    ct.appendChild(fa);

    // Center offset
    const off = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    off.setAttribute('in', 'SourceGraphic');
    off.setAttribute('dx', '0');
    off.setAttribute('dy', '0');
    off.setAttribute('result', 'CO');

    // RGB channel separation
    function makeChannel(ch, sc) {
        const d = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        d.setAttribute('in', 'SourceGraphic');
        d.setAttribute('in2', 'DM');
        d.setAttribute('scale', String(sc));
        d.setAttribute('xChannelSelector', 'R');
        d.setAttribute('yChannelSelector', 'G');
        d.setAttribute('result', ch + 'D');

        const m = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        m.setAttribute('in', ch + 'D');
        m.setAttribute('type', 'matrix');
        if (ch === 'R') m.setAttribute('values', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0');
        else if (ch === 'G') m.setAttribute('values', '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0');
        else m.setAttribute('values', '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0');
        m.setAttribute('result', ch + 'C');
        return [d, m];
    }

    const rNodes = makeChannel('R', scales[0]);
    const gNodes = makeChannel('G', scales[1]);
    const bNodes = makeChannel('B', scales[2]);

    // Blend channels
    const bl1 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    bl1.setAttribute('in', 'GC');
    bl1.setAttribute('in2', 'BC');
    bl1.setAttribute('mode', 'screen');
    bl1.setAttribute('result', 'GB');

    const bl2 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    bl2.setAttribute('in', 'RC');
    bl2.setAttribute('in2', 'GB');
    bl2.setAttribute('mode', 'screen');
    bl2.setAttribute('result', 'RGB');

    // Blur aberration
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('in', 'RGB');
    blur.setAttribute('stdDeviation', '0.4');
    blur.setAttribute('result', 'AB');

    // Apply edge mask
    const ce = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    ce.setAttribute('in', 'AB');
    ce.setAttribute('in2', 'EM');
    ce.setAttribute('operator', 'in');
    ce.setAttribute('result', 'EA');

    // Invert mask
    const ci = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
    ci.setAttribute('in', 'EM');
    ci.setAttribute('result', 'IM');
    const fai = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
    fai.setAttribute('type', 'table');
    fai.setAttribute('tableValues', '1 0');
    ci.appendChild(fai);

    // Center composite
    const cc = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    cc.setAttribute('in', 'CO');
    cc.setAttribute('in2', 'IM');
    cc.setAttribute('operator', 'in');
    cc.setAttribute('result', 'CC');

    // Final composite
    const cf = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    cf.setAttribute('in', 'EA');
    cf.setAttribute('in2', 'CC');
    cf.setAttribute('operator', 'over');

    // Append all nodes
    const children = [
        feImage, cm1, ct, off,
        ...rNodes, ...gNodes, ...bNodes,
        bl1, bl2, blur, ce, ci, cc, cf
    ];
    children.forEach(child => filter.appendChild(child));

    return filter;
}

/**
 * Initialize SVG filter container
 * @returns {SVGSVGElement} SVG element with defs
 */
export function createFilterContainer() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'display:none');
    svg.id = 'liquid-glass-svg-filters';
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);
    return svg;
}
