window.__DEV__ = true;

jest.dontMock("../ReduxUtils");

describe("ReduxUtils", function () {
    var Utils = require("../ReduxUtils"),
        _ = require("underscore");

    it("Array path", function () {
        var state = {};
        var next = Utils.setAtPath(_.clone(state), ["some.x", "initial.y", "state"], 6);
        expect(next["some.x"]["initial.y"].state).toBe(6);
    });

    it("Set at path will clone", function () {
        var state = { some: { initial: { state: 5 } }, blah: 1 };

        var next = Utils.setAtPath(_.clone(state), "some.initial.state", 6);
        expect(next.some.initial.state).toBe(6);
        expect(state.some.initial.state).toBe(5);

        var next = Utils.setAtPath(_.clone(state), "blah", 2);
        expect(next.blah).toBe(2);
        expect(state.blah).toBe(1);
    });
});
