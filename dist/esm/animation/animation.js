function sliceWordsAnimation(nodeQuery, animationName, baseDelay, delayIncrement) {
    const elements = document.querySelectorAll(nodeQuery);
    [...elements].forEach((el) => {
        // @ts-ignore
        const words = el.innerText.split(" ");
        // @ts-ignore
        el.innerText = "";
        let i = 0;
        words.forEach((word) => {
            var span = document.createElement("span");
            span.innerText = word;
            span.classList.add("lk-a");
            span.classList.add(`lk-a__${animationName}`);
            span.style.setProperty("--lk-a-delay", `${baseDelay + i * delayIncrement}s`);
            el.appendChild(span);
            i++;
        });
    });
}
export default {
    sliceWordsAnimation,
};
