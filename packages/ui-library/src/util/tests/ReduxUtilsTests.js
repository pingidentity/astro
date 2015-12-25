window.__DEV__ = true;

jest.dontMock("../ReduxUtils");

describe("ReduxUtils", function () {
    var Utils = require("../ReduxUtils");

    it("set non-existant path", function () {
        var state = { some: {} };
        Utils.setAtPath(state, "some.path.to.mine", 1);

        expect(state).toEqual({ some: { path: { to: { mine: 1 } } } });
    });
});
