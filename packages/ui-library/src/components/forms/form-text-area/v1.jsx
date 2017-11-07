var Utils = require("../../../util/Utils");

module.exports = function () {
    if (!Utils.isProduction()) {
        console.error(Utils.deprecatedError("FormTextArea", "v1", "v2"));
    }
    return null;
};
