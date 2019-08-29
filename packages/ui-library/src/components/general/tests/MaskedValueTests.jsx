jest.dontMock("../Link");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

describe("Masked Value", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        MaskedValue = require("../MaskedValue");

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <MaskedValue />
        );
    });

    it("renders with a string and toggles", function() {
        var component = ReactTestUtils.renderIntoDocument(<MaskedValue>A value</MaskedValue>);

        const toggler = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");
        ReactTestUtils.Simulate.click(toggler);
        expect(component.state.maskValue).toBe(false);

        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("renders with a node", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <MaskedValue>
                <p>yes</p>
            </MaskedValue>
        );
        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("renders with multiple nodes", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <MaskedValue>
                <p>yes</p>
                <p>no</p>
            </MaskedValue>
        );
        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("triggers the right toggle callback", function() {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <div>
                <MaskedValue onToggleReveal={callback} maskValue={true} />
            </div>
        );

        const toggler = TestUtils.findRenderedDOMNodeWithDataId(component, "reveal");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(toggler);
        expect(callback).toBeCalled();
    });
});
