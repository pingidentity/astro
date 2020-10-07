import React, { useReducer, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import messagesReducer, {
    removeMessage,
    showMessage,
} from '../multiMessagesReducer';

it('should remove a message without an id', () => {
    const state = messagesReducer({
        only: [
            { message: 'uno' },
            { message: 'dos' },
            { message: 'tres' },
        ],
    }, removeMessage('only', { message: 'dos' }));

    expect(state.only.length).toBe(2);
});

it('should create an empty state', () => {
    const state = messagesReducer();
    expect(Object.keys(state).length).toBe(0);
});

it('should show and hide a message', () => {
    jest.useFakeTimers();
    const TestComponent = () => {
        const [state, dispatch] = useReducer(messagesReducer, { only: [] });

        useEffect(() => {
            // this is a thunk action, so it returns a function to call with dispatch
            showMessage('only', { message: 'nothing' }, 500)(dispatch);
        }, []);

        return (
            <div>
                {state.only.map(() => <div data-el="item" />)}
            </div>
        );
    };

    const wrapper = mount(<TestComponent />);

    expect(wrapper.find('div[data-el="item"]').length).toBe(1);

    act(() => { jest.runAllTimers(); });
    wrapper.update();

    expect(wrapper.find('div[data-el="item"]').length).toBe(0);
});

it('should show and not hide a message', () => {
    jest.useFakeTimers();
    const TestComponent = () => {
        const [state, dispatch] = useReducer(messagesReducer, { only: [] });

        useEffect(() => {
            // this is a thunk action, so it returns a function to call with dispatch
            showMessage('only', { message: 'nothing' })(dispatch);
        }, []);

        return (
            <div>
                {state.only.map(() => <div data-el="item" />)}
            </div>
        );
    };

    const wrapper = mount(<TestComponent />);

    expect(wrapper.find('div[data-el="item"]').length).toBe(1);

    act(() => { jest.runAllTimers(); });
    wrapper.update();

    expect(wrapper.find('div[data-el="item"]').length).toBe(1);
});
