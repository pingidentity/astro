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

});
