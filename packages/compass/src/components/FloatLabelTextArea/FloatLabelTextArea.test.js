import React from 'react';
import { mount } from 'enzyme';
import FloatLabelTextArea from './FloatLabelTextArea';

const defaultProps = {
    'data-id': 'test-floatlabeltextarea',
    label: 'Test',
    value: 'test value',
};
const getComponent = props => mount(<FloatLabelTextArea {...defaultProps} {...props} />);

describe('FloatLabelTextArea', () => {
    it('renders the FloatLabelTextArea in the default state with a label', () => {
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
