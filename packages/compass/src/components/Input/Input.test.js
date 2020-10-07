import React from 'react';
import { mount } from 'enzyme';
import Input from './Input';

const defaultProps = {
    'data-id': 'test-input',
};
const getComponent = props => mount(<Input {...defaultProps} {...props} />);

describe('Input', () => {
    it('renders the input in the default state', () => {
        const wrapper = getComponent({});
        const input = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(input.exists()).toEqual(true);
    });

    it('fires the onValueChange callback', () => {
        const callback = jest.fn();
        const wrapper = getComponent({ onValueChange: value => callback(value) });
        const input = wrapper.find(`span[data-id="${defaultProps['data-id']}"] input`);

        expect(callback).not.toBeCalled();
        input.simulate('change', { target: { value: 'newvalue' } });
        expect(callback).toBeCalledWith('newvalue');
    });
});
