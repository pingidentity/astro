import React from 'react';
import { mount } from 'enzyme';
import CloseButton from './CloseButton';

const defaultProps = {
    'data-id': 'test-button',
    children: 'Test',
};
const getComponent = props => mount(<CloseButton {...defaultProps} {...props} />);

describe('CloseButton', () => {
    it('renders the CloseButton in the default state', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
    });
});
