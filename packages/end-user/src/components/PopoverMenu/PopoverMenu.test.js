import React from 'react';
import { mount } from 'enzyme';
import PopoverMenu from './PopoverMenu';
import 'mutationobserver-shim';

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

        const kebabButton = wrapper.children().find('.button.popover-menu__control');
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

    it('handles focus from toggle button to option and back', () => {
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
        
        expect(popovermenu.exists()).toBeFalsy();
        
        const kebabButton = wrapper.children().find('.button.popover-menu__control');
        kebabButton.simulate('click');
        popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toBeTruthy();
        expect(document.activeElement.className).toContain('popover-menu__item');
        
        const button = popovermenu.find('button.popover-menu__item');
        button.simulate('click');
        popovermenu = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        expect(popovermenu.exists()).toBeFalsy();
        expect(document.activeElement.className).toContain('popover-menu__control');
    });

    it("should let pass data-id to the PopoverMenu buttons", () => {
      const testDataId = "test-data-id";
      const wrapper = getComponent({
        isOpen: true,
        buttons: [
          {
            id: "testButton",
            label: "Test Button",
            "data-id": testDataId,
          },
        ],
      });
      expect(wrapper.find(`button[data-id="${testDataId}"]`).exists()).toEqual(
        true
      );
    });
});
