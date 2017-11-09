var Utils = require("../../../../util/Utils");

module.exports = function () {
    if (!Utils.isProduction()) {
        throw(Utils.deprecatedError("I18nPhoneInput", "v1", "v2"));
    }
    return null;
};
