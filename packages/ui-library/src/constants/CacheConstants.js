"use strict";

import { CacheConstants } from "@pingone/net";
const Utils = require("../util/Utils.js");

//NOTE: Do not use keyMirror to generate the enums as JSDocs doesn't know how to parse it for keys.

if (!Utils.isProduction()) {
    Utils.deprecateWarn("lib/net","@pingone/net npm module");
}

/**
 * @module constants/CacheConstants
 * @desc {@link module:net/Cache} Related cache constants.
 */
module.exports = CacheConstants;
