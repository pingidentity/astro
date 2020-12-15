import React from 'react';
import { mount } from 'enzyme';
import Pipe from './Pipe';

const defaultProps = {
    'data-id': 'test-pipe',
};
const getComponent = props => mount(<Pipe {...defaultProps} {...props} />);

describe('Pipe', () => {
    it('renders the Pipe in the default state', () => {
        const wrapper = getComponent({});
        const pipe = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(pipe.exists()).toEqual(true);
    });
});
