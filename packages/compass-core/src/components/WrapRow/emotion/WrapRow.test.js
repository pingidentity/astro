import React from 'react';
import { mount } from 'enzyme';
import WrapRow from './WrapRow';

const defaultProps = {
    'data-id': 'test-row',
    children: 'Test',
};
const getComponent = props => mount(<WrapRow {...defaultProps} {...props} />);

describe('WrapRow', () => {
    it('renders a WrapRow', () => {
        const wrapper = getComponent();
        const row = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(row.exists()).toEqual(true);
    });
});
