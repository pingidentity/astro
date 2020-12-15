import React from 'react';
import { mount } from 'enzyme';
import FloatLabelInput from './FloatLabelInput';

const defaultProps = {
    'data-id': 'test-FloatLabelInput',
    label: 'Test',
    value: 'test value',
};
const getComponent = props => mount(<FloatLabelInput {...defaultProps} {...props} />);

describe('FloatLabelInput', () => {
    it('renders the FloatLabelInput in the default state with a label', () => {
        const wrapper = getComponent();

        const input = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);
        expect(input.exists()).toEqual(true);

        const label = wrapper.find('label');
        expect(label.exists()).toEqual(true);
    });

    it('doesn\'t render the label when there\'s no value', () => {
        const wrapper = getComponent({ value: '' });

        const label = wrapper.find('label');
        expect(label).toHaveStyleRule('visibility', 'hidden');
    });
});
