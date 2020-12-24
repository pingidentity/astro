import React from 'react';
import { mount } from 'enzyme';
import PopoverMenu from './PopoverMenu';

window.__DEV__ = true;
jest.mock('popper.js');
const defaultProps = {
    'data-id': 'test-popovermenu',
};
const getComponent = props => mount(<PopoverMenu {...defaultProps} {...props} />);

describe('PopoverMenu', () => {
    it('renders the PopoverMenu in the open state', () => {
        const wrapper = getComponent({
            isOpen: true,
        });
        const popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(popovermenu.exists()).toEqual(true);
    });

    it('does not render the PopoverMenu in the closed state', () => {
        const wrapper = getComponent({
            isOpen: false,
        });
        const popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(popovermenu.exists()).toEqual(false);
    });

    it('clicking the control button toggles the PopoverMenu', () => {
        const testFn = jest.fn();
        const wrapper = getComponent({
            isOpen: false,
            buttons: [{
                id: 'testButton',
                label: 'Test Button',
                onClick: testFn,
            }],
        });

        let popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toEqual(false);

        const kebabButton = wrapper.children().find('button.popover-menu__control');
        kebabButton.simulate('click');

        popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toEqual(true);
    });

    it('clicking an option closes the PopoverMenu', () => {
        const testFn = jest.fn();
        const wrapper = getComponent({
            isOpen: true,
            buttons: [{
                id: 'testButton',
                label: 'Test Button',
                onClick: testFn,
            }],
        });

        let popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toEqual(true);

        const button = popovermenu.find('button.popover-menu__item');
        button.simulate('click');

        popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toEqual(false);
    });
});
