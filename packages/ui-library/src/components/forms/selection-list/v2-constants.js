/**
 * @enum {string}
 * @alias SelectionList.ListType
 * @desc Enum for the different options for SelectionList type.
 *     Set type prop to {SelectionList.types.SINGLE} for a single selection list with radio buttons.
 *     Set type prop to {SelectionList.types.MULTI} for a multi selection list with check boxes.
 */
exports.ListType = {
    ADD: "add",
    SINGLE: "single",
    MULTI: "multi",
    MULTIADD: "multiadd",
    VIEWONLY: "viewonly"
};
