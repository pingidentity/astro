window.__DEV__ = true;

jest.dontMock("../ReduxUtils");
jest.dontMock("../ReduxTestUtils");

describe("ReduxUtils", function () {
    var Utils = require("../ReduxUtils"),
        TestUtils = require("../ReduxTestUtils"),
        _ = require("underscore");

    it("set non-existant path", function () {
        var state = { some: {} };
        Utils.setAtPath(state, "some.path.to.mine", 1);

        expect(state).toEqual({ dirty: true, some: { path: { to: { mine: 1 } } } });
    });

    it("commit and rollback", function () {
        var state = { some: { state: 1, blah: 2 }, dirty: true };

        //verify that the dirty bit is reset
        Utils.commit(state);
        expect(state.dirty).toBe(false);

        //add some prop that didnt exist at the time of commit
        state.some.other = 3;

        Utils.rollback(state);
        expect(_.omit(state, "snapshot")).toEqual({ some: { state: 1, blah: 2, other: 3 }, dirty: false });
    });

    it("creates a mock dispatcher", function () {
        var reducer = jest.genMockFunction().mockReturnValue({ blah: "blah" });
        var obj = { state: { some: { state: 1, blah: 2 } } };
        var dispatch = TestUtils.createTestDispatcher(reducer, obj);

        dispatch({ type: "mytype" });

        expect(reducer).toBeCalled();
        expect(obj.state).toEqual(reducer());
    });
});
