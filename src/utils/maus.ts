/* */
export default {
    initMove,
    initBoundary,

    actionMoveSetCSSProps,
    actionSetClass,
};

/**
 * Initializes Maus on elements matching given query
 *
 * @param {*} elementQuery The elements to affect
 * @param {*} moveCallback Callback called on movement inside mausRoot
 * @param {*} mausRoot Element to which mousemove event listener is attached
 */
function initMove(elementQuery, moveCallback, mausRoot = "html"): void {
    const els = document.querySelectorAll(elementQuery);
    const root = document.querySelector(mausRoot);
    [...els].forEach((element) => {
        root.addEventListener("mousemove", (event) =>
            moveCallback(root, element, event)
        );
    });
}

function initBoundary(
    elementQuery,
    enterCallback = null,
    exitCallback = null
): void {
    const els = document.querySelectorAll(elementQuery);
    [...els].forEach((element) => {
        element.addEventListener("mouseenter", (event) => {
            if (enterCallback) enterCallback(element);
        });
        element.addEventListener("mouseleave", (event) => {
            if (exitCallback) exitCallback(element);
        });
    });
}

function actionMoveSetCSSProps(mausRoot, element, event) {
    element.style.setProperty("--maus-x", `${event.clientX}px`);
    element.style.setProperty("--maus-y", `${event.clientY}px`);
    element.style.setProperty("--maus-dx", `${event.movementX}px`);
    element.style.setProperty("--maus-dy", `${event.movementY}px`);
}

function actionSetClass(clazz, state) {
    return (element) => {
        console.log(clazz + " " + state);
    };
}
