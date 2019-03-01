import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import Stack from "../Stack";
import _ from "underscore";

describe("Stack", function () {
    function getComponent (customProps) {
        const props = _.defaults(
            customProps,
            {
                aside: <div data-id="aside-content">This is the aside content</div>,
                children: "Main content"
            }
        );

        return ReactTestUtils.renderIntoDocument(
            <div>
                <Stack {...props}>
                    <div>Stack</div>
                    <div>With</div>
                    <div>Gap</div>
                </Stack>
            </div>
        );
    }

    it("renders with default data-id", function () {
        const component = getComponent({});

        expect(TestUtils.checkForDataIds(component, ["stack"])).toEqual(true);
    });

    it("renders with a gap class", function () {
        const component = getComponent({ gap: "LG" });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "stack--lg");

        expect(element).toBeTruthy();
    });
});
