import React from 'react';
import { mount } from 'enzyme';
import TextArea, { textAreaTypes } from './TextArea';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

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
    it('renders fieldMessage',() => {
        const wrapper = getComponent({ fieldMessage: 'Text area message' })
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(true)
    });
    it('does not render fieldMessage if fieldMessage is not defined',() => {
        const wrapper = getComponent()
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(false)
    });
    it('renders fieldMessage with custom status',() => {
        const wrapper = getComponent({ fieldMessage: 'Text area message', fieldMessageProps: { status: fieldMessageStatuses.ERROR } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('error');
    });
    it('renders fieldMessage with custom status overriding textInput type',() => {
        const wrapper = getComponent({ fieldMessage: 'Text area message', type: textAreaTypes.ERROR, fieldMessageProps: { status: fieldMessageStatuses.INFO } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('info');
    });
});
