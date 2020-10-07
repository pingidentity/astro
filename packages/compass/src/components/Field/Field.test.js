import React from 'react';
import { mount } from 'enzyme';
import Field from './Field';
import Input from '../Input';

const defaultProps = {
    'data-id': 'test-Field',
    children: <Input />,
    label: 'Test Label',
};
const getComponent = props => mount(<Field {...defaultProps} {...props} />);

describe('Field', () => {
    it('renders the Field in the default state', () => {
        const wrapper = getComponent();
        const label = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(label.exists()).toEqual(true);
    });

    it('renders the Field and input with a provided id', () => {
        const wrapper = getComponent({ id: 'set-id' });
        const label = wrapper.find('label[htmlFor="set-id"]');
        const input = wrapper.find('input[id="set-id"]');

        expect(label.exists()).toEqual(true);
        expect(input.exists()).toEqual(true);
    });

    it('renders the Field and input with a generated id', () => {
        const wrapper = getComponent({});

        const input = wrapper.find('input');
        expect(input.exists()).toEqual(true);

        const label = wrapper.find(`label[htmlFor="${input.props().id}"]`);
        expect(label.exists()).toEqual(true);
    });
});
