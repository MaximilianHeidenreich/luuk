/**
 * Check whether an element is in the viewport by
 * more than offset px.
 * options: { threshold, pffset: { top, right, bottom, left }}
 */
declare function isElementInViewport(element: any, options: any): boolean;
declare class ScrollSpyRegistry {
    options: any;
    elements: any;
    current: any;
    handlers: any;
    singles: any;
    constructor(elements: any, options: any);
    /**
     * Check each element in the registry, if an element
     * changes states, fire an event and operate on current.
     */
    check(): this;
    /**
     * Register a handler for event, to be fired
     * for every event.
     */
    on(event: any, handler: any): this;
    /**
     * Register a handler for event, to be fired
     * once and removed.
     */
    once(event: any, handler: any): this;
    /**
     * Emit event on given element. Used mostly
     * internally, but could be useful for users.
     */
    emit(event: any, element: any): this;
    offset(n: any): this;
    threshold(n: any): this;
}
declare function ScrollSpy(): _ScrollSpy;
declare class _ScrollSpy {
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
    selectors: any;
    selectorRegistries: any;
    selectorQueries: any;
    options: any;
    checkIntervalID: any;
    constructor();
    check: () => void;
    start(): void;
    stop(): void;
    initSpy(elementQuery: any): ScrollSpyRegistry;
}
declare const _default: {
    ScrollSpy: typeof ScrollSpy;
    isElementInViewport: typeof isElementInViewport;
};
export default _default;
