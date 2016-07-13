"use strict";

//NOTE: Do not use keyMirror to generate the enums as JSDocs doesn't know how to parse it for keys.

/**
 * @module constants/FormFieldConstants
 * @desc Related form field constants.
 */
module.exports = {
    /**
     * @enum {string}
     * @alias module:constants/FormFieldConstants.FormFieldTypes
     * @desc Form field types.
     */
    FormFieldMode: {
        NEW: "NEW",
        EDIT: "EDIT",
        READ_ONLY: "READ_ONLY",
        SUMMARY: "SUMMARY"
    }
};
