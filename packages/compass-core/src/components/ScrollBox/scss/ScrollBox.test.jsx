import React from 'react';
import { mount } from 'enzyme';
import ScrollBox from './ScrollBox';

const defaultProps = {
    'data-id': 'test-ScrollBox',
    children: 'Test',
};
const getComponent = props => mount(<ScrollBox {...defaultProps} {...props} />);

describe('ScrollBox', () => {
    it('renders the ScrollBox in the default state', () => {
        const wrapper = getComponent();
        const component = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(component.exists()).toEqual(true);
    });
});
