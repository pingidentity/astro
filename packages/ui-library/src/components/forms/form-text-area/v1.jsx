var Utils = require("../../../util/Utils");

module.exports = function () {
    if (!Utils.isProduction()) {
        throw(Utils.deprecatedError("FormTextArea", "v1", "v2"));
    }
    return null;
};
