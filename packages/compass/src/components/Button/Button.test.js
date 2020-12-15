import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';
import ButtonLoader from './ButtonLoader';
import { success, critical } from '../../styles/colors';

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

    it('renders the button with an icon on the left', () => {
        const wrapper = getComponent({ icon: 'plus' });
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(svg.exists()).toEqual(true);
    });

    it('renders the button with an icon on the right', () => {
        const wrapper = getComponent({ iconAfter: 'arrow-right' });
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(svg.exists()).toEqual(true);
    });

    it('renders the button in the success state', () => {
        const wrapper = getComponent({ status: 'success' });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(svg.exists()).toEqual(true);
        expect(button).toHaveStyleRule('background', success.bright);
    });

    it('renders the button in the critical state', () => {
        const wrapper = getComponent({ status: 'critical' });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(svg.exists()).toEqual(true);
        expect(button).toHaveStyleRule('background', critical.bright);
    });

    it('renders the button in the loading state', () => {
        const wrapper = getComponent({ status: 'loading', icon: 'plus' });
        const loader = wrapper.find(ButtonLoader);

        expect(loader.exists()).toBeTruthy();
    });

    it('renders an inline button', () => {
        const wrapper = getComponent({ isInline: true, icon: 'plus' });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button).toHaveStyleRule('border-radius', '15px');
    });

    it('renders a disabled button', () => {
        const wrapper = getComponent({ isDisabled: true });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button).toHaveStyleRule('opacity', '0.5');
    });
});
