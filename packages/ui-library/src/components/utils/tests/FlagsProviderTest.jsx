import React from "react";
import PropTypes from "prop-types";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FlagsProvider from "../FlagsProvider";

const TestConsumer = (props, { flags }) => (
    <div data-id="display">{flags.join(", ")}</div>
);

TestConsumer.contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

describe("FlagsProvider", function() {
    it("should pass down flags in context", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <FlagsProvider flags={["use-portal", "expandable-row-class"]}>
                <TestConsumer />
            </FlagsProvider>
        );

        const display = TestUtils.findRenderedDOMNodeWithDataId(component, "display");
        expect(display.textContent).toBe("use-portal, expandable-row-class");
    });

    it("should pass down flags in context to multiple children", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div>
                <FlagsProvider flags={["use-portal", "expandable-row-class"]}>
                    <TestConsumer />
                    <TestConsumer />
                </FlagsProvider>
            </div>
        );

        const display = TestUtils.scryRenderedDOMNodesWithDataId(component, "display")[1];
        expect(display.textContent).toBe("use-portal, expandable-row-class");
    });
});