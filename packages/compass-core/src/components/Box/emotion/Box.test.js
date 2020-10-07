import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import Box from './Box';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

const defaultProps = {
    'data-id': 'test-box',
    children: 'Test',
};
const getComponent = props => mount(<Box {...defaultProps} {...props} />);

describe('Box', () => {
    it('renders the box in the default state', () => {
        const wrapper = getComponent();
        const box = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(box.exists()).toEqual(true);
    });

    it('renders the box as a row', () => {
        const wrapper = getComponent({ isRow: true });
        const box = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(box).toHaveStyleRule('flex-direction', 'row');
    });
});
