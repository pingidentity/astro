window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import TestUtils from "../../../testutil/TestUtils";
import ButtonGroup from "../ButtonGroup";

describe("ButtonGroup", function () {

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(<div><ButtonGroup {...props} /></div>);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ButtonGroup
                onCancel={jest.fn()}
            />
        );
    });

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