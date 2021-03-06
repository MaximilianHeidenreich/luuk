import { throttle } from "lodash";
import Registry from "./registry";
/**
 * Check whether an element is in the viewport by
 * more than offset px.
 */
function inViewport(element, options) {
    const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
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
    return (intersection.t > options.offset.top + threshold.y &&
        intersection.r > options.offset.right + threshold.x &&
        intersection.b > options.offset.bottom + threshold.y &&
        intersection.l > options.offset.left + threshold.x);
}
/**
 * Create and return the inView function.
 */
const inView = () => {
    /**
     * Fallback if window is undefined.
     */
    if (typeof window === "undefined")
        return;
    /**
     * How often and on what events we should check
     * each registry.
     */
    const interval = 100;
    const triggers = ["scroll", "resize", "load"];
    /**
     * Maintain a hashmap of all registries, a history
     * of selectors to enumerate, and an options object.
     */
    let selectors = { history: [] };
    let options = { offset: {}, threshold: 0, test: inViewport };
    /**
     * Check each registry from selector history,
     * throttled to interval.
     */
    const check = throttle(() => {
        selectors.history.forEach((selector) => {
            selectors[selector].check();
        });
    }, interval);
    /**
     * For each trigger event on window, add a listener
     * which checks each registry.
     */
    triggers.forEach((event) => addEventListener(event, check));
    /**
     * If supported, use MutationObserver to watch the
     * DOM and run checks on mutation.
     */
    if (window.MutationObserver) {
        addEventListener("DOMContentLoaded", () => {
            new MutationObserver(check).observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        });
    }
    /**
     * The main interface. Take a selector and retrieve
     * the associated registry or create a new one.
     */
    let control = (selector) => {
        if (typeof selector !== "string")
            return;
        // Get an up-to-date list of elements.
        let elements = [].slice.call(document.querySelectorAll(selector));
        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            selectors[selector].elements = elements;
        }
        // If it doesn't exist, create a new registry.
        else {
            selectors[selector] = Registry(elements, options);
            selectors.history.push(selector);
        }
        return selectors[selector];
    };
    /**
     * Mutate the offset object with either an object
     * or a number.
     */
    // @ts-ignore
    control.offset = (o) => {
        if (o === undefined)
            return options.offset;
        const isNum = (n) => typeof n === "number";
        ["top", "right", "bottom", "left"].forEach(isNum(o)
            ? (dim) => (options.offset[dim] = o)
            : (dim) => isNum(o[dim]) ? (options.offset[dim] = o[dim]) : null);
        return options.offset;
    };
    /**
     * Set the threshold with a number.
     */
    // @ts-ignore
    control.threshold = (n) => {
        return typeof n === "number" && n >= 0 && n <= 1
            ? (options.threshold = n)
            : options.threshold;
    };
    /**
     * Use a custom test, overriding inViewport, to
     * determine element visibility.
     */
    // @ts-ignore
    control.test = (fn) => {
        return typeof fn === "function" ? (options.test = fn) : options.test;
    };
    /**
     * Add proxy for test function, set defaults,
     * and return the interface.
     */
    // @ts-ignore
    control.is = (el) => options.test(el, options);
    // @ts-ignore
    control.offset(0);
    return control;
};
// Export a singleton.
export default inView();
