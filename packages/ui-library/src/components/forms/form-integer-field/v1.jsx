var Utils = require("../../../util/Utils");

module.exports = function () {
    if (!Utils.isProduction()) {
        throw new Error(Utils.deprecatedError("FormIntegerField", "v1", "v2"));
    }
    return null;
};
