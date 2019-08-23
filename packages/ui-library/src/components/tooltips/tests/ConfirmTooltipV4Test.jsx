window.__DEV__ = true;

jest.dontMock("../ConfirmTooltip");
jest.dontMock("../DetailsTooltip");
jest.dontMock("../../buttons/Button");
jest.mock("popper.js");
jest.mock("react-portal");

import { allFlags } from "../../../util/FlagUtils";

describe("ConfirmTooltip", function () {
    let React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ConfirmTooltip= require("../ConfirmTooltip"),
        _ = require("underscore");

    let componentId = "confirm-tooltip";


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            flags: allFlags,
        });

        return ReactTestUtils.renderIntoDocument(<ConfirmTooltip {...opts} />);
    }

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <ConfirmTooltip
                flags={allFlags}
            />
        );
    });

    it("rendered component with data-id=-confirm-tooltip", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders the delete button with a click callback", function () {
        let onConfirm = jest.fn();
        let component = getComponent({
            onConfirm: onConfirm,
            open: true
        });

        let button = TestUtils.findRenderedDOMNodeWithDataId(component, "confirm-tooltip-button");

        expect(onConfirm).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onConfirm).toBeCalled();
    });

    it("renders the button and clicks cancel button", function () {
        let onCancel = jest.fn();
        let component = getComponent({
            onCancel: onCancel,
            open: true
        });

        let button = TestUtils.findRenderedDOMNodeWithDataId(component, "confirm-tooltip-cancel");

        expect(onCancel).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onCancel).toBeCalled();
    });

    it("fires onConfirm and onToggle when closeOnConfirm is true", function () {
        const confirmCallback = jest.fn();
        const toggleCallback = jest.fn();
        const component = getComponent({
            onConfirm: confirmCallback,
            onToggle: toggleCallback,
            closeOnConfirm: true,
            open: true
        });

        const button = TestUtils.findRenderedDOMNodeWithDataId(component, "confirm-tooltip-button");

        expect(confirmCallback).not.toBeCalled();
        expect(toggleCallback).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(confirmCallback).toBeCalled();
        expect(toggleCallback).toBeCalled();
    });

});