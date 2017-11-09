window.__DEV__ = true;

jest.dontMock("../InlineMessage.jsx");
jest.dontMock("../If.jsx");
jest.dontMock("../ColorPicker.jsx");

describe("InlineMessage", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        InlineMessage = require("../InlineMessage.jsx"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    function getComponent (props, message) {
        props = _.defaults(props || { }, { });

        return ReactTestUtils.renderIntoDocument(<InlineMessage { ...props }>{ message }</InlineMessage>);
    }

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
        var onClick = jest.genMockFunction();
        var view = getComponent({ "data-id": "notice-message-button",
                                  type: InlineMessage.MessageTypes.NOTICE,
                                  label: label, onClick: onClick }, text);
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
        var onClick = jest.genMockFunction();
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

    it("throws error when deprecated prop 'callback' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("callback", "onClick"));

        expect(function () {
            getComponent({ callback: jest.genMockFunction() });
        }).toThrow(expectedError);
    });

});
