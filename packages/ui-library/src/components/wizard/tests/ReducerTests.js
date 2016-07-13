window.__DEV__ = true;

jest.dontMock("../WizardReducer.js");
jest.dontMock("../WizardActions.js");

describe("Step", function () {
    var Reducer = require("../WizardReducer.js"),
        Actions = require("../WizardActions.js"),
        initialState = Reducer(null, {}),
        _ = require("underscore");

    it("Processes next", function () {
        var next = Reducer(initialState, Actions.next());

        expect(next.activeStep).toEqual(2);
    });

    it("with id: processes next", function () {
        var next = Reducer(initialState, Actions.reset("blah"));
        next = Reducer(next, Actions.next("blah"));

        expect(next.activeStep).toEqual(1);
        expect(next["blah"].activeStep).toEqual(2);
    });

    it("Processes edit", function () {
        var initState = {
            activeStep: 5,
            numSteps: 10,
            choices: [1,1,1,1,1,1,1,1,1,1]
        };
        var next = Reducer(initState, Actions.edit(1));

        expect(next).toEqual({
            activeStep: 1,
            numSteps: 10,
            choices: [1]
        });
    });

    it("with id: processes edit", function () {
        var initState = {
            blah: {
                activeStep: 5,
                numSteps: 10,
                choices: [1,1,1,1,1,1,1,1,1,1]
            }
        };
        var next = Reducer(initState, Actions.edit("blah", 1));

        expect(next.blah).toEqual({
            activeStep: 1,
            numSteps: 10,
            choices: [1]
        });
    });

    it("Processes reset", function () {
        var initState = {
            activeStep: 5,
            numSteps: 10,
            choices: [1,1,1,1,1,1,1,1,1,1]
        };
        var next = Reducer(initState, Actions.reset());

        expect(next).toEqual({
            choices: [],
            activeStep: 1,
            numSteps: 10
        });
    });

    it("Processes default action", function () {
        var next = Reducer(_.clone(initialState), { type: "123" });
        expect(next).toEqual(initialState);
    });

    it("with id: Processes choose", function () {
        var next = Reducer(initialState, Actions.reset("blah"));
        next = Reducer(next, Actions.pick({ id: "blah", choice: 5, numSteps: 6 }));

        expect(next.blah).toEqual({
            activeStep: 1,
            numSteps: 6,
            choices: [5]
        });
    });

    it("Processes choose", function () {
        var next = Reducer(initialState, Actions.pick({ choice: 5, numSteps: 6 }));

        expect(next).toEqual({
            activeStep: 1,
            numSteps: 6,
            choices: [5]
        });
    });

    it("with id: Processes choose - legacy", function () {
        var next = Reducer(initialState, Actions.reset("blah"));
        next = Reducer(next, Actions.choose("blah", 5, 6));

        expect(next.blah).toEqual({
            activeStep: 1,
            numSteps: 6,
            choices: [5]
        });
    });

    it("Processes choose - legacy", function () {
        var next = Reducer(initialState, Actions.choose(5, 6));

        expect(next).toEqual({
            activeStep: 1,
            numSteps: 6,
            choices: [5]
        });
    });
});
