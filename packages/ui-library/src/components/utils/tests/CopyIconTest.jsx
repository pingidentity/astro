window.__DEV__ = true;

jest.dontMock("../CopyIcon");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CopyIcon from "../CopyIcon";
import _ from "underscore";

describe("CopyIcon", function () {

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            text: "dummy text",
        });

        return ReactTestUtils.renderIntoDocument(<CopyIcon {...opts} />);
    }

    it("rendered component with data-id=copy-button", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "copy-icon");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


});