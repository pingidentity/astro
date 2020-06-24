import React from 'react';
import { mount } from 'enzyme';
import TextInput, { textInputFormats, textInputTypes } from './TextInput';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

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
    it('renders fieldMessage',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message' })
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(true)
    });
    it('does not render fieldMessage if fieldMessage is not defined',() => {
        const wrapper = getComponent()
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(false)
    });
    it('renders fieldMessage with custom status',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', fieldMessageProps: { status: fieldMessageStatuses.ERROR } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('error');
    });
    it('renders fieldMessage with custom status overriding textInput type',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', type: textInputTypes.ERROR, fieldMessageProps: { status: fieldMessageStatuses.INFO } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('info');
    });
    describe('supports formats', () => {
        it('numeric', () => {
            const wrapper = getComponent({ format: textInputFormats.NUMERIC });
            const input = getInput(wrapper);
            expect(input.props().inputMode).toEqual('numeric');
            expect(input.props().pattern).toEqual('\d*');
            expect(input.props().noValidate).toBe(true);
        });
        it('text', () => {
            const wrapper = getComponent({ format: textInputFormats.TEXT });
            const input = getInput(wrapper);
            expect(input.props().inputMode).toEqual('text');
            expect(input.props().pattern).toBeUndefined();
            expect(input.props().noValidate).toBeUndefined();
        });
        it('email', () => {
            const wrapper = getComponent({ format: textInputFormats.EMAIL });
            const input = getInput(wrapper);
            expect(input.props().inputMode).toEqual('email');
            expect(input.props().pattern).toBeUndefined();
            expect(input.props().noValidate).toBeUndefined();
        });
    });
});
