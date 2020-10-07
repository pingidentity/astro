import React, { useRef } from 'react';
import { mount } from 'enzyme';
import { useClickOutsideHandler, callIfOutsideOfContainers } from '../MouseUtils';

/* eslint-disable react/prop-types */
const TestComponent = ({
    callback,
}) => {
    const reference = useRef(null);
    useClickOutsideHandler([reference], callback);

    return (
        <div>
            <div ref={reference} data-id="inside">
                INSIDE
            </div>
            <div data-id="outside">
                OUTSIDE
            </div>
        </div>
    );
};

describe('Mouse Utils', () => {
    it('should call the callback only when being passed the inside node', () => {
        global.getSelection = () => ({ toString: () => null });

        const body = document.body;
        const parent = document.createElement('div');
        body.appendChild(parent);
        const child = document.createElement('div');
        parent.appendChild(child);
        const sibling = document.createElement('div');
        parent.appendChild(sibling);

        const callback = jest.fn();

        callIfOutsideOfContainers([parent], callback, sibling);
        expect(callback).not.toBeCalled();

        callIfOutsideOfContainers([child], callback, sibling);
        expect(callback).toBeCalled();
    });

    it('should add and remove event handlers', () => {
        const addCallback = jest.fn();
        const removeCallback = jest.fn();
        window.addEventListener = type => addCallback(type);
        window.removeEventListener = type => removeCallback(type);

        const callback = jest.fn();
        const wrapper = mount(<TestComponent callback={callback} />);

        expect(addCallback).toHaveBeenCalledWith('mousedown');

        wrapper.unmount();

        expect(removeCallback).toHaveBeenCalledWith('mousedown');
        expect(removeCallback).toHaveBeenCalledWith('mouseup');
    });
});
