declare const _default: {
    initMove: typeof initMove;
    initBoundary: typeof initBoundary;
    actionMoveSetCSSProps: typeof actionMoveSetCSSProps;
    actionSetClass: typeof actionSetClass;
};
export default _default;
/**
 * Initializes Maus on elements matching given query
 *
 * @param {*} elementQuery The elements to affect
 * @param {*} moveCallback Callback called on movement inside mausRoot
 * @param {*} mausRoot Element to which mousemove event listener is attached
 */
declare function initMove(elementQuery: any, moveCallback: any, mausRoot?: string): void;
declare function initBoundary(elementQuery: any, enterCallback?: any, exitCallback?: any): void;
declare function actionMoveSetCSSProps(mausRoot: any, element: any, event: any): void;
declare function actionSetClass(clazz: any, state: any): (element: any) => void;
