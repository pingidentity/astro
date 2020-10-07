import React from 'react';
import { mount } from 'enzyme';
import Chip from './Chip';

const defaultProps = {
    'data-id': 'test-chip',
    children: 'Test',
};
const getComponent = props => mount(<Chip {...defaultProps} {...props} />);

describe('Chip', () => {
    it('renders the chip in the default state', () => {
        const wrapper = getComponent();
        const chip = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(chip.exists()).toEqual(true);
    });

    it('renders after content for the chip', () => {
        const wrapper = getComponent({
            afterContent: <span data-id="after" />,
        });
        const span = wrapper.find('span[data-id="after"]');

        expect(span.exists()).toEqual(true);
    });

    it('renders background color for the chip', () => {
        const wrapper = getComponent({
            color: '#fff',
        });
        const chip = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(chip).toHaveStyleRule('background', '#fff');
    });
});
