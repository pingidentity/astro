"use strict";

var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @module constants/CacheConstants
 * @desc {@link net/Cache} related constants
 */
module.exports = {
    /**
     * @desc cache types
     */
    CacheTypes: keyMirror({
        /**
         * @desc in-memory
         */
        MEMORY: null,
        /**
         * @desc local browser storage
         */
        LOCAL: null
    })
};
