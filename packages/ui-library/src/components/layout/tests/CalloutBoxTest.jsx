window.__DEV__ = true;

jest.dontMock("../CalloutBox");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CalloutBox from "../CalloutBox";

describe("CalloutBox", function () {

    function getComponent (props) {

        return ReactTestUtils.renderIntoDocument(<div><CalloutBox {...props} />></div>);
    }

    it("rendered component with content", function () {
        const component = getComponent({
            children: <div data-id="content"/>,
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "callout-box");
        const content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
    });

});