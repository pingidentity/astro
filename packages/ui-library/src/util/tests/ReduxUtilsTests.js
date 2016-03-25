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

    it("Doesnt set dirty bit if option is specified", function () {
        var state = { some: { initial: { state: 5 } }, blah: 1 };
        var next = Utils.setAtPath(_.clone(state), ["blah"], 5, { setDirty: false });

        expect(next).toEqual({ some: { initial: { state: 5 } }, blah: 5 });
    });

    it("Will unset at path", function () {
        var state = { some: { initial: { state: 5 } }, blah: 1 };
        var next = Utils.setAtPath(_.clone(state), ["blah"], undefined);

        expect(next).toEqual({ dirty: true, some: { initial: { state: 5 } } });
    });

    it("will log warning on attempt to update primitive type", function () {
        console.warn = jest.genMockFunction();

        var state = { some: { initial: { state: 5 } }, blah: 1 };

        Utils.setAtPath(_.clone(state), "some.initial.state.opt", 6);

        expect(console.warn).toBeCalledWith("trying to set sub-state on non-object");
    });

    it("rollback to snapshot", function () {
        var state = {
            a: 2,
            b: 3,
            dirty: true,

            snapshot: {
                a: 1,
                b: 2
            }
        };

        Utils.rollback(state);

        expect(state.dirty).toBeFalsy();
        expect(state.a).toEqual(1);
        expect(state.b).toEqual(2);
    });

    it("commit changes", function () {
        var state = {
            a: 2,
            b: 3,
            dirty: true,

            snapshot: {
                a: 1,
                b: 2
            }
        };

        Utils.commit(state);

        expect(state.dirty).toBeFalsy();
        expect(state.a).toEqual(2);
        expect(state.b).toEqual(3);
        expect(state.snapshot.a).toEqual(2);
        expect(state.snapshot.b).toEqual(3);
    });
});
