"use strict";

var keyMirror = require("fbjs/lib/keyMirror");

module.exports = {
    FormFieldMode: keyMirror({
        NEW: null,
        EDIT: null,
        READ_ONLY: null,
        SUMMARY: null
    })
};
