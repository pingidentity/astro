window.__DEV__ = true;

jest.dontMock("../Arrow.jsx");
jest.dontMock("../../../../util/format.js");

describe("IntroTutorial", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Arrow = require("../Arrow.jsx");

    beforeEach(function () {
    });

    function getComponent (targetBounds, windowBounds) {
        var win = {
            getBoundingClientRect: jest.genMockFunction().mockReturnValue(windowBounds)
        };
        var target = {
            getBoundingClientRect: jest.genMockFunction().mockReturnValue({
                left: targetBounds.left,
                top: targetBounds.top,
                width: targetBounds.width,
                height: targetBounds.height,
                right: targetBounds.left + targetBounds.width,
                bottom: targetBounds.top + targetBounds.height
            })
        };

        return ReactTestUtils.renderIntoDocument(<Arrow to={target} from={win} />);
    }

    it("componentWillReceiveProps called on first render", function () {
        var originalFn = Arrow.prototype.componentWillReceiveProps;
        Arrow.prototype.componentWillReceiveProps = jest.genMockFunction();

        var component = getComponent(
            { top: 100, left: 490, width: 100, height: 200 },
            { width: 1000, height: 1000 });

        expect(component.componentWillReceiveProps.mock.calls.length).toBe(1);

        Arrow.prototype.componentWillReceiveProps = originalFn;
    });

    it("Points to end of target when too vertical", function () {
        var component = getComponent(
            { top: 100, left: 490, width: 100, height: 200 },
            { width: 1000, height: 1000 });

        expect(component.state.command).toBe("M500,500 S560,500 560,320");
    });

    it("Points to the start of the target when appropriate", function () {
        var component = getComponent(
            { top: 100, left: 340, width: 300, height: 200 },
            { width: 1000, height: 1000 });

        expect(component.state.command).toBe("M500,500 S370,500 370,320");
    });

    it("Computes the correct svg path on first render", function () {
        var component = getComponent(
            { top: 100, left: 100, width: 500, height: 200 },
            { width: 1000, height: 1000 });


        expect(component.state.command).toBe("M500,500 S350,500 350,320");
    });

    it("Loops away when target Y is too close to center", function () {
        var component = getComponent(
            { top: 400, left: 340, width: 300, height: 200 },
            { width: 1000, height: 1000 });

        expect(component.state.command).toBe("M500,500 C500,900 370,900 370,620");
    });
});

