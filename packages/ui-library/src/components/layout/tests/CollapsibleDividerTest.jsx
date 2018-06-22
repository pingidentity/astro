jest.dontMock("../Aside");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CollapsibleDivider from "../CollapsibleDivider";
import _ from "underscore";

describe("CollapsibleDivider", function () {
    function getComponent (customProps) {
        const props = _.defaults(
            customProps,
            {
                title: "A Divider",
            }
        );

        return ReactTestUtils.renderIntoDocument(
            <div><CollapsibleDivider {...props} /></div>
        );
    }

    it("renders with default data-id", function () {
        const component = getComponent({});

        expect(TestUtils.checkForDataIds(component, ["collapsible-divider", "collapsible-link"])).toEqual(true);
    });

});
