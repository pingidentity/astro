import React from 'react';
import { mount } from 'enzyme';
import ModalMenu from '../ModalMenu';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'modal-menu',
    options: [{
        id: 'sms',
        label: 'SMS',
        sublabel: '+972 3xx-xxx-x03',
        icon: 'sms',
        selected: true,
    }, {
        id: 'email',
        label: 'Email',
        sublabel: 'adxxxx@pingidentity.com',
        icon: 'email',
    }],
};

const getComponent = props => mount(<ModalMenu {...defaultProps} {...props} />);

describe('TextInput', () => {
    it('renders the ModalMenu in the default state', () => {
        const wrapper = getComponent();
        const modal = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(modal.exists()).toEqual(true);
        expect(modal.props().value).toEqual(defaultProps.value);
    });

    it('calls the onChange', () => {
        const testCallback = jest.fn();

        const wrapper = getComponent({ onChange: testCallback });
        const modal = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(modal.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        wrapper.find('.modal-menu__button').first().simulate('click');

        expect(testCallback).toHaveBeenCalled();
    });
});
