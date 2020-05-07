export const measureWidth = (elem) => {
    return elem.getBoundingClientRect().width;
};

/**
 * This will select all of the text in the given element, including text of child elements
 *
 * @param {HTMLElement} element - The element to use when selecting all text contained within
 */
export const selectTextWithinElement = (element) => {
    if (!element) { return; }
    const selection = global.getSelection();

    if (selection.toString() === "") {
        /*
        * Handle input elements (which have theirown select method) specially to provide
        * better / un-styled selection.  It is assumed that if an input field exists within the
        * element that clicking the input should only select the text within the input.
        */
        if (element && element.select) {
            element.select();
        } else if (global.document.body.createTextRange) {
            const range = global.document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (global.getSelection) {
            const range = global.document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};