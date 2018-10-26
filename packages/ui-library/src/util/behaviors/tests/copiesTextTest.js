window.__DEV__ = true;

jest.dontMock("../copiesText");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import copiesText from "../copiesText";
import clipboard from "clipboard-polyfill";
import _ from "underscore";

const SomeLink = props => <a {...props}>Hello</a>;

const EnhancedLink = copiesText(SomeLink);
EnhancedLink.defaultProps = {
    ...EnhancedLink.defaultProps,
    "data-id": "enhanced-link",
};

const delayPromise = delay => (new Promise(resolve => window.setTimeout(resolve, delay)));

describe("copiesText", function () {

    beforeEach(function() {
        clipboard.writeText = jest.genMockFn();
        clipboard.writeText.mockReturnValue(new Promise(resolve => resolve()));

        global.getSelection = jest.genMockFn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });
    });

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            text: "dummy text",
        });

        return ReactTestUtils.renderIntoDocument(<EnhancedLink {...opts} />);
    }

    it("rendered component with data-id=enhanced-link", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "enhanced-link");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("rendered component with custom messages", function () {
        let component = getComponent({
            strings: {
                "prompt": "Copy \"More copied text\"",
                "success": "You did it",
                "failure": "It didn't work",
            }
        });

        expect(component._hintMessage()).toBe("Copy \"More copied text\"");
        component.setState({ message: 1 });
        expect(component._hintMessage()).toBe("You did it");
        component.setState({ message: -1 });
        expect(component._hintMessage()).toBe("It didn't work");
    });

    it("copies text", function() {
        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(clipboard.writeText).not.toHaveBeenCalled();
        ReactTestUtils.Simulate.click(link);
        expect(clipboard.writeText).lastCalledWith("dummy text");
    });

    it("doesn't copy text if something else is selected", function() {
        global.getSelection.mockReturnValue({
            toString: () => "selection",
        });

        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(link);
        expect(clipboard.writeText).not.toHaveBeenCalled();
    });

    it("changes message when succeeding", function() {
        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(link);

        // need to test asynchronously because the message is changed by a promise
        return delayPromise(0).then(() => expect(component.state.message).toBe(1));
    });

    it("changes message when failing", function() {
        clipboard.writeText.mockReturnValue(new Promise((resolve, reject) => reject()));

        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(link);

        // need to test asynchronously because the message is changed by a promise
        return delayPromise(0).then(() => expect(component.state.message).toBe(-1));
    });

    it("resets message", function() {
        let component = getComponent();

        component.setState({ message: 1 });
        expect(component.state.message).toBe(1);

        component._resetMessage();
        expect(component.state.message).toBe(0);
    });

});