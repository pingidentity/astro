import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import HR from "../HR";

describe("HR", function() {

    it("renders with data-id", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><HR /></div>
        );

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "hr");
        expect(element).toBeTruthy();
    });

});
