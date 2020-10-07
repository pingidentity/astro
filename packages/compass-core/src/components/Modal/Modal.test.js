import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

jest.mock('react-portal');

const defaultProps = {
    'data-id': 'test-Modal',
    children: 'Test',
};
const getComponent = props => mount(<Modal {...defaultProps} {...props} />);

describe('Modal', () => {
    it('renders the Modal in the default state', () => {
        const wrapper = getComponent();
        const modal = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(modal.exists()).toEqual(true);
    });
});
