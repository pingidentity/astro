
import React from 'react';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import Dropdown, { dropdownStatuses } from './Dropdown';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-dropdown',
};
const getComponent = props => mount(<Dropdown {...defaultProps} {...props} />);
const renderComponent = props => render(<Dropdown {...defaultProps} {...props} />);

describe('Dropdown', () => {
    it('renders the Dropdown in the default state', () => {
        const wrapper = getComponent();
        const dropdown = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(dropdown.exists()).toEqual(true);
    });

    it('renders elements in the Dropdown', () => {
        const wrapper = getComponent({
            options: [
                'Foo',
                'Bar',
            ],
        });

        const items = wrapper.find(`div[data-id="${defaultProps['data-id']}"] > select > option`);

        expect(items.length).toEqual(2);
    });

    it('renders fieldMessage', () => {
        const wrapper = getComponent({ fieldMessage: 'Text input message' })
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(true)
    });

    it('does not render fieldMessage if fieldMessage is not defined', () => {
        const wrapper = getComponent()
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.exists()).toEqual(false)
    });

    it('renders fieldMessage with custom status', () => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', fieldMessageProps: { status: fieldMessageStatuses.ERROR } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('error');
    });

    it('renders fieldMessage with custom status overriding dropdown type', () => {
        const wrapper = getComponent({ fieldMessage: 'Text input message', status: dropdownStatuses.ERROR, fieldMessageProps: { status: fieldMessageStatuses.INFO } });
        const fieldMessage = wrapper.find('FieldMessage');
        expect(fieldMessage.props().status).toEqual('info');
    });

    it('renders disabled options', () => {
        const options = ['A', { label: 'B', value: 'B', disabled: true }, 'C'];
        renderComponent({ options });

        const optionElements = screen.getAllByRole('option');
        expect(optionElements).toHaveLength(options.length);
        expect(optionElements[1]).toBeDisabled();
    });
});
