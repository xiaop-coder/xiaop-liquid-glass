/**
 * Liquid Glass Select Component
 * @module components/select
 */

/**
 * LiquidGlassSelect class - Custom select dropdown with liquid glass styling
 */
export class LiquidGlassSelect {
    /**
     * Create a liquid glass select
     * @param {HTMLSelectElement} selectEl - Native select element
     */
    constructor(selectEl) {
        this.select = selectEl;
        this.options = [];
        this.selectedIndex = 0;
        this.isOpen = false;
        this.onChange = null;
        this.parentSection = null;
        this.wrapper = null;
        this.header = null;
        this.selectedText = null;
        this.list = null;
        this.init();
    }

    /**
     * Initialize the custom select
     */
    init() {
        // Store original onchange handler
        this.onChange = this.select.getAttribute('onchange');

        // Parse options
        const options = this.select.querySelectorAll('option');
        options.forEach((opt, i) => {
            this.options.push({
                value: opt.value,
                text: opt.textContent.trim(),
                selected: opt.selected
            });
            if (opt.selected) this.selectedIndex = i;
        });

        // Create wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'liquid-glass-dropdown';
        if (this.select.classList.contains('select-sm')) this.wrapper.classList.add('small');
        if (this.select.classList.contains('select-lg')) this.wrapper.classList.add('large');

        // Create header
        this.header = document.createElement('div');
        this.header.className = 'dropdown-header';

        this.selectedText = document.createElement('span');
        this.selectedText.className = 'selected-text';
        this.selectedText.textContent = this.options.length > 0 ? this.options[this.selectedIndex].text : '';

        const arrow = document.createElement('i');
        arrow.className = 'arrow';

        this.header.appendChild(this.selectedText);
        this.header.appendChild(arrow);

        // Create dropdown list
        this.list = document.createElement('div');
        this.list.className = 'dropdown-list';

        this.options.forEach((opt, i) => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            if (i === this.selectedIndex) item.classList.add('active');
            item.setAttribute('data-value', opt.value);
            item.setAttribute('data-index', i);
            item.textContent = opt.text;
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(i);
            });
            this.list.appendChild(item);
        });

        // Assemble
        this.wrapper.appendChild(this.header);
        this.wrapper.appendChild(this.list);

        // Replace original select
        this.select.style.display = 'none';
        this.select.parentNode.insertBefore(this.wrapper, this.select);
        this.wrapper.appendChild(this.select);

        // Find parent section for overflow handling
        this.parentSection = this.wrapper.closest('.settings-section');

        // Event listeners
        this.header.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.list.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) this.close();
        });
    }

    /**
     * Toggle dropdown open/close
     */
    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    /**
     * Open dropdown
     */
    open() {
        this.closeAll();
        this.wrapper.classList.add('open');
        this.isOpen = true;
        this.list.classList.add('show');
        if (this.parentSection) this.parentSection.classList.add('dropdown-open');
    }

    /**
     * Close dropdown
     */
    close() {
        this.wrapper.classList.remove('open');
        this.isOpen = false;
        this.list.classList.remove('show');
        if (this.parentSection) this.parentSection.classList.remove('dropdown-open');
    }

    /**
     * Close all dropdowns on page
     */
    closeAll() {
        document.querySelectorAll('.liquid-glass-dropdown.open').forEach(el => {
            el.classList.remove('open');
        });
        document.querySelectorAll('.dropdown-list.show').forEach(el => {
            el.classList.remove('show');
        });
        document.querySelectorAll('.settings-section.dropdown-open').forEach(el => {
            el.classList.remove('dropdown-open');
        });
    }

    /**
     * Select an option by index
     * @param {number} index - Option index
     */
    selectOption(index) {
        this.selectedIndex = index;
        const option = this.options[index];

        // Update UI
        this.selectedText.textContent = option.text;
        const items = this.list.querySelectorAll('.dropdown-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Update native select
        this.select.value = option.value;

        // Trigger change event
        const event = new Event('change', { bubbles: true });
        this.select.dispatchEvent(event);

        // Call original onchange if exists
        if (this.onChange) {
            const fn = new Function('event', this.onChange);
            fn.call(this.select, event);
        }

        this.close();
    }

    /**
     * Destroy the custom select and restore original
     */
    destroy() {
        this.select.style.display = '';
        this.wrapper.parentNode.insertBefore(this.select, this.wrapper);
        this.wrapper.remove();
    }
}

/**
 * Initialize all select elements on the page
 * @param {string} selector - CSS selector for select elements
 * @returns {LiquidGlassSelect[]} Array of initialized selects
 */
export function initAllSelects(selector = 'select:not(.no-liquid-glass):not([data-lg-converted])') {
    const selects = document.querySelectorAll(selector);
    const instances = [];

    selects.forEach(select => {
        // Skip if already converted or inside a dropdown
        if (select.closest('.liquid-glass-dropdown')) return;

        select.setAttribute('data-lg-converted', 'true');
        instances.push(new LiquidGlassSelect(select));
    });

    return instances;
}
