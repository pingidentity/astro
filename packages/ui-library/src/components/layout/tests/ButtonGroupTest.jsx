window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import ButtonGroup from "../ButtonGroup";

describe("ButtonGroup", function () {

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(<div><ButtonGroup {...props} /></div>);
    }

    it("renders component with default data-id", function () {
        const component = getComponent();

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "button-group");
        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders cancel link and fires oncancel callback", function() {
        const callback = jest.fn();
        const component = getComponent({ onCancel: callback });
        const cancel = TestUtils.findRenderedDOMNodeWithDataId(component, "button-group-cancel");

        expect(cancel).toBeTruthy();
        expect(callback).not.toHaveBeenCalled();
        ReactTestUtils.Simulate.click(cancel);
        expect(callback).toHaveBeenCalled();
    });

});