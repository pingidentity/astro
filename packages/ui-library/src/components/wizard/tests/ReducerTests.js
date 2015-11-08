window.__DEV__ = true;

jest.dontMock("../Reducer.js");
jest.dontMock("../Actions.js");
jest.dontMock("object-assign");

describe("Step", function () {
    var Reducer = require("../Reducer.js"),
        Actions = require("../Actions.js"),
        assign = require("object-assign");

    it("Processes next", function () {
        var initState = Reducer(null, "init");
        var nextState = Reducer(initState, Actions.next());

        expect(nextState).toEqual(assign(initState, { activeStep: 2 }));
    });

    it("Processes edit", function () {
        var initState = {
            activeStep: 5,
            numSteps: 10,
            choices: [1,1,1,1,1,1,1,1,1,1]
        };
        var nextState = Reducer(initState, Actions.edit(1));

        expect(nextState).toEqual({
            activeStep: 1,
            numSteps: 10,
            choices: [1]
        });
    });

    it("Processes choose", function () {
        var initState = {
            activeStep: 3,
            numSteps: 10,
            choices: [1,1]
        };
        var nextState = Reducer(initState, Actions.choose(3, 9));

        expect(nextState).toEqual({
            activeStep: 3,
            numSteps: 9,
            choices: [1, 1, 3]
        });
    });
});
