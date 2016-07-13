"use strict";

//NOTE: Do not use keyMirror to generate the enums as JSDocs doesn't know how to parse it for keys.

 /**
 * @module constants/CacheConstants
 * @desc {@link module:net/Cache} Related cache constants.
 */
module.exports = {
    /**
     * @enum {string}
     * @alias module:constants/CacheConstants.CacheTypes
     * @desc Cache storage types
     */
    CacheTypes: {
        /** in-memory */
        MEMORY: "MEMORY",
        /** local browser storage */
        LOCAL: "LOCAL"
    }
};
