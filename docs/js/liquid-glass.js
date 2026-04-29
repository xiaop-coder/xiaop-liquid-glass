(function() {
    'use strict';

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
            this.options.push({
                value: options[i].value,
                text: options[i].textContent.trim(),
                selected: options[i].selected
            });
            if (options[i].selected) {
                this.selectedIndex = i;
            }
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

            item.addEventListener('click', function(e) {
                e.stopPropagation();
                var idx = parseInt(this.getAttribute('data-index'));
                self.selectOption(idx);
            });

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

        header.addEventListener('click', function(e) {
            e.stopPropagation();
            self.toggle();
        });

        list.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function(e) {
            if (!wrapper.contains(e.target)) {
                self.close();
            }
        });
    };

    LiquidGlassSelect.prototype.toggle = function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    };

    LiquidGlassSelect.prototype.open = function() {
        this.closeAll();
        this.wrapper.classList.add('open');
        this.isOpen = true;
        this.list.classList.add('show');

        if (this.parentSection) {
            this.parentSection.classList.add('dropdown-open');
        }
    };

    LiquidGlassSelect.prototype.close = function() {
        this.wrapper.classList.remove('open');
        this.isOpen = false;
        this.list.classList.remove('show');

        if (this.parentSection) {
            this.parentSection.classList.remove('dropdown-open');
        }
    };

    LiquidGlassSelect.prototype.closeAll = function() {
        var all = document.querySelectorAll('.liquid-glass-dropdown.open');
        for (var i = 0; i < all.length; i++) {
            all[i].classList.remove('open');
        }
        var lists = document.querySelectorAll('.dropdown-list.show');
        for (var j = 0; j < lists.length; j++) {
            lists[j].classList.remove('show');
        }
        var sections = document.querySelectorAll('.settings-section.dropdown-open');
        for (var k = 0; k < sections.length; k++) {
            sections[k].classList.remove('dropdown-open');
        }
    };

    LiquidGlassSelect.prototype.selectOption = function(index) {
        this.selectedIndex = index;
        var option = this.options[index];

        this.selectedText.textContent = option.text;

        var items = this.list.querySelectorAll('.dropdown-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        items[index].classList.add('active');

        this.select.value = option.value;

        var event = new Event('change', { bubbles: true });
        this.select.dispatchEvent(event);

        if (this.onChange) {
            var fn = new Function('event', this.onChange);
            fn.call(this.select, event);
        }

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
            var target = e.target.closest('.btn, .hero-btn, .nav-btn, button[class*="btn"]');
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

            if (!target.classList.contains('glass-ripple-container')) {
                target.classList.add('glass-ripple-container');
            }

            target.appendChild(ripple);

            ripple.addEventListener('animationend', function() {
                ripple.remove();
            });
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
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            for (var j = 0; j < elements.length; j++) {
                observer.observe(elements[j]);
            }
        } else {
            for (var k = 0; k < elements.length; k++) {
                elements[k].classList.add('glass-visible');
            }
        }
    }

    function initPageTransition() {
        var mainContent = document.querySelector('.container, .page-content, main, .login-card, .register-card, .register-container');
        if (mainContent) {
            mainContent.classList.add('glass-page-transition');
        }
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAllSelects();
            initMouseTracking();
            initScrollBlur();
            initRippleEffect();
            initEntranceAnimations();
            initPageTransition();
            initTiltEffect();
        });
    } else {
        initAllSelects();
        initMouseTracking();
        initScrollBlur();
        initRippleEffect();
        initEntranceAnimations();
        initPageTransition();
        initTiltEffect();
    }

    window.initLiquidGlassSelects = initAllSelects;
    window.LiquidGlassSelect = LiquidGlassSelect;
})();
