import { DataSouceApi } from "@pingone/net";

const Utils = require("../util/Utils.js");

if (!Utils.isProduction()) {
    Utils.deprecateWarn("lib/net","@pingone/net npm module");
}

module.exports = DataSouceApi;
