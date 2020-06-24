import React from 'react';
import { mount } from 'enzyme';
import PasswordInput from './PasswordInput';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-passwordinput',
};
const getComponent = props => mount(<PasswordInput {...defaultProps} {...props} />);

describe('PasswordInput', () => {
    it('renders the PasswordInput in the default state', () => {
        const wrapper = getComponent();
        const passwordinput = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(passwordinput.exists()).toEqual(true);
    });
    it('calls the onChange', () => {
        const testCallback = jest.fn();
        const mockEvent = { target: { value: 'password' } };
        const wrapper = getComponent({ onChange: testCallback });
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        input.simulate('change', mockEvent.target.value);
        expect(testCallback).toHaveBeenCalled();
    });
    it('renders fieldMessage',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message' })
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(true)
    });
    it('renders fieldMessage with custom status',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', fieldMessageProps: { status: fieldMessageStatuses.ERROR } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('error');
    });
});
