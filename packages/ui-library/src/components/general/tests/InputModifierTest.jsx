import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import InputModifier, { inputColors } from "../InputModifier";

describe("InputModifier", function() {

    it("renders with a class", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><InputModifier inputColor={inputColors.LIGHT} /></div>
        );

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "modifier_light-inputs");
        expect(element).toBeTruthy();
    });

});
