/*eslint-disable valid-jsdoc*/

import { Cache } from "@pingone/net";

const Utils = require("../util/Utils.js");

/**
* @class Cache
*/

if (!Utils.isProduction()) {
    Utils.deprecateWarn("lib/net","@pingone/net npm module");
}

module.exports = Cache;
