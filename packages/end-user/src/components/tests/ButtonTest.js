import React from 'react';
import { mount } from 'enzyme';
import Button, { ButtonTypes } from '../Button';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-button',
    label: 'Test Button',
};
const getComponent = props => mount(<Button {...defaultProps} {...props} />);

describe('Button', () => {
    it('renders the button in the default state', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
        expect(button.text()).toBe(defaultProps.label);
        expect(button.hasClass('button')).toEqual(true);
        expect(button.hasClass('button--disabled')).toEqual(false);
        expect(button.hasClass('button--primary')).toEqual(false);
        expect(button.hasClass('button--tertiary')).toEqual(false);
    });
    it('assigns a default onClick', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        button.simulate('click');
        expect(button.exists()).toEqual(true);
    });
    it('renders the button in the primary state', () => {
        const wrapper = getComponent({ type: ButtonTypes.PRIMARY });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.hasClass('button--primary')).toEqual(true);
    });
    it('renders the button in the tertiary state', () => {
        const wrapper = getComponent({ type: ButtonTypes.TERTIARY });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.hasClass('button--tertiary')).toEqual(true);
    });
    it('calls the onClick', () => {
        const testCallback = jest.fn();
        const wrapper = getComponent({ onClick: testCallback });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(testCallback).not.toHaveBeenCalled();
        button.simulate('click');
        expect(testCallback).toHaveBeenCalled();
    });
});
