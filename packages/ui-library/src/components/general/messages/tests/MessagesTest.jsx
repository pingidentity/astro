window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../Messages.jsx");
jest.dontMock("../MessagesConstants.js");

describe("Messages", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Messages = require("../index.js"),
        setTimeout = window.setTimeout,
        _ = require("underscore");

    beforeEach(function () {
        window.setTimeout = jest.genMockFunction();
    });

    afterEach(function () {
        window.setTimeout = setTimeout;
    });

    function getComponent (props) {
        props = _.defaults(props || {}, {
            messages: [{
                text: "Test message text"
            }],
            onRemoveMessage: jest.genMockFunction()
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

    //TODO To be removed once "removeMessage" support is discontnued.
    it("Close message with deprecared removeMessage callback", function () {
        var props = {
            messages: [{
                text: "Test message text"
            }],
            removeMessage: jest.genMockFunction()
        };
        var component = ReactTestUtils.renderIntoDocument(<Messages {...props} />);
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");
        var closeLink = TestUtils.findRenderedDOMNodeWithClass(messages[0], "close");

        ReactTestUtils.Simulate.click(closeLink);

        expect(component.props.removeMessage).toBeCalledWith(0);
    });

    it("Render single message with default i18n function", function () {
        var component = getComponent();
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(messages[0].textContent).toEqual("Test message text");
    });

    it("Render single message with custom interval", function () {
        var component = getComponent({
            messages: [{ key: "Test message text", duration: 5000 }]
        });
        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);
        expect(global.setInterval.mock.calls[0][1]).toBe(5000);
    });

    it("Test unmount clears timers", function () {
        var component = getComponent({
            messages: [{ key: "Test message text", duration: 5000 }]
        });

        expect(global.clearInterval.mock.calls.length).toBe(0);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(global.clearInterval.mock.calls.length).toBe(1);
    });

    it("Test unmount with no timer", function () {
        var component = getComponent({
            messages: [{ key: "Test message text" }]
        });

        expect(global.clearInterval.mock.calls.length).toBe(0);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(global.clearInterval.mock.calls.length).toBe(0);
    });

    it("Render html message", function () {
        var component = getComponent({
            messages: [{ text: 'Test message text <span id="testSpan">html</span>', isHtml: true }]
        });

        var messages = TestUtils.scryRenderedDOMNodesWithClass(component, "message");

        expect(messages.length).toEqual(1);

        // Ensure html tags are not included as text content (which is what would happen if html
        // was being rendered as text).
        expect(messages[0].textContent).toEqual("Test message text html");
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

    // TODO To be removed once "id" support is discontnued.
    it("render component with id", function () {
        var component = getComponent(
            { id: "messagesWithId" }
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "messagesWithId");

        expect(element).toBeDefined();
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

    // TODO To be removed once "id" support is discontnued.
    it("log warning in console for id", function () {
        console.warn = jest.genMockFunction();
        getComponent(
            { id: "messagesWithId" }
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        getComponent();

        expect(console.warn).not.toBeCalled();
    });

    // TODO To be removed once "removeMessage" support is discontnued.
    it("log warning in console for removeMessage", function () {
        console.warn = jest.genMockFunction();
        getComponent({
            "data-id": "messagesWithRemoveChange",
            removeMessage: jest.genMockFunction()
        });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onRemoveMessage instead of removeMessage. " +
            "Support for removeMessage will be removed in next version");
    });

    // TODO To be removed once "removeMessage" support is discontnued.
    it("log no warning in console with onRemoveMessage", function () {
        console.warn = jest.genMockFunction();
        getComponent({
            "data-id": "messagesWithOnRemoveChange"
        });

        expect(console.warn).not.toBeCalled();
    });

    // TODO To be removed once "i18n" support is discontnued.
    it("log warning in console for i18n", function () {
        console.warn = jest.genMockFunction();
        getComponent({
            "data-id": "messagesWithI18n",
            i18n: jest.genMockFunction()
        });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use onI18n instead of i18n. Support for i18n will be removed in next version");
    });

    // TODO To be removed once "i18n" support is discontnued.
    it("log no warning in console without i18n", function () {
        console.warn = jest.genMockFunction();
        getComponent({
            "data-id": "messagesWithOnI18n"
        });

        expect(console.warn).not.toBeCalled();
    });
});
