import React from 'react';
import { mount } from 'enzyme';
import FloatLabel from './FloatLabel';

const defaultProps = {
    'data-id': 'test-FloatLabel',
    children: 'Test',
};
const getComponent = props => mount(<FloatLabel {...defaultProps} {...props} />);

describe('FloatLabel', () => {
    it('renders the FloatLabel in the default state', () => {
        const wrapper = getComponent();
        const label = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(label.exists()).toEqual(true);
    });

    it('renders the FloatLabel in the hidden state', () => {
        const wrapper = getComponent({ isHidden: true });
        const label = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(label).toHaveStyleRule('visibility', 'hidden');
    });
});
