import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import PasswordInput, { passwordInputTypes } from './PasswordInput';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-passwordinput',
};
const getComponent = props => mount(<PasswordInput {...defaultProps} {...props} />);
const renderComponent = props => render(<PasswordInput {...defaultProps} {...props} />);

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

    it('renders fieldMessage with custom status overriding passwordInput type',() => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', type: passwordInputTypes.ERROR, fieldMessageProps: { status: fieldMessageStatuses.INFO } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('info');
    });

    it('changes the field type when the hidden icon is clicked', () => {
        const placeholder = 'password';
        renderComponent({ placeholder });
        const field = screen.getByPlaceholderText(placeholder);
        const hiddenButton = screen.getByRole('button');

        expect(field).toHaveAttribute('type', 'password');
        fireEvent.click(hiddenButton);
        expect(field).toHaveAttribute('type', 'text');
        fireEvent.click(hiddenButton);
        expect(field).toHaveAttribute('type', 'password');
    });

    it('passes props through to underlying component', () =>{
        const props = { 'testprop':'test' };
        const wrapper = getComponent(props);
        const input = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);
        expect(input.props()).toEqual(expect.objectContaining(props));
    });
});
