import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

const defaultProps = {
    'data-id': 'test-button',
    children: 'Test',
};
const getComponent = props => mount(<Button {...defaultProps} {...props} />);

describe('Button', () => {
    it('renders the button in the default state', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
        expect(button.text()).toBe(defaultProps.children);
    });

    it('renders a submit button', () => {
        const wrapper = getComponent({ isSubmit: true });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.is('button[type="submit"]')).toEqual(true);
    });

    it('renders a link', () => {
        const wrapper = getComponent({ href: '#top' });
        const button = wrapper.find(`a[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
    });
});
