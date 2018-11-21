
/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

import Api from "@pingone/net";

const Utils = require("../util/Utils.js");

if (!Utils.isProduction()) {
    Utils.deprecateWarn("lib/net","@pingone/net npm module");
}

module.exports = Api;
