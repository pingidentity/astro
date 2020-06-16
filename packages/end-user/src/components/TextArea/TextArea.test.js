import React from 'react';
import { mount } from 'enzyme';
import TextArea from './TextArea';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-input',
    placeholder: 'Test Input',
    value: 'Test value',
};
const getComponent = props => mount(<TextArea {...defaultProps} {...props} />);
const getInput = wrapper => wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

describe('TextArea', () => {
    it('renders the text area in the default state', () => {
        const wrapper = getComponent();
        const textarea = wrapper.find(`textarea[data-id="${defaultProps['data-id']}"]`);

        expect(textarea.exists()).toEqual(true);
        expect(textarea.props().value).toEqual(defaultProps.value);
        expect(textarea.hasClass('text-area')).toEqual(true);
    });
    it('calls the onChange', () => {
        const testCallback = jest.fn();
        const mockEvent = { target: { value: 'Entered value' } };
        const wrapper = getComponent({ onChange: testCallback });
        const textarea = wrapper.find(`textarea[data-id="${defaultProps['data-id']}"]`);

        expect(textarea.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        textarea.simulate('change', mockEvent.target.value);
        expect(testCallback).toHaveBeenCalled();
    });
    it('calls the onBlur', () => {
        const testCallback = jest.fn();
        const wrapper = getComponent({ onBlur: testCallback });
        const textarea = wrapper.find(`textarea[data-id="${defaultProps['data-id']}"]`);

        expect(textarea.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        textarea.simulate('blur');
        expect(testCallback).toHaveBeenCalled();
    });
    it('calls the onFocus', () => {
        const testCallback = jest.fn();
        const wrapper = getComponent({ onFocus: testCallback });
        const textarea = wrapper.find(`textarea[data-id="${defaultProps['data-id']}"]`);

        expect(textarea.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        textarea.simulate('focus');
        expect(testCallback).toHaveBeenCalled();
    });
});
