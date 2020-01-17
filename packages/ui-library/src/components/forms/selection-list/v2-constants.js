/**
 * @enum {string}
 * @alias SelectionList.ListType
 * @desc Enum for the different options for SelectionList type.
 *     Set type prop to {SelectionList.types.SINGLE} for a single selection list with radio buttons.
 *     Set type prop to {SelectionList.types.MULTI} for a multi selection list with check boxes.
 */
exports.ListType = {
    /** add */
    ADD: "add",
    /** single */
    SINGLE: "single",
    /** multi */
    MULTI: "multi",
    /** multiadd */
    MULTIADD: "multiadd",
    /** viewonly */
    VIEWONLY: "viewonly"
};
