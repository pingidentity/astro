window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../Messages");
jest.dontMock("../MessagesConstants.js");

import { MessageTypes } from "../MessagesConstants";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import Messages from "../index.js";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
const setTimeout = window.setTimeout;


describe("Messages", function () {
    beforeEach(function () {
        jest.useFakeTimers();
        window.setTimeout = jest.fn();
    });

    afterEach(function () {
        window.setTimeout = setTimeout;
    });

    const defaultProps = {
        messages: [{
            text: "Test message text",
            type: MessageTypes.SUCCESS,
        }],
        onRemoveMessage: jest.fn()
    };

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(<Messages {...defaultProps} {...props} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <Messages
                messages={
                    [{ text: "Test message text", progress: { text: "uploading" } }]
                }
            />
        );
    });

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
            messages: [{ key: "Test message text", duration: 2500 }]
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

    it("Render single message with a passed i18n function using the supplied key", function () {
        const myKey = "m1";
        const myText = "Test message!";
        const _onI18n = (key) => {
            const myMessages = {
                [myKey]: myText
            };
            return myMessages[key];
        };
        const component = getComponent({
            messages: [{
                key: myKey,
                type: MessageTypes.SUCCESS,
            }],
            onI18n: _onI18n,
        });

        const messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(messages[0].textContent).toEqual(myText);
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

    it("emits message event in Chrome", () => {
        navigator = {
            ...navigator,
            userAgent: "chrome"
        };

        const callback = jest.fn();
        document.body.addEventListener("ui-library-message", callback);

        expect(callback).not.toHaveBeenCalled();

        getComponent();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("emits message event in IE", () => {
        navigator = {
            ...navigator,
            userAgent: "msie"
        };

        const callback = jest.fn();
        document.body.addEventListener("ui-library-message", callback);

        expect(callback).not.toHaveBeenCalled();

        getComponent();

        expect(callback).toHaveBeenCalledTimes(1);

        // Reset to avoid IE stuff in other tests
        navigator = {
            ...navigator,
            userAgent: "chrome"
        };
    });

});
