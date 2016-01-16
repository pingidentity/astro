window.__DEV__ = true;

jest.dontMock("../ReduxUtils");

describe("ReduxUtils", function () {
    var Utils = require("../ReduxUtils"),
        _ = require("underscore");

    it("Set at path clones", function () {
        var state = { some: { initial: { state: 5 } } };
        var next = Utils.setAtPath(_.clone(state), "some.initial.state", 6);

        expect(next.some.initial.state).toBe(6);
        expect(state.some.initial.state).toBe(5);
    });
});
