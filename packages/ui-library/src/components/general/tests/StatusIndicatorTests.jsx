import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import StatusIndicator from "../StatusIndicator";
import _ from "underscore";

// jest.dontMock("../StatusIndicator");

describe("StatusIndicator", () => {
    const componentId = "my-status-indicator";

    const getComponent = (opts = {}) => {
        opts = _.defaults(opts, {
            "data-id": componentId,
        });
        return ReactTestUtils.renderIntoDocument(<div><StatusIndicator {...opts} /></div>);
    };

    it("renders the component", () => {
        const component = getComponent({ type: StatusIndicator.Types.SUCCESS });

        expect(ReactTestUtils.isDOMComponent(component)).toBeTruthy();

        const statusIndicator = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);
        expect(statusIndicator.className).not.toContain("value-item__inline");
    });

    it("renders the success icon", () => {
        const component = getComponent({ type: StatusIndicator.Types.SUCCESS });
        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__success");
    });

    it("renders the notice icon", () => {
        const component = getComponent({ type: StatusIndicator.Types.NOTICE });
        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__notice");
    });

    it("renders the warning icon", () => {
        const component = getComponent({ type: StatusIndicator.Types.WARNING });
        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__warning");
    });

    it("renders the error icon", () => {
        const component = getComponent({ type: StatusIndicator.Types.ERROR });
        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__error");
    });

    it("renders the value if provided", () => {
        const value = "foobar";
        const component = getComponent({
            type: StatusIndicator.Types.SUCCESS,
            children: value,
        });

        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "status-indicator--icon");
        expect(icon.className).toContain("status-indicator--icon__success");

        const valueDom = TestUtils.findRenderedDOMNodeWithClass(component, "value-item__value");
        expect(valueDom.textContent).toBe(value);
    });

    it("renders as inline if provided", () => {
        const component = getComponent({
            type: StatusIndicator.Types.SUCCESS,
            inline: true,
        });

        const statusIndicator = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);
        expect(statusIndicator.className).toContain("value-item__inline");
    });

});
