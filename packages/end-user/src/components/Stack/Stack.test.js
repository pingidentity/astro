import React from 'react';
import { shallow } from 'enzyme';
import Stack from './Stack';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-stack',
};
const getComponent = props => shallow(<Stack {...defaultProps} {...props} />);

describe('Stack', () => {
    it('renders the Stack in the default state', () => {
        const wrapper = getComponent();
        const stack = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(stack.exists()).toEqual(true);
    });
});
