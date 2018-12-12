jest.dontMock("../PolicyNode");

describe("PolicyNode", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        PolicyNode = require("../PolicyNode");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            label: "The Node",
            children: <div>Here is what's in the node</div>
        });
        return ReactTestUtils.renderIntoDocument(<div><PolicyNode {...opts}>{opts.children}</PolicyNode></div>);
    }

    it("renders with default data-id", function () {
        const component = getComponent({});

        const policyNode = TestUtils.findRenderedDOMNodeWithDataId(component, "policy-node");
        expect(policyNode).toBeTruthy();
    });

    it("renders an icon and an arrow", function () {
        const component = getComponent({ iconName: "cog-filled", gutter: "arrow" });

        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "policy-node__icon");
        expect(icon).toBeTruthy();

        const arrow = TestUtils.findRenderedDOMNodeWithClass(component, "policy-node__gutter-arrow");
        expect(arrow).toBeTruthy();
    });

    it("renders a number and an edit button, which responds to callback", function () {
        const callback = jest.fn();

        const component = getComponent({ number: 4, onEdit: callback });

        const number = TestUtils.findRenderedDOMNodeWithClass(component, "policy-node__number");
        expect(number).toBeTruthy();

        const edit = TestUtils.findRenderedDOMNodeWithClass(component, "policy-node__edit");
        expect(edit).toBeTruthy();

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(edit);
        expect(callback).toBeCalled();
    });

    it("renders a character", function () {
        const component = getComponent({ character: "?" });

        const character = TestUtils.findRenderedDOMNodeWithClass(component, "policy-node__character");
        expect(character).toBeTruthy();
    });
});