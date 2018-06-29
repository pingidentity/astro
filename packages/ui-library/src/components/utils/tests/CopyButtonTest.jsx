window.__DEV__ = true;

jest.dontMock("../CopyButton");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CopyButton from "../CopyButton";
import _ from "underscore";

describe("CopyButton", function () {

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            text: "dummy text",
        });

        return ReactTestUtils.renderIntoDocument(<CopyButton {...opts} />);
    }

    it("rendered component with data-id=copy-button", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "copy-button");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


});