window.__DEV__ = true;

jest.dontMock("../ConfirmTooltip");
jest.dontMock("../DetailsTooltip");
jest.dontMock("../../buttons/Button");

describe("ConfirmTooltip", function () {
    let React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ConfirmTooltip= require("../ConfirmTooltip"),
        _ = require("underscore");

    let componentId = "confirm-tooltip";


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<ConfirmTooltip {...opts} />);
    }

    it("rendered component with data-id=-confirm-tooltip", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders the delete button with a click callback", function () {
        let onConfirm = jest.genMockFunction();
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
        let onCancel = jest.genMockFunction();
        let component = getComponent({
            onCancel: onCancel,
            open: true
        });

        let button = TestUtils.findRenderedDOMNodeWithDataId(component, "confirm-tooltip-cancel");

        expect(onCancel).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(onCancel).toBeCalled();
    });

});