jest.dontMock("../Aside");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import Aside from "../Aside";
import _ from "underscore";

describe("Aside", function () {
    function getComponent (customProps) {
        const props = _.defaults(
            customProps,
            {
                aside: <div data-id="aside-content">This is the aside content</div>,
                children: "Main content"
            }
        );

        return ReactTestUtils.renderIntoDocument(<div><Aside {...props}>{props.children}</Aside></div>);
    }

    it("renders with default data-id", function () {
        const component = getComponent({});

        expect(TestUtils.checkForDataIds(component, ["aside", "aside-content"])).toEqual(true);
    });
});
