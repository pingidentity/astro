import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../../testutil/TestUtils";
import _ from "underscore";
import PlaceHolderCard from "../PlaceHolderCard";

describe("PlaceHolderCard", function () {

    const componentId = "placeholder-card";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<div><PlaceHolderCard {...opts} /></div>);
    }

    it("rendered component with data-id=placeholder-card", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a label", function () {
        const component = getComponent({
            label: "foo"
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "placeholder-card");

        expect(element).toBeTruthy();
    });

    it("renders a a svg", function() {
        const component = getComponent({});
        const icon = TestUtils.findRenderedDOMNodeWithDataId(component, "placeholder-card-icon");

        expect(icon).toBeDefined();
    });
});