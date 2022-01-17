/**
 * - Registry -
 *
 * Maintain a list of elements, a subset which currently pass
 * a given criteria, and fire events when elements move in or out.
 */
declare class inViewRegistry {
    options: any;
    elements: any;
    current: any[];
    handlers: {
        enter: any[];
        exit: any[];
    };
    singles: {
        enter: any[];
        exit: any[];
    };
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
}
declare const _default: (elements: any, options: any) => inViewRegistry;
export default _default;
