"use strict";

var keyMirror = require("fbjs/lib/keyMirror");

/**
 * @module net/Cache
 * @desc {@link net/Cache} related constants
 */
module.exports = {
    /**
     * @enum {string}
     * @desc cache storage types
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
