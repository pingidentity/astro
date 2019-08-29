jest.dontMock("../v2");

import { allFlags } from "../../../../util/FlagUtils";
import StateContainer from "../../../utils/StateContainer";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";

describe("Toggle v4", function () {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const _ = require("underscore");
    const TestUtils = require("../../../../testutil/TestUtils");
    const Utils = require("../../../../util/Utils");
    const Toggle = require("../v2");

    function getComponent (p) {
        const props = _.defaults(p || {}, {
            stateless: true,
            onToggle: jest.fn(),
            flags: allFlags,
        });

        return ReactTestUtils.renderIntoDocument(<Toggle {...props} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(<Toggle flags={allFlags} />);
    });

    it("stateless: renders the component with default data-id", function () {
        const component = getComponent();

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "toggle")).toBeTruthy();
    });

    it("progressively stateless: renders the component with default data-id", function () {
        const component = getComponent({
            flags: ["p-stateful"]
        });

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "toggle")).toBeTruthy();
    });

    it("stateful: renders the component with default data-id", function () {
        const component = getComponent({ stateless: false });

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "toggle")).toBeTruthy();
    });

    it("stateless: renders additional CSS classes from className prop", function () {
        const component = getComponent({ className: "someClass" }),
            toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle"),
            toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "someClass")).toBe(true);
    });

    it("stateless: defaults to toggled false", function () {
        const component = getComponent();
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");
        const toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(false);
    });

    it("stateful: defaluts to toggled false", function () {
        const component = getComponent({ stateless: false });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");
        const toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(false);
    });

    it("stateless: accepts default toggled state", function () {
        const component = getComponent({ toggled: true });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");
        const toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(true);
    });

    it("stateful: accepts default toggled state", function () {
        const component = getComponent({
            stateless: false,
            toggled: true
        });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");
        const toggleCSS = toggle.className.split(" ");

        expect(_.contains(toggleCSS, "selected")).toBe(true);
    });

    it("stateless: triggers onToggle callback when clicked", function () {
        const component = getComponent();
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        ReactTestUtils.Simulate.click(toggle);

        expect(component.props.onToggle).toBeCalled();
    });

    it("does not error with default onToggle function", function () {
        const component = ReactTestUtils.renderIntoDocument(<Toggle />);
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        ReactTestUtils.Simulate.click(toggle);

        expect(component).toBeTruthy();
    });

    it("stateful: _handleToggle callback changes toggled state when clicked", function () {
        const component = getComponent({ stateless: false });
        const componentRef = ReactTestUtils.findRenderedComponentWithType(component, StateContainer);
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        expect(componentRef.state.toggled).toBe(false);

        ReactTestUtils.Simulate.click(toggle);

        expect(componentRef.state.toggled).toBe(true);
    });

    it("stateless: does not trigger onToggle callback when disabled", function () {
        const component = getComponent({ disabled: true, "data-id": "toggle" });
        const toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "toggle");

        ReactTestUtils.Simulate.click(toggle);

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });
});
