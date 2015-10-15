'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = {
    FormFieldMode: keyMirror({
        NEW: null,
        EDIT: null,
        READ_ONLY: null,
        SUMMARY: null
    })
};