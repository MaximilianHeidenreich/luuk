/**
 * Check whether an element is in the viewport by
 * more than offset px.
 * options: { threshold, pffset: { top, right, bottom, left }}
 */
function isElementInViewport(element, options) {
    const { top, right, bottom, left, width, height } =
        element.getBoundingClientRect();

    const intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right,
    };

    const threshold = {
        x: options.threshold * width,
        y: options.threshold * height,
    };

    return (
        intersection.t > options.offset.top + threshold.y &&
        intersection.r > options.offset.right + threshold.x &&
        intersection.b > options.offset.bottom + threshold.y &&
        intersection.l > options.offset.left + threshold.x
    );
}

class ScrollSpyRegistry {
    options;
    elements;
    current;
    handlers;
    singles;

    constructor(elements, options) {
        this.options = options;
        this.elements = elements;
        this.current = [];
        this.handlers = { enter: [], exit: [] };
        this.singles = { enter: [], exit: [] };
    }

    /**
     * Check each element in the registry, if an element
     * changes states, fire an event and operate on current.
     */
    check() {
        this.elements.forEach((el) => {
            let passes = this.options.test(el, this.options);
            let index = this.current.indexOf(el);
            let current = index > -1;
            let entered = passes && !current;
            let exited = !passes && current;

            if (entered) {
                this.current.push(el);
                this.emit("enter", el);
            }

            if (exited) {
                this.current.splice(index, 1);
                this.emit("exit", el);
            }
        });
        return this;
    }

    /**
     * Register a handler for event, to be fired
     * for every event.
     */
    on(event, handler) {
        this.handlers[event].push(handler);
        return this;
    }

    /**
     * Register a handler for event, to be fired
     * once and removed.
     */
    once(event, handler) {
        this.singles[event].unshift(handler);
        return this;
    }

    /**
     * Emit event on given element. Used mostly
     * internally, but could be useful for users.
     */
    emit(event, element) {
        while (this.singles[event].length) {
            this.singles[event].pop()(element);
        }
        let length = this.handlers[event].length;
        while (--length > -1) {
            this.handlers[event][length](element);
        }
        return this;
    }

    offset(n) {
        if (typeof n === "number") {
            this.options.offset = { top: n, right: n, bottom: n, left: n };
        } else {
            Object.assign(this.options.offset, n);
        }
        return this;
    }

    threshold(n) {
        n >= 0 && n <= 1
            ? (this.options.threshold = n)
            : this.options.threshold;
        return this;
    }
}

function ScrollSpy(): _ScrollSpy {
    // @ts-ignore
    if (window.luukScrollSpy !== undefined) {
        // @ts-ignore
        return window.luukScrollSpy;
    } else {
        let spy = new _ScrollSpy();
        // @ts-ignore
        window.luukScrollSpy = spy;
        // @ts-ignore
        return window.luukScrollSpy;
    }
}
// Use ScrollSpy method to get it!
class _ScrollSpy {
    /**
     * How often and on what events we should check
     * each registry.
     */
    interval: number;
    triggers: string[];

    /**
     * Maintain a hashmap of all registries, a history
     * of selectors to enumerate, and an options object.
     */
    selectors;
    selectorRegistries;
    selectorQueries;
    options;

    checkIntervalID = null;

    constructor() {
        this.interval = 100;
        this.triggers = ["scroll", "resize", "load"];
        //this.selectors = { history: [] };
        this.selectorRegistries = [];
        this.selectorQueries = [];
        this.options = { offset: {}, threshold: 0, test: isElementInViewport };

        for (let i in this.triggers) {
            addEventListener(this.triggers[i], () => this.check);
        }
        /**
         * If supported, use MutationObserver to watch the
         * DOM and run checks on mutation.
         */
        if (window.MutationObserver) {
            addEventListener("DOMContentLoaded", () => {
                new MutationObserver(this.check).observe(document.body, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                });
            });
        }

        //this.start();
    }

    check = () => {
        this.selectors.history.forEach((selector) => {
            this.selectors[selector].check();
        });
    };

    start() {
        if (!this.checkIntervalID) {
            setInterval(() => this.check, this.interval);
        }
    }

    stop() {
        clearInterval(this.checkIntervalID);
    }

    initSpy(elementQuery): ScrollSpyRegistry {
        // Get an up-to-date list of elements.
        let elements = [].slice.call(document.querySelectorAll(elementQuery));

        // If the registry exists, update the elements.
        if (this.selectorQueries.indexOf(elementQuery) > -1) {
            this.selectorRegistries[elementQuery].elements = elements;
        } else {
            this.selectorRegistries[elementQuery] = new ScrollSpyRegistry(
                elements,
                this.options
            );
            this.selectorQueries.push(elementQuery);
        }

        return this.selectorRegistries[elementQuery];
    }
}

export default {
    ScrollSpy,
    isElementInViewport,
};
