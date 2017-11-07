var Utils = require("../../../util/Utils");

module.exports = function () {
    if (!Utils.isProduction()) {
        console.error("** The Collapsible Section has been deprecated and removed. " +
        "See the \"Section\" or \"Collapsible Link\" components for a replacement.");
    }
    return null;
};
