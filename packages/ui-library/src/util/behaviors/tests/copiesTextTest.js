window.__DEV__ = true;

jest.dontMock("../copiesText");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import copiesText from "../copiesText";
import CopyIcon from "./../../../components/utils/CopyIcon";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import * as clipboard from "clipboard-polyfill";
import _ from "underscore";

const SomeLink = props => <a {...props}>Hello</a>;

const EnhancedLink = copiesText(SomeLink);
EnhancedLink.defaultProps = {
    ...EnhancedLink.defaultProps,
    "data-id": "enhanced-link",
};

const delayPromise = delay => (new Promise(resolve => window.setTimeout(resolve, delay)));

describe("copiesText", function () {

    beforeEach(function () {
        clipboard.writeText = jest.fn();
        clipboard.writeText.mockReturnValue(new Promise(resolve => resolve()));

        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });
    });

    function getComponent(opts) {
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

    it("copies text", function () {
        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        expect(clipboard.writeText).not.toHaveBeenCalled();
        ReactTestUtils.Simulate.click(link);
        expect(clipboard.writeText).lastCalledWith("dummy text");
    });

    it("calls stopPropagation function with onClick", () => {
        const onClick = jest.fn(e => e.stopPropagation());
        const onOuterClick = jest.fn();

        render(
            <div onClick={onOuterClick}>
                <CopyIcon data-testid="copyIcon" onClick={onClick} />
            </div>
        );
        const copyIcon = screen.getByTestId("copyIcon");
        expect(copyIcon).toBeInTheDocument();
        userEvent.click(copyIcon);

        expect(onClick).toHaveBeenCalled();
        expect(onOuterClick).toHaveBeenCalledTimes(0);
    });

    it("changes message when succeeding", function () {
        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(link);

        // need to test asynchronously because the message is changed by a promise
        return delayPromise(0).then(() => expect(component.state.message).toBe(1));
    });

    it("changes message when failing", function () {
        clipboard.writeText.mockReturnValue(new Promise((resolve, reject) => reject()));

        let component = getComponent();

        let link = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(link);

        // need to test asynchronously because the message is changed by a promise
        return delayPromise(0).then(() => expect(component.state.message).toBe(-1));
    });

    it("resets message", function () {
        let component = getComponent();

        component.setState({ message: 1 });
        expect(component.state.message).toBe(1);

        component._resetMessage();
        expect(component.state.message).toBe(0);
    });

    it("saves current selection to state", function () {
        let component = getComponent();
        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "enhanced-link");
        component._saveSelection(element);
        expect(component.state.selection).toBe(null);

        element.selectionStart = 0;
        element.selectionEnd = 5;

        component._saveSelection(element);
        expect(component.state.selection.start).toBe(0);
        expect(component.state.selection.end).toBe(5);
    });
});
