import React from 'react';
import { mount } from 'enzyme';
import SocialButton from './SocialButton';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-socialbutton',
    label: 'Test SocialButton',
};
const getComponent = props => mount(<SocialButton {...defaultProps} {...props} />);

describe('SocialButton', () => {
    it('renders the SocialButton in the default state', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
        expect(button.text()).toBe(defaultProps.label);
    });
    it('renders the SocialButton with a custom image', () => {
        const wrapper = getComponent({
            image: './test.png',
        });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]>img`);

        expect(button.exists()).toEqual(true);
    });
    it('assigns a default onClick', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        button.simulate('click');
        expect(button.exists()).toEqual(true);
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
