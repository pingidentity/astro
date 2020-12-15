import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import {
    useMessagesStore,
    useMessageTransitions,
    mergeRememberedMessages,
} from '../MessagesUtils';

const samples = [
    { message: 'uno' },
    { id: 'two', message: 'dos' },
    { message: 'tres' },
];

/* eslint-disable react/prop-types */
const TestComponent = () => {
    const messageProps = useMessagesStore();

    const messagesChildren = useMessageTransitions(messageProps.messages, 200).map(
        message => (
            <div data-el="message" key={message.message}>{message.message}</div>
        ),
    );

    const handleAdd = () => messageProps.addMessage(samples[messageProps.messages.length]);
    const handleRemoveFirst = () => messageProps.removeMessage(samples[0]);
    const handleRemoveSecond = () => messageProps.removeMessage(samples[1]);
    const handleClear = () => messageProps.clearMessages();
    const handleShow = () => messageProps.showMessage(samples[messageProps.messages.length], 1000);
    const handleShowForever = () => messageProps.showMessage(samples[messageProps.messages.length]);

    return (
        <div>
            {messagesChildren}
            <button onClick={handleAdd} data-id="add-button">add</button>
            <button onClick={handleRemoveFirst} data-id="remove-button-1">remove</button>
            <button onClick={handleRemoveSecond} data-id="remove-button-2">remove</button>
            <button onClick={handleClear} data-id="clear-button">clear</button>
            <button onClick={handleShow} data-id="show-button">show</button>
            <button onClick={handleShowForever} data-id="show-forever-button">show</button>
        </div>
    );
};

describe('Messages Utils', () => {
    it('should render 3 added messages', () => {
        const wrapper = mount(<TestComponent />);

        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(3);
    });

    it('should remove 1 message', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent />);

        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.update();

        wrapper.find('button[data-id="remove-button-2"]').simulate('click');
        wrapper.update();

        // element still exists for animation
        expect(wrapper.find('div[data-el="message"]').length).toBe(3);

        // ff transitions
        act(() => {
            jest.runAllTimers();
        });
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(2);
    });

    it('should show and hide a message', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent />);

        wrapper.find('button[data-id="show-button"]').simulate('click');
        wrapper.update();
        expect(wrapper.find('div[data-el="message"]').length).toBe(1);

        act(() => {
            jest.runAllTimers();
        });
        // for some reason, when the whole suite runs, we need to call this twice
        act(() => {
            jest.runAllTimers();
        });
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(0);
    });

    it('should show and not hide a message', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent />);

        wrapper.find('button[data-id="show-forever-button"]').simulate('click');
        wrapper.update();
        expect(wrapper.find('div[data-el="message"]').length).toBe(1);

        act(() => {
            jest.runAllTimers();
        });
        // for some reason, when the whole suite runs, we need to call this twice
        act(() => {
            jest.runAllTimers();
        });
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(1);
    });

    it('should clear messages', () => {
        jest.useFakeTimers();
        const wrapper = mount(<TestComponent />);

        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.find('button[data-id="add-button"]').simulate('click');
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(3);

        wrapper.find('button[data-id="clear-button"]').simulate('click');
        act(() => {
            jest.runAllTimers();
        });
        wrapper.update();

        expect(wrapper.find('div[data-el="message"]').length).toBe(0);
    });

    it('should insert a message as hidden', () => {
        const messages = [
            {
                id: 'first',
            },
            {
                id: 'second',
            },
        ];

        const remembered = [
            {
                id: 'second',
            },
        ];

        const merged = mergeRememberedMessages(messages, remembered);
        expect(merged[0].id).toBe('first');
        expect(merged[0].isHidden).toBe(true);
    });

    it('should reorder based on messages', () => {
        const messages = [
            {
                id: 'first',
            },
            {
                id: 'second',
            },
        ];

        const remembered = [
            {
                id: 'second',
            },
            {
                id: 'first',
            },
        ];

        const merged = mergeRememberedMessages(messages, remembered);
        expect(merged[0].id).toBe('first');
        expect(merged[1].id).toBe('second');
        expect(merged.length).toBe(2);
    });
});
