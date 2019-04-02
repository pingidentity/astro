window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../Messages");
jest.dontMock("../MessagesConstants.js");

import { MessageTypes } from "../MessagesConstants";

describe("Messages", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../../../../util/Utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Messages = require("../index.js"),

        _ = require("underscore");

    beforeEach(function () {
        jest.useFakeTimers();
    });

    function getComponent (props) {
        props = _.defaults(props || {}, {
            messages: [{
                text: "Test message text",
                type: MessageTypes.SUCCESS,
            }],
            onRemoveMessage: jest.fn()
        });

        return ReactTestUtils.renderIntoDocument(<Messages {...props} />);
    }

    it("Render empty messages", function () {
        var component = getComponent({ messages: null });
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(0);
    });

    it("Render single message", function () {
        var component = getComponent();
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(messages[0].textContent).toEqual("Test message text");
    });

    it("Render multiple messages", function () {
        var component = getComponent({
            messages: [
                { text: "Test message text" },
                { text: "Test message 2" },
                { text: "Test message 3" }
            ]
        });

        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");
        expect(messages.length).toEqual(3);
    });

    it("Close message", function () {
        var component = getComponent();
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");
        var closeLink = TestUtils.findRenderedDOMNodeWithClass(messages[0], "close");

        ReactTestUtils.Simulate.click(closeLink);

        expect(component.props.onRemoveMessage).toBeCalledWith(0);
    });

    it("Render single message with default i18n function", function () {
        var component = getComponent();
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(messages[0].textContent).toEqual("Test message text");
    });

    it("Render single message with custom interval", function () {
        var component = getComponent({
            messages: [{ key: "Test message text", duration: 3000 }]
        });
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(global.setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    });

    it("Test unmount clears timers", function () {
        var component = getComponent({
            messages: [{ key: "Test message text", duration: 5000 }]
        });

        expect(clearInterval.mock.calls.length).toBe(0);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(clearInterval.mock.calls.length).toBe(1);
    });

    it("Test unmount with no timer", function () {
        var component = getComponent({
            messages: [{ key: "Test message text" }]
        });

        expect(clearInterval.mock.calls.length).toBe(0);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(clearInterval.mock.calls.length).toBe(0);
    });

    it("Render an html message", function () {
        const htmlMessage = <span>Test message text <button>html</button></span>;
        const component = getComponent({
            messages: [{ text: htmlMessage }]
        });

        const messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);

        expect(messages[0].childNodes[0].childNodes[0].textContent).toBe("Test message text html");
    });

    it("Renders progress bar", function () {
        const component = getComponent({
            messages: [{ text: "Test message text", progress: { text: "uploading" } }]
        });

        const messages = TestUtils.findRenderedDOMNodeWithDataId(component, "messages");
        const progress = TestUtils.findRenderedDOMNodeWithDataId(messages, "messages-message-0-progress");

        expect(progress).toBeDefined();
        expect(progress).not.toBe(null);
    });

    it("Renders icon", function () {
        const component = getComponent({
            messages: [{ text: "Test message text", iconName: "success" }]
        });

        const messages = TestUtils.findRenderedDOMNodeWithDataId(component, "messages");
        const icon = TestUtils.findRenderedDOMNodeWithClass(messages, "message__icon");

        expect(icon).toBeTruthy();
    });

    it("Renders 100% progress bar", function () {
        const component = getComponent({
            messages: [{ text: "Test message text", progress: { percent: 100 } }]
        });

        const messages = TestUtils.findRenderedDOMNodeWithDataId(component, "messages");
        const progress = TestUtils.findRenderedDOMNodeWithDataId(messages, "messages-message-0-progress");

        expect(progress).toBeDefined();
        expect(progress).not.toBe(null);
    });

    it("Renders progress bar with text template", function () {
        const component = getComponent({
            messages: [{
                text: "Test message text",
                progress: {
                    percent: 37,
                    textTemplate: percent => percent + " per cent"
                }
            }]
        });

        const progressText = TestUtils.findRenderedDOMNodeWithDataId(component, "messages-message-0-progress-text");

        expect(progressText.textContent).toBe("37 per cent");
    });

    it("Component has the class page-messages", function () {
        var component = getComponent();
        var node = ReactDOM.findDOMNode(component);

        expect(node.getAttribute("class")).toBe("page-messages");
    });

    it("Component has the class page-messages and full", function () {
        var component = getComponent({ containerType: Messages.ContainerTypes.FULL });
        var node = ReactDOM.findDOMNode(component);

        expect(node.getAttribute("class")).toBe("page-messages full");
    });

    it("render component with data-id", function () {
        var component = getComponent(
            { "data-id": "messagesWithDataId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "messagesWithDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = getComponent();

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "messages");

        expect(element).toBeDefined();
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'removeMessage' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("removeMessage", "onRemoveMessage"));

        expect(function () {
            getComponent({ removeMessage: jest.fn() });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'i18n' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("i18n", "onI18n"));

        expect(function () {
            getComponent({ i18n: jest.fn() });
        }).toThrow(expectedError);
    });

    const warningMessage = [
        {
            message: "Warrrrrning",
            type: MessageTypes.WARNING,
        }
    ];

    it("shows Cannonball warning when using WARNING type without the flag", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toHaveBeenCalled();
        getComponent({ messages: warningMessage });
        expect(console.warn).toHaveBeenCalled();
    });

    it("doesn't show Cannonball warning if you use the flag", function() {
        console.warn = jest.fn();

        getComponent({ messages: warningMessage, flags: [ "fixed-messages-constants" ] });
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("doesn't show Cannonball warning normally", function() {
        console.warn = jest.fn();

        getComponent();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("changes the warning class if the flag is set", function() {
        const component = getComponent({ messages: warningMessage, flags: [ "fixed-messages-constants" ] });
        const message = TestUtils.findRenderedDOMNodeWithClass(component, "notice");
        expect(message).toBeTruthy();
    });

    it("doesn't change the warning class if the flag is not set", function() {
        const component = getComponent({ messages: warningMessage });
        const message = TestUtils.findRenderedDOMNodeWithClass(component, "warning");
        expect(message).toBeTruthy();
    });

});
