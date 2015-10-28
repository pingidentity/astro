window.__DEV__ = true;

jest.dontMock('../Messages.jsx');


describe('Messages', function () {
    var React, ReactTestUtils;
    var Messages;

    React = require('react/addons');
    ReactTestUtils = React.addons.TestUtils;

    Messages = require('../Messages.jsx');

    it('Render empty messages', function () {
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(0);
    });

    it('Render single message', function () {
        var messageList = [
                { text: 'Test message text' }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(1);
        expect(messages[0].getDOMNode().textContent).toEqual('Test message text');
    });
    
    it('Render multiple messages', function () {
        var messageList = [
                { text: 'Test message text' },
                { text: 'Test message 2' },
                { text: 'Test message 3' }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(3);
    });

    it('Close message', function () {
        var messageList = [
                { text: 'Test message text' },
                { text: 'Test message 2' },
                { text: 'Test message 3' }
        ];
        
        var removeMessage = jest.genMockFunction();
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} removeMessage={removeMessage} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');

        var closeLink = ReactTestUtils.findRenderedDOMComponentWithClass(messages[0], 'close');
        ReactTestUtils.Simulate.click(closeLink,{});

        expect(removeMessage).toBeCalledWith(0);
    });

    it('Render single message with default i18n function', function () {
        var messageList = [
                { key: 'Test message text' }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(1);
        expect(messages[0].getDOMNode().textContent).toEqual('Test message text');
    });

    it('Render single message with custom interval', function () {
        var messageList = [
                { key: 'Test message text', duration: 5000 }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(1);
        expect(global.setInterval.mock.calls[0][1]).toBe(5000);
    });

    it('Test unmount clears timers', function () {
        var messageList = [
                { key: 'Test message text', duration: 5000 }
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

    it('Test unmount with no timer', function () {
        var messageList = [
                { key: 'Test message text' }
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

    it('Render html message', function () {
        var messageList = [
                { text: 'Test message text <span id="testSpan">html</span>', isHtml: true }
        ];
        
        var messagesComponent = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <Messages messages={messageList} />
            /* jshint ignore:end */
        );

        var messages = ReactTestUtils.scryRenderedDOMComponentsWithClass(messagesComponent, 'message');
        expect(messages.length).toEqual(1);

        // Ensure html tags are not included as text content (which is what would happen if html
        // was being rendered as text).
        expect(messages[0].getDOMNode().textContent).toEqual('Test message text html');

    });

});
