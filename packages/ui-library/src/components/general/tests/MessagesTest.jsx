window.__DEV__ = true;

jest.dontMock("../Messages.jsx");
jest.dontMock("../../../util/ReduxTestUtils.js");

describe("Messages", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        Messages = require("../Messages.jsx"),
        ReduxTestUtils = require("../../../util/ReduxTestUtils.js"),
        setTimeout = window.setTimeout,
        _ = require("underscore");

    beforeEach(function () {
        window.setTimeout = jest.genMockFunction();
    });

    afterEach(function () {
        window.setTimeout = setTimeout;
    });

    it("Add message schedules removal", function () {
        var obj = { state: { messages: [] } };
        var dispatch = ReduxTestUtils.createTestDispatcher(Messages.Reducer, obj);

        dispatch({});
        dispatch(Messages.Actions.addMessage("message"));

        expect(window.setTimeout.mock.calls[0][1]).toBe(5000);
        expect(_.omit(obj.state.messages[0], "timer")).toEqual({ text: "message", type: "success", index: 1 });

        //change the message id to verify that it doesnt affect what gets removed
        dispatch(Messages.Actions.addMessage("message 1"));
        dispatch(Messages.Actions.addMessage("message 2"));

        expect(obj.state.messages.length).toBe(3);

        //execute the timer
        window.setTimeout.mock.calls[0][0]();
        expect(_.pluck(obj.state.messages, "text")).toEqual(["message 1", "message 2"]);

        //trigger removal of all messages
        window.setTimeout.mock.calls[1][0]();
        window.setTimeout.mock.calls[2][0]();
        expect(obj.state.messages).toEqual([]);
    });

    it("Removes message by index", function () {
        var obj = { state: { messages: [] } };
        var dispatch = ReduxTestUtils.createTestDispatcher(Messages.Reducer, obj);

        dispatch({});
        dispatch(Messages.Actions.addMessage("message 1"));
        dispatch(Messages.Actions.addMessage("message 2"));
        dispatch(Messages.Actions.addMessage("message 3"));

        dispatch(Messages.Actions.removeAt(1));

        expect(_.pluck(obj.state.messages, "text")).toEqual(["message 1", "message 3"]);
    });

    it("Removes non-existant index", function () {
        var obj = { state: { messages: [] } };
        var dispatch = ReduxTestUtils.createTestDispatcher(Messages.Reducer, obj);

        dispatch({});
        dispatch(Messages.Actions.addMessage("message 1"));
        dispatch(Messages.Actions.removeAt(1));

        expect(obj.state.messages.length).toBe(1);
    });

    it("Render empty messages", function () {
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(0);
    });

    it("Render single message", function () {
        var messageList = [
                { text: "Test message text" }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(1);
        expect(messages[0].getDOMNode().textContent).toEqual("Test message text");
    });
    
    it("Render multiple messages", function () {
        var messageList = [
                { text: "Test message text" },
                { text: "Test message 2" },
                { text: "Test message 3" }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(3);
    });

    it("Close message", function () {
        var messageList = [
                { text: "Test message text" },
                { text: "Test message 2" },
                { text: "Test message 3" }
        ];
        
        var removeMessage = jest.genMockFunction();
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} removeMessage={removeMessage} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");

        var closeLink = ReactTestUtils.findRenderedDOMComponentWithClass(messages[0], "close");
        ReactTestUtils.Simulate.click(closeLink,{});

        expect(removeMessage).toBeCalledWith(0);
    });

    it("Render single message with default i18n function", function () {
        var messageList = [
                { key: "Test message text" }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(1);
        expect(messages[0].getDOMNode().textContent).toEqual("Test message text");
    });

    it("Render single message with custom interval", function () {
        var messageList = [
                { key: "Test message text", duration: 5000 }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(1);
        expect(global.setInterval.mock.calls[0][1]).toBe(5000);
    });

    it("Test unmount clears timers", function () {
        var messageList = [
                { key: "Test message text", duration: 5000 }
        ];
        
        var Wrapper = React.createClass({
            getInitialState: function () {
                return { renderChildren: true };
            },

            renderChildren: function (renderChildren) {
                this.setState({ renderChildren: !!renderChildren });
            },

            render: function () {
                if (this.state.renderChildren) {
                    return this.props.children;
                } else {
                    return null;
                }
            }

        });

        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Messages messages={messageList} />
            </Wrapper>
        );

        expect(global.clearInterval.mock.calls.length).toBe(0);

        component.renderChildren(false);

        expect(global.clearInterval.mock.calls.length).toBe(1);
    });

    it("Test unmount with no timer", function () {
        var messageList = [
                { key: "Test message text" }
        ];
        
        var Wrapper = React.createClass({
            getInitialState: function () {
                return { renderChildren: true };
            },

            renderChildren: function (renderChildren) {
                this.setState({ renderChildren: !!renderChildren });
            },

            render: function () {
                if (this.state.renderChildren) {
                    return this.props.children;
                } else {
                    return null;
                }
            }

        });

        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Messages messages={messageList} />
            </Wrapper>
        );

        expect(global.clearInterval.mock.calls.length).toBe(0);

        component.renderChildren(false);

        expect(global.clearInterval.mock.calls.length).toBe(0);
    });

    it("Render html message", function () {
        var messageList = [
                { text: 'Test message text <span id="testSpan">html</span>', isHtml: true }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            <Messages messages={messageList} />
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, "message");
        expect(messages.length).toEqual(1);

        // Ensure html tags are not included as text content (which is what would happen if html
        // was being rendered as text).
        expect(messages[0].getDOMNode().textContent).toEqual("Test message text html");

    });

});
