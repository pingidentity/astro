import React from 'react';
import { mount } from 'enzyme';
import TextInput, { textInputFormats } from './TextInput';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-input',
    placeholder: 'Test Input',
    value: 'Test value',
};
const getComponent = props => mount(<TextInput {...defaultProps} {...props} />);
const getInput = wrapper => wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

describe('TextInput', () => {
    it('renders the text input in the default state', () => {
        const wrapper = getComponent();
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
        expect(input.props().value).toEqual(defaultProps.value);
        expect(input.hasClass('text-input')).toEqual(true);
        expect(input.props().inputmode).toBeUndefined();
        expect(input.props().pattern).toBeUndefined();
        expect(input.props().novalidate).toBeUndefined();
    });
    it('calls the onChange', () => {
        const testCallback = jest.fn();
        const mockEvent = { target: { value: 'Entered value' } };
        const wrapper = getComponent({ onChange: testCallback });
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        input.simulate('change', mockEvent.target.value);
        expect(testCallback).toHaveBeenCalled();
    });
    it('calls the onBlur', () => {
        const testCallback = jest.fn();
        const wrapper = getComponent({ onBlur: testCallback });
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        input.simulate('blur');
        expect(testCallback).toHaveBeenCalled();
    });
    describe('supports formats', () => {
        it('numeric', () => {
            const wrapper = getComponent({ format: textInputFormats.NUMERIC });
            const input = getInput(wrapper);
            expect(input.props().inputmode).toEqual('numeric');
            expect(input.props().pattern).toEqual('\d*');
            expect(input.props().novalidate).toBe(true);
        });
        it('text', () => {
            const wrapper = getComponent({ format: textInputFormats.TEXT });
            const input = getInput(wrapper);
            expect(input.props().inputmode).toEqual('text');
            expect(input.props().pattern).toBeUndefined();
            expect(input.props().novalidate).toBeUndefined();
        });
        it('email', () => {
            const wrapper = getComponent({ format: textInputFormats.EMAIL });
            const input = getInput(wrapper);
            expect(input.props().inputmode).toEqual('email');
            expect(input.props().pattern).toBeUndefined();
            expect(input.props().novalidate).toBeUndefined();
        });
    });
});
