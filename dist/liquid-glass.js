(function() {
    'use strict';

    function smoothStep(a, b, t) {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return t * t * (3 - 2 * t);
    }

    function length(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    function roundedRectSDF(x, y, width, height, radius) {
        var qx = Math.abs(x) - width + radius;
        var qy = Math.abs(y) - height + radius;
        return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    }

    function generateDisplacementMap(width, height, fragmentFn) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        var data = new Uint8ClampedArray(width * height * 4);
        var maxScale = 0;
        var rawValues = [];

        for (var i = 0; i < data.length; i += 4) {
            var x = (i / 4) % width;
            var y = Math.floor((i / 4) / width);
            var uv = { x: x / width, y: y / height };
            var pos = fragmentFn(uv);
            var dx = pos.x * width - x;
            var dy = pos.y * height - y;
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
            rawValues.push(dx, dy);
        }

        maxScale *= 0.5;
        if (maxScale < 1) maxScale = 1;

        var idx = 0;
        for (var j = 0; j < data.length; j += 4) {
            var r = rawValues[idx++] / maxScale + 0.5;
            var g = rawValues[idx++] / maxScale + 0.5;
            data[j] = r * 255;
            data[j + 1] = g * 255;
            data[j + 2] = 128;
            data[j + 3] = 255;
        }

        ctx.putImageData(new ImageData(data, width, height), 0, 0);
        return canvas.toDataURL();
    }

    var liquidGlassFragment = function(uv) {
        var ix = uv.x - 0.5;
        var iy = uv.y - 0.5;
        var distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
        var displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
        var scaled = smoothStep(0, 1, displacement);
        return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
    };

    function LiquidGlassSelect(selectEl) {
        this.select = selectEl;
        this.options = [];
        this.selectedIndex = 0;
        this.isOpen = false;
        this.onChange = null;
        this.parentSection = null;
        this.init();
    }

    LiquidGlassSelect.prototype.init = function() {
        var self = this;
        var select = this.select;
        this.onChange = select.getAttribute('onchange');
        var options = select.querySelectorAll('option');
        for (var i = 0; i < options.length; i++) {
            this.options.push({ value: options[i].value, text: options[i].textContent.trim(), selected: options[i].selected });
            if (options[i].selected) this.selectedIndex = i;
        }
        var wrapper = document.createElement('div');
        wrapper.className = 'liquid-glass-dropdown';
        if (select.classList.contains('select-sm')) wrapper.classList.add('small');
        if (select.classList.contains('select-lg')) wrapper.classList.add('large');
        var header = document.createElement('div');
        header.className = 'dropdown-header';
        var selectedText = document.createElement('span');
        selectedText.className = 'selected-text';
        selectedText.textContent = this.options.length > 0 ? this.options[this.selectedIndex].text : '';
        var arrow = document.createElement('i');
        arrow.className = 'arrow';
        header.appendChild(selectedText);
        header.appendChild(arrow);
        var list = document.createElement('div');
        list.className = 'dropdown-list';
        for (var j = 0; j < this.options.length; j++) {
            var item = document.createElement('div');
            item.className = 'dropdown-item';
            if (j === this.selectedIndex) item.classList.add('active');
            item.setAttribute('data-value', this.options[j].value);
            item.setAttribute('data-index', j);
            item.textContent = this.options[j].text;
            item.addEventListener('click', (function(idx) {
                return function(e) {
                    e.stopPropagation();
                    self.selectOption(idx);
                };
            })(j));
            list.appendChild(item);
        }
        wrapper.appendChild(header);
        wrapper.appendChild(list);
        select.style.display = 'none';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        this.wrapper = wrapper;
        this.header = header;
        this.selectedText = selectedText;
        this.list = list;
        this.parentSection = wrapper.closest('.settings-section');
        header.addEventListener('click', function(e) { e.stopPropagation(); self.toggle(); });
        list.addEventListener('click', function(e) { e.stopPropagation(); });
        document.addEventListener('click', function(e) { if (!wrapper.contains(e.target)) self.close(); });
    };

    LiquidGlassSelect.prototype.toggle = function() { this.isOpen ? this.close() : this.open(); };
    LiquidGlassSelect.prototype.open = function() {
        this.closeAll();
        this.wrapper.classList.add('open');
        this.isOpen = true;
        this.list.classList.add('show');
        if (this.parentSection) this.parentSection.classList.add('dropdown-open');
    };
    LiquidGlassSelect.prototype.close = function() {
        this.wrapper.classList.remove('open');
        this.isOpen = false;
        this.list.classList.remove('show');
        if (this.parentSection) this.parentSection.classList.remove('dropdown-open');
    };
    LiquidGlassSelect.prototype.closeAll = function() {
        var all = document.querySelectorAll('.liquid-glass-dropdown.open');
        for (var i = 0; i < all.length; i++) all[i].classList.remove('open');
        var lists = document.querySelectorAll('.dropdown-list.show');
        for (var j = 0; j < lists.length; j++) lists[j].classList.remove('show');
        var sections = document.querySelectorAll('.settings-section.dropdown-open');
        for (var k = 0; k < sections.length; k++) sections[k].classList.remove('dropdown-open');
    };
    LiquidGlassSelect.prototype.selectOption = function(index) {
        this.selectedIndex = index;
        var option = this.options[index];
        this.selectedText.textContent = option.text;
        var items = this.list.querySelectorAll('.dropdown-item');
        for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
        items[index].classList.add('active');
        this.select.value = option.value;
        var event = new Event('change', { bubbles: true });
        this.select.dispatchEvent(event);
        if (this.onChange) { var fn = new Function('event', this.onChange); fn.call(this.select, event); }
        this.close();
    };

    function initAllSelects() {
        var selects = document.querySelectorAll('select:not(.no-liquid-glass):not([data-lg-converted])');
        for (var i = 0; i < selects.length; i++) {
            var select = selects[i];
            if (select.closest('.liquid-glass-dropdown')) continue;
            select.setAttribute('data-lg-converted', 'true');
            new LiquidGlassSelect(select);
        }
    }

    function initMouseTracking() {
        document.addEventListener('mousemove', function(e) {
            var elements = document.querySelectorAll('.glass-light-track');
            for (var i = 0; i < elements.length; i++) {
                var rect = elements[i].getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                elements[i].style.setProperty('--mouse-x', x + 'px');
                elements[i].style.setProperty('--mouse-y', y + 'px');
            }
        });
    }

    function initScrollBlur() {
        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var navContainers = document.querySelectorAll('.nav-container');
                    for (var i = 0; i < navContainers.length; i++) {
                        var blur = Math.min(20 + window.scrollY * 0.02, 30);
                        navContainers[i].style.setProperty('--nav-blur', blur + 'px');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function initRippleEffect() {
        document.addEventListener('click', function(e) {
            var target = e.target.closest('.btn, .hero-btn, .nav-btn, button[class*="btn"], .liquid-glass-btn, .liquid-glass-pill');
            if (!target) return;
            var rect = target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var size = Math.max(rect.width, rect.height) * 2;
            var ripple = document.createElement('span');
            ripple.className = 'glass-ripple';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (x - size / 2) + 'px';
            ripple.style.top = (y - size / 2) + 'px';
            if (!target.classList.contains('glass-ripple-container')) target.classList.add('glass-ripple-container');
            target.appendChild(ripple);
            ripple.addEventListener('animationend', function() { ripple.remove(); });
        });
    }

    function initEntranceAnimations() {
        var elements = document.querySelectorAll('.glass-entrance');
        if (elements.length === 0) return;
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.classList.add('glass-visible');
                        observer.unobserve(entries[i].target);
                    }
                }
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            for (var j = 0; j < elements.length; j++) observer.observe(elements[j]);
        } else {
            for (var k = 0; k < elements.length; k++) elements[k].classList.add('glass-visible');
        }
    }

    function initPageTransition() {
        var mainContent = document.querySelector('.container, .page-content, main, .login-card, .register-card, .register-container');
        if (mainContent) mainContent.classList.add('glass-page-transition');
    }

    function initTiltEffect() {
        var tiltElements = document.querySelectorAll('.glass-tilt');
        for (var i = 0; i < tiltElements.length; i++) {
            (function(el) {
                var maxTilt = 12;
                var perspective = 600;
                el.addEventListener('mousemove', function(e) {
                    var rect = el.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    var centerX = rect.width / 2;
                    var centerY = rect.height / 2;
                    var rotateY = ((x - centerX) / centerX) * maxTilt;
                    var rotateX = -((y - centerY) / centerY) * maxTilt;
                    el.style.transform = 'perspective(' + perspective + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
                });
                el.addEventListener('mouseleave', function() {
                    el.style.transform = 'perspective(' + perspective + 'px) rotateX(0deg) rotateY(0deg) scale(1)';
                });
            })(tiltElements[i]);
        }
    }

    function initElasticMouse() {
        var elasticElements = document.querySelectorAll('.glass-elastic');
        for (var i = 0; i < elasticElements.length; i++) {
            (function(el) {
                var elasticity = parseFloat(el.getAttribute('data-elasticity')) || 0.15;
                var activationZone = parseFloat(el.getAttribute('data-activation-zone')) || 200;

                el.addEventListener('mousemove', function(e) {
                    var rect = el.getBoundingClientRect();
                    var centerX = rect.left + rect.width / 2;
                    var centerY = rect.top + rect.height / 2;
                    var deltaX = e.clientX - centerX;
                    var deltaY = e.clientY - centerY;
                    var edgeDistX = Math.max(0, Math.abs(deltaX) - rect.width / 2);
                    var edgeDistY = Math.max(0, Math.abs(deltaY) - rect.height / 2);
                    var edgeDistance = Math.sqrt(edgeDistX * edgeDistX + edgeDistY * edgeDistY);

                    if (edgeDistance > activationZone) {
                        el.style.transform = '';
                        return;
                    }

                    var fadeInFactor = 1 - edgeDistance / activationZone;
                    var centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    if (centerDistance === 0) { el.style.transform = ''; return; }

                    var normalizedX = deltaX / centerDistance;
                    var normalizedY = deltaY / centerDistance;
                    var stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor;

                    var scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
                    var scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;

                    var translateX = deltaX * elasticity * 0.1 * fadeInFactor;
                    var translateY = deltaY * elasticity * 0.1 * fadeInFactor;

                    el.style.transform = 'translate(' + translateX.toFixed(2) + 'px, ' + translateY.toFixed(2) + 'px) scaleX(' + Math.max(0.8, scaleX).toFixed(4) + ') scaleY(' + Math.max(0.8, scaleY).toFixed(4) + ')';
                });

                el.addEventListener('mouseleave', function() {
                    el.style.transform = '';
                });
            })(elasticElements[i]);
        }
    }

    function initChromaticEffect() {
        var chromaticElements = document.querySelectorAll('.glass-chromatic');
        for (var i = 0; i < chromaticElements.length; i++) {
            (function(el) {
                el.addEventListener('mousemove', function(e) {
                    var rect = el.getBoundingClientRect();
                    var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                    var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                    el.style.setProperty('--chroma-x', x + '%');
                    el.style.setProperty('--chroma-y', y + '%');
                });
            })(chromaticElements[i]);
        }
    }

    function initMouseGlow() {
        var glowElements = document.querySelectorAll('.glass-mouse-glow');
        for (var i = 0; i < glowElements.length; i++) {
            (function(el) {
                el.addEventListener('mousemove', function(e) {
                    var rect = el.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    el.style.setProperty('--glow-x', x + 'px');
                    el.style.setProperty('--glow-y', y + 'px');
                });
            })(glowElements[i]);
        }
    }

    function initClickBounce() {
        document.addEventListener('mousedown', function(e) {
            var target = e.target.closest('.glass-click-bounce');
            if (target) target.style.transform = 'scale(0.95)';
        });
        document.addEventListener('mouseup', function() {
            var targets = document.querySelectorAll('.glass-click-bounce');
            for (var i = 0; i < targets.length; i++) targets[i].style.transform = '';
        });
    }

    function initLiquidGlassFilter() {
        if (document.getElementById('liquid-glass-svg-filters')) return;

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'display:none');
        svg.id = 'liquid-glass-svg-filters';

        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'liquid-glass-filter');
        filter.setAttribute('x', '-10%');
        filter.setAttribute('y', '-10%');
        filter.setAttribute('width', '120%');
        filter.setAttribute('height', '120%');
        filter.setAttribute('filterUnits', 'objectBoundingBox');
        filter.setAttribute('color-interpolation-filters', 'sRGB');

        var mapSize = 200;
        var mapDataUrl = generateDisplacementMap(mapSize, mapSize, liquidGlassFragment);

        var feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
        feImage.setAttribute('width', '100%');
        feImage.setAttribute('height', '100%');
        feImage.setAttribute('result', 'DISPLACEMENT_MAP');
        feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapDataUrl);

        var feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        feDisplacementMap.setAttribute('in', 'SourceGraphic');
        feDisplacementMap.setAttribute('in2', 'DISPLACEMENT_MAP');
        feDisplacementMap.setAttribute('scale', '70');
        feDisplacementMap.setAttribute('xChannelSelector', 'R');
        feDisplacementMap.setAttribute('yChannelSelector', 'G');

        filter.appendChild(feImage);
        filter.appendChild(feDisplacementMap);
        defs.appendChild(filter);

        var chromaFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        chromaFilter.setAttribute('id', 'liquid-glass-chroma-filter');
        chromaFilter.setAttribute('x', '-35%');
        chromaFilter.setAttribute('y', '-35%');
        chromaFilter.setAttribute('width', '170%');
        chromaFilter.setAttribute('height', '170%');
        chromaFilter.setAttribute('color-interpolation-filters', 'sRGB');

        var cFeImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
        cFeImage.setAttribute('width', '100%');
        cFeImage.setAttribute('height', '100%');
        cFeImage.setAttribute('result', 'DISPLACEMENT_MAP');
        cFeImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapDataUrl);

        var cFeColorMatrix1 = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        cFeColorMatrix1.setAttribute('in', 'DISPLACEMENT_MAP');
        cFeColorMatrix1.setAttribute('type', 'matrix');
        cFeColorMatrix1.setAttribute('values', '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0');
        cFeColorMatrix1.setAttribute('result', 'EDGE_INTENSITY');

        var cFeComponentTransfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
        cFeComponentTransfer.setAttribute('in', 'EDGE_INTENSITY');
        cFeComponentTransfer.setAttribute('result', 'EDGE_MASK');
        var feFuncA = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
        feFuncA.setAttribute('type', 'discrete');
        feFuncA.setAttribute('tableValues', '0 0.1 1');
        cFeComponentTransfer.appendChild(feFuncA);

        var cFeOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
        cFeOffset.setAttribute('in', 'SourceGraphic');
        cFeOffset.setAttribute('dx', '0');
        cFeOffset.setAttribute('dy', '0');
        cFeOffset.setAttribute('result', 'CENTER_ORIGINAL');

        var cFeDispR = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        cFeDispR.setAttribute('in', 'SourceGraphic');
        cFeDispR.setAttribute('in2', 'DISPLACEMENT_MAP');
        cFeDispR.setAttribute('scale', '-70');
        cFeDispR.setAttribute('xChannelSelector', 'R');
        cFeDispR.setAttribute('yChannelSelector', 'G');
        cFeDispR.setAttribute('result', 'RED_DISPLACED');
        var cFeMatrixR = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        cFeMatrixR.setAttribute('in', 'RED_DISPLACED');
        cFeMatrixR.setAttribute('type', 'matrix');
        cFeMatrixR.setAttribute('values', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0');
        cFeMatrixR.setAttribute('result', 'RED_CHANNEL');

        var cFeDispG = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        cFeDispG.setAttribute('in', 'SourceGraphic');
        cFeDispG.setAttribute('in2', 'DISPLACEMENT_MAP');
        cFeDispG.setAttribute('scale', '-66.5');
        cFeDispG.setAttribute('xChannelSelector', 'R');
        cFeDispG.setAttribute('yChannelSelector', 'G');
        cFeDispG.setAttribute('result', 'GREEN_DISPLACED');
        var cFeMatrixG = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        cFeMatrixG.setAttribute('in', 'GREEN_DISPLACED');
        cFeMatrixG.setAttribute('type', 'matrix');
        cFeMatrixG.setAttribute('values', '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0');
        cFeMatrixG.setAttribute('result', 'GREEN_CHANNEL');

        var cFeDispB = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        cFeDispB.setAttribute('in', 'SourceGraphic');
        cFeDispB.setAttribute('in2', 'DISPLACEMENT_MAP');
        cFeDispB.setAttribute('scale', '-63');
        cFeDispB.setAttribute('xChannelSelector', 'R');
        cFeDispB.setAttribute('yChannelSelector', 'G');
        cFeDispB.setAttribute('result', 'BLUE_DISPLACED');
        var cFeMatrixB = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        cFeMatrixB.setAttribute('in', 'BLUE_DISPLACED');
        cFeMatrixB.setAttribute('type', 'matrix');
        cFeMatrixB.setAttribute('values', '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0');
        cFeMatrixB.setAttribute('result', 'BLUE_CHANNEL');

        var cFeBlend1 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
        cFeBlend1.setAttribute('in', 'GREEN_CHANNEL');
        cFeBlend1.setAttribute('in2', 'BLUE_CHANNEL');
        cFeBlend1.setAttribute('mode', 'screen');
        cFeBlend1.setAttribute('result', 'GB_COMBINED');
        var cFeBlend2 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
        cFeBlend2.setAttribute('in', 'RED_CHANNEL');
        cFeBlend2.setAttribute('in2', 'GB_COMBINED');
        cFeBlend2.setAttribute('mode', 'screen');
        cFeBlend2.setAttribute('result', 'RGB_COMBINED');

        var cFeBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        cFeBlur.setAttribute('in', 'RGB_COMBINED');
        cFeBlur.setAttribute('stdDeviation', '0.4');
        cFeBlur.setAttribute('result', 'ABERRATED_BLURRED');

        var cFeCompEdge = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
        cFeCompEdge.setAttribute('in', 'ABERRATED_BLURRED');
        cFeCompEdge.setAttribute('in2', 'EDGE_MASK');
        cFeCompEdge.setAttribute('operator', 'in');
        cFeCompEdge.setAttribute('result', 'EDGE_ABERRATION');

        var cFeCompInvert = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
        cFeCompInvert.setAttribute('in', 'EDGE_MASK');
        cFeCompInvert.setAttribute('result', 'INVERTED_MASK');
        var feFuncAInv = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
        feFuncAInv.setAttribute('type', 'table');
        feFuncAInv.setAttribute('tableValues', '1 0');
        cFeCompInvert.appendChild(feFuncAInv);

        var cFeCompCenter = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
        cFeCompCenter.setAttribute('in', 'CENTER_ORIGINAL');
        cFeCompCenter.setAttribute('in2', 'INVERTED_MASK');
        cFeCompCenter.setAttribute('operator', 'in');
        cFeCompCenter.setAttribute('result', 'CENTER_CLEAN');

        var cFeCompFinal = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
        cFeCompFinal.setAttribute('in', 'EDGE_ABERRATION');
        cFeCompFinal.setAttribute('in2', 'CENTER_CLEAN');
        cFeCompFinal.setAttribute('operator', 'over');

        var chromaChildren = [cFeImage, cFeColorMatrix1, cFeComponentTransfer, cFeOffset,
            cFeDispR, cFeMatrixR, cFeDispG, cFeMatrixG, cFeDispB, cFeMatrixB,
            cFeBlend1, cFeBlend2, cFeBlur, cFeCompEdge, cFeCompInvert, cFeCompCenter, cFeCompFinal];
        for (var ci = 0; ci < chromaChildren.length; ci++) chromaFilter.appendChild(chromaChildren[ci]);
        defs.appendChild(chromaFilter);

        svg.appendChild(defs);
        document.body.appendChild(svg);
    }

    function initLiquidGlass() {
        var elements = document.querySelectorAll('.liquid-glass, .liquid-glass-btn, .liquid-glass-pill, .liquid-glass-nav');
        if (elements.length === 0) return;

        initLiquidGlassFilter();

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.querySelector('.liquid-glass-outer')) continue;

            var content = document.createElement('div');
            content.className = 'liquid-glass-content';
            while (el.firstChild) content.appendChild(el.firstChild);

            var outer = document.createElement('div');
            outer.className = 'liquid-glass-outer';

            var cover = document.createElement('div');
            cover.className = 'liquid-glass-cover';

            var sharp = document.createElement('div');
            sharp.className = 'liquid-glass-sharp';

            var reflect = document.createElement('div');
            reflect.className = 'liquid-glass-reflect';

            el.appendChild(outer);
            el.appendChild(cover);
            el.appendChild(sharp);
            el.appendChild(reflect);
            el.appendChild(content);
        }
    }

    function initBackgroundSwitcher() {
        var container = document.querySelector('.glass-bg-switcher');
        if (!container) return;

        var btn = container.querySelector('.glass-bg-switcher-btn');
        var panel = document.querySelector('.glass-bg-panel');
        var urlInput = document.querySelector('.glass-bg-url-input');
        var applyBtn = document.querySelector('.glass-bg-apply-btn');
        var uploadArea = document.querySelector('.glass-bg-upload-area');
        var fileInput = document.querySelector('.glass-bg-file-input');
        var presetsContainer = document.querySelector('.glass-bg-presets');
        var resetBtn = document.querySelector('.glass-bg-reset');

        if (!btn || !panel) return;

        var pageKey = 'lg-bg-' + window.location.pathname;

        var bgLayer = document.querySelector('.lg-custom-bg');
        if (!bgLayer) {
            bgLayer = document.createElement('div');
            bgLayer.className = 'lg-custom-bg';
            bgLayer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none;transition:opacity 0.5s ease;opacity:0;';
            document.body.insertBefore(bgLayer, document.body.firstChild);
        }

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            panel.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!container.contains(e.target) && !panel.contains(e.target)) {
                panel.classList.remove('show');
            }
        });

        function applyBackground(url) {
            bgLayer.style.backgroundImage = 'url(' + url + ')';
            bgLayer.style.opacity = '1';
            try { localStorage.setItem(pageKey, url); } catch(e) {}
        }

        function resetBackground() {
            bgLayer.style.opacity = '0';
            setTimeout(function() { bgLayer.style.backgroundImage = ''; }, 500);
            try { localStorage.removeItem(pageKey); } catch(e) {}
        }

        if (applyBtn && urlInput) {
            applyBtn.addEventListener('click', function() {
                var url = urlInput.value.trim();
                if (url) applyBackground(url);
            });
            urlInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    var url = urlInput.value.trim();
                    if (url) applyBackground(url);
                }
            });
        }

        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', function() { fileInput.click(); });
            uploadArea.addEventListener('dragover', function(e) { e.preventDefault(); uploadArea.classList.add('dragover'); });
            uploadArea.addEventListener('dragleave', function() { uploadArea.classList.remove('dragover'); });
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                var file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    var reader = new FileReader();
                    reader.onload = function(ev) { applyBackground(ev.target.result); };
                    reader.readAsDataURL(file);
                }
            });
            fileInput.addEventListener('change', function() {
                var file = fileInput.files[0];
                if (file && file.type.startsWith('image/')) {
                    var reader = new FileReader();
                    reader.onload = function(ev) { applyBackground(ev.target.result); };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (presetsContainer) {
            var presets = presetsContainer.querySelectorAll('.glass-bg-preset');
            for (var i = 0; i < presets.length; i++) {
                (function(preset) {
                    preset.addEventListener('click', function() {
                        var url = preset.getAttribute('data-url') || preset.style.backgroundImage.slice(4, -1).replace(/['"]/g, '');
                        if (url) {
                            applyBackground(url);
                            for (var j = 0; j < presets.length; j++) presets[j].classList.remove('active');
                            preset.classList.add('active');
                        }
                    });
                })(presets[i]);
            }
        }

        if (resetBtn) resetBtn.addEventListener('click', resetBackground);

        try {
            var savedBg = localStorage.getItem(pageKey);
            if (savedBg) applyBackground(savedBg);
        } catch(e) {}
    }

    function initScrollingBackground() {
        var elements = document.querySelectorAll('.glass-scrolling-bg');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundSize = 'cover';
        }
    }

    function initHoverGrowth() {
        var style = document.createElement('style');
        style.textContent = '.liquid-glass-nav:hover{padding:8px 14px}.liquid-glass-btn:hover{padding:10px 22px}.liquid-glass-pill:hover{padding:6px 16px}';
        document.head.appendChild(style);
    }

    function initDynamicBorder() {
        var elements = document.querySelectorAll('.liquid-glass, .liquid-glass-btn, .liquid-glass-pill, .liquid-glass-nav');
        for (var i = 0; i < elements.length; i++) {
            (function(el) {
                el.addEventListener('mousemove', function(e) {
                    var rect = el.getBoundingClientRect();
                    var offsetX = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                    var offsetY = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                    el.style.setProperty('--border-angle', (135 + parseFloat(offsetX) * 1.2).toFixed(1) + 'deg');
                    el.style.setProperty('--border-x', offsetX + '%');
                    el.style.setProperty('--border-y', offsetY + '%');
                });
            })(elements[i]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAllSelects();
            initMouseTracking();
            initScrollBlur();
            initRippleEffect();
            initEntranceAnimations();
            initPageTransition();
            initTiltEffect();
            initLiquidGlass();
            initElasticMouse();
            initChromaticEffect();
            initMouseGlow();
            initClickBounce();
            initBackgroundSwitcher();
            initScrollingBackground();
            initHoverGrowth();
            initDynamicBorder();
        });
    } else {
        initAllSelects();
        initMouseTracking();
        initScrollBlur();
        initRippleEffect();
        initEntranceAnimations();
        initPageTransition();
        initTiltEffect();
        initLiquidGlass();
        initElasticMouse();
        initChromaticEffect();
        initMouseGlow();
        initClickBounce();
        initBackgroundSwitcher();
        initScrollingBackground();
        initHoverGrowth();
        initDynamicBorder();
    }

    window.initLiquidGlassSelects = initAllSelects;
    window.LiquidGlassSelect = LiquidGlassSelect;
    window.initLiquidGlassFilter = initLiquidGlassFilter;
    window.initLiquidGlass = initLiquidGlass;
    window.initBackgroundSwitcher = initBackgroundSwitcher;
    window.generateDisplacementMap = generateDisplacementMap;
})();
