window.__DEV__ = true;

jest.dontMock("../CopyField");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import CopyField from "../CopyField";
import _ from "underscore";

describe("CopyField", function () {

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            text: "dummy text",
        });

        return ReactTestUtils.renderIntoDocument(<CopyField {...opts} />);
    }

    it("rendered component with data-id=copy-field", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, "copy-field");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


});