window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../Reducer.js");
jest.dontMock("../Actions.js");

describe("IntroTutorial Reducer", function () {
    var IntroTutorial = require("../index.js");

    beforeEach(function () {
    });

    it("next", function () {
        var state = IntroTutorial.Reducer(null, "init");
        var next = IntroTutorial.Reducer(state, IntroTutorial.Actions.next());

        expect(next.active).toBe(state.active + 1);
    });

    it("prev", function () {
        var state = IntroTutorial.Reducer(null, "init");
        var next = IntroTutorial.Reducer(state, IntroTutorial.Actions.prev());

        expect(next.active).toBe(state.active - 1);
    });

    it("dimiss", function () {
        var state = IntroTutorial.Reducer(null, "init");
        var next = IntroTutorial.Reducer(state, IntroTutorial.Actions.dismiss());

        expect(next.visible).toBe(false);
    });
});

