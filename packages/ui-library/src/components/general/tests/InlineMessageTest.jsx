window.__DEV__ = true;

jest.dontMock("../InlineMessage");
jest.dontMock("../If");
jest.dontMock("../ColorPicker");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

describe("InlineMessage", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        InlineMessage = require("../InlineMessage"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    function getComponent (props, message) {
        props = _.defaults(props || { }, { });

        return ReactTestUtils.renderIntoDocument(<InlineMessage { ...props }>{ message }</InlineMessage>);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <InlineMessage
                label="A very, very important message"
                onClick={jest.fn()}
            />
        );
    });

    it("display simple inline message with no button", function () {
        var text = "Your message here";
        var view = getComponent({ "data-id": "notice-message-no-button",
            type: InlineMessage.MessageTypes.NOTICE }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-no-button");
        var message = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-text");
        var actionContainer = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-btn");

        expect(container.getAttribute("class")).toContain("notice");
        expect(message.textContent).toEqual(text);
        expect(actionContainer).toBeFalsy();
    });

    it("display simple inline message with button", function () {
        var text = "Your message here";
        var label = "Do Something";
        var onClick = jest.fn();
        var view = getComponent({ "data-id": "notice-message-button",
            primaryButton: { label: label },
            type: InlineMessage.MessageTypes.NOTICE,
            label: text, onClick: onClick });
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-button");
        var actionContainer = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-btn");
        var buttonElement = TestUtils.findRenderedDOMNodeWithTag(actionContainer, "button");

        expect(buttonElement.textContent).toEqual(label);
        ReactTestUtils.Simulate.click(buttonElement);

        expect(view.props.onClick).toBeCalled();
    });

    it("display simple inline message with button text, but no action", function () {
        var text = "Your message here";
        var label = "Do Something" ;
        var view = getComponent({ "data-id": "notice-message-button",
            type: InlineMessage.MessageTypes.NOTICE,
            label: label }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-button");
        var actionContainer = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-btn");
        expect(actionContainer).toBeFalsy();
    });

    it("display simple inline message with action, but no button text", function () {
        var text = "Your message here";
        var onClick = jest.fn();
        var view = getComponent({ "data-id": "notice-message-button",
            type: InlineMessage.MessageTypes.NOTICE,
            onClick: onClick }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-button");
        var actionContainer = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-btn");
        expect(actionContainer).toBeFalsy();
    });

    it("display simple inline message with markup", function () {
        var props = { "data-id": "notice-message-button", type: InlineMessage.MessageTypes.NOTICE };
        var view = ReactTestUtils.renderIntoDocument(
            <InlineMessage {...props}>
                <span data-id="message">message with markup</span>
            </InlineMessage>
        );

        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-button");
        var message = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-text");
        var messageBody = TestUtils.findRenderedDOMNodeWithDataId(message, "message");
        expect(messageBody).toBeTruthy();
    });

    it("display simple inline success message", function () {
        var text = "Message text";
        var view = getComponent({ "data-id": "notice-message-no-button",
            type: InlineMessage.MessageTypes.SUCCESS }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-no-button");
        var message = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-text");

        expect(container.getAttribute("class")).toContain("success");
        expect(message.textContent).toEqual(text);
    });

    it("display simple inline error message", function () {
        var text = "Message text";
        var view = getComponent({ "data-id": "notice-message-no-button",
            type: InlineMessage.MessageTypes.ERROR }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-no-button");
        var message = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-text");

        expect(container.getAttribute("class")).toContain("error");
        expect(message.textContent).toEqual(text);
    });

    it("display simple inline error message", function () {
        var text = "Message text";
        var view = getComponent({ "data-id": "notice-message-no-button",
            type: InlineMessage.MessageTypes.ERROR }, text);
        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "notice-message-no-button");
        var message = TestUtils.findRenderedDOMNodeWithDataId(container, "inline-message-text");

        expect(container.getAttribute("class")).toContain("error");
        expect(message.textContent).toEqual(text);
    });

    it("displays a borderless message", function () {
        const text = "Message text";
        const view = getComponent({ "data-id": "message-no-border", bordered: false }, text);

        const component = TestUtils.findRenderedDOMNodeWithClass(view, "inline-message--borderless");

        expect(component).toBeTruthy();
    });

    it("displays a full width message", function () {
        const text = "Message text";
        const view = getComponent({ "data-id": "message-fullwidth", fullwidth: true }, text);

        const component = TestUtils.findRenderedDOMNodeWithClass(view, "inline-message--fullwidth");

        expect(component).toBeTruthy();
    });

    it("displays with no margins", function () {
        const text = "Message text";
        const view = getComponent({ "data-id": "message-nomargin", noMargin: true }, text);

        const component = TestUtils.findRenderedDOMNodeWithClass(view, "inline-message--nomargin");

        expect(component).toBeTruthy();
    });


    it("throws error when deprecated prop 'callback' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("callback", "onClick"));

        expect(function () {
            getComponent({ callback: jest.fn() });
        }).toThrow(expectedError);
    });
});
