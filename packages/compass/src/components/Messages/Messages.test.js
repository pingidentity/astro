import React from 'react';
import { mount } from 'enzyme';
import { Portal } from 'react-portal';
import Messages from './Messages';
import Message from './Message';
import MessagesProvider, { useMessagesContext } from './MessagesProvider';

const defaultProps = {
    'data-id': 'test-messages',
    children: [
        <Message key="one">one</Message>,
        <Message key="two">two</Message>,
    ],
};
const getComponent = props => mount(<Messages {...defaultProps} {...props} />);

describe('Messages', () => {
    it('renders Messages in the default state', () => {
        const wrapper = getComponent({});
        const messages = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(messages.exists()).toEqual(true);
    });

    it('renders Messages without a portal', () => {
        const wrapper = getComponent({ hasNoPortal: true });
        const portal = wrapper.find(Portal);

        expect(portal.exists()).toEqual(false);
    });

    it('renders Messages with a messages list', () => {
        const wrapper = getComponent({
            children: null,
            messages: [
                {
                    message: 'first',
                },
                {
                    message: 'second',
                },
            ],
        });
        const messages = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(messages.exists()).toEqual(true);
    });
});

describe('Message', () => {
    it('renders a message with a function for children', () => {
        const wrapper = mount(<Message>{() => <div data-id="content">hello</div>}</Message>);
        expect(wrapper.find('div[data-id="content"]').exists()).toBe(true);
    });
});

const StoreTest = () => {
    const messageProps = useMessagesContext();

    const handleShow = () => messageProps.showSuccessMessage('hello');

    return (
        <div>
            {messageProps.messages.map(
                message => (
                    <div data-el="message" key={message.message}>{message.message}</div>
                ),
            )}
            <button onClick={handleShow} data-id="show-button">show</button>
        </div>
    );
};

describe('Messages Provider', () => {
    it('should render and add a message', () => {
        const wrapper = mount(<MessagesProvider><StoreTest /></MessagesProvider>);

        expect(wrapper.find('div[data-el="message"]').length).toBe(0);

        wrapper.find('button[data-id="show-button"]').simulate('click');

        expect(wrapper.find('div[data-el="message"]').length).toBe(1);
    });
});
