import React from 'react';
import { mount } from 'enzyme';
import Popover from './Popover';

jest.mock('react-portal');

const defaultProps = {
    'data-id': 'test-popover',
    children: 'Test',
};
const getComponent = props => mount(<Popover {...defaultProps} {...props} />);

const getButton = wrapper => wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);
const getPopper = wrapper => wrapper.find(`div[data-parent="${defaultProps['data-id']}"]`);

describe('Popover', () => {
    it('renders the popover in the default state', () => {
        const wrapper = getComponent();
        expect(getButton(wrapper).exists()).toEqual(true);
        expect(getPopper(wrapper).exists()).toEqual(false);
    });

    it('opens the popover with a click', () => {
        const wrapper = getComponent();
        getButton(wrapper).simulate('click');
        expect(getPopper(wrapper).exists()).toEqual(true);
    });

    it('opens the popover with isOpen prop', () => {
        const wrapper = getComponent({ isOpen: true });
        expect(getPopper(wrapper).exists()).toEqual(true);
    });

    it('closes the popover with another click', () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();
        const wrapper = getComponent({ onOpen, onClose });

        expect(onOpen).toHaveBeenCalledTimes(0);
        expect(onClose).toHaveBeenCalledTimes(0);

        getButton(wrapper).simulate('click');
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(getPopper(wrapper).exists()).toEqual(true);

        getButton(wrapper).simulate('click');
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(getPopper(wrapper).exists()).toEqual(false);
    });

    it('closes the popover from button inside content', () => {
        const wrapper = getComponent(
            {
                children: popoverProps => (
                    <button onClick={popoverProps.onClose} data-id="close-button">Close Me</button>
                ),
            },
        );

        getButton(wrapper).simulate('click');
        expect(getPopper(wrapper).exists()).toEqual(true);

        wrapper.find('button[data-id="close-button"]').simulate('click');
        expect(getPopper(wrapper).exists()).toEqual(false);
    });
});
