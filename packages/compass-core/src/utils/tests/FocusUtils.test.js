import React from 'react';
import { mount } from 'enzyme';
import { useFocusOutline } from '../FocusUtils';
import { keyCodes } from '../KeyboardUtils';

const TestComponent = () => {
    useFocusOutline();

    return <input type="text" />;
};

describe('FocusUtils', () => {
    it('increases and decreases component count', () => {
        const first = mount(<TestComponent />);
        expect(parseInt(document.body.dataset.uiLibComponentCount, 10)).toBe(1);
        const second = mount(<TestComponent />);
        expect(parseInt(document.body.dataset.uiLibComponentCount, 10)).toBe(2);
        first.unmount();
        expect(parseInt(document.body.dataset.uiLibComponentCount, 10)).toBe(1);
        second.unmount();
        expect(parseInt(document.body.dataset.uiLibComponentCount, 10)).toBe(0);
    });

    it('adds focus class when the tab key is pressed', () => {
        const component = mount(<TestComponent />);
        const event1 = new KeyboardEvent('keydown', { keyCode: keyCodes.ENTER });
        const event2 = new KeyboardEvent('keydown', { keyCode: keyCodes.TAB });
        document.dispatchEvent(event1);
        expect(document.body.classList.length).toBe(0);
        document.dispatchEvent(event2);
        expect(document.body.classList[0]).toBe('ui-library-focus-visible');
        component.unmount();
    });
});
