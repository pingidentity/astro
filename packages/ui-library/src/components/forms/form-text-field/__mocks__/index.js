jest.dontMock("./v2.jsx");

var v2 = require("./v2.jsx"),
    defaultComponent = v2;

defaultComponent.v2 = v2;
defaultComponent.latest = v2;

module.exports = defaultComponent;
