import React from 'react';
import { mount } from 'enzyme';
import TextInput from './TextInput';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-input',
    placeholder: 'Test Input',
    value: 'Test value',
};
const getComponent = props => mount(<TextInput {...defaultProps} {...props} />);

describe('TextInput', () => {
    it('renders the text input in the default state', () => {
        const wrapper = getComponent();
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
        expect(input.props().value).toEqual(defaultProps.value);
        expect(input.hasClass('text-input')).toEqual(true);
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
});
