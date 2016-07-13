var v1 = require("./v1.jsx"),
    v2 = require("./v2.jsx"),
    defaultComponent = v2;

defaultComponent.v1 = v1;
defaultComponent.v2 = v2;

module.exports = defaultComponent;
