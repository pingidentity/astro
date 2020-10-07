import React from 'react';
import { mount } from 'enzyme';
import Popup from './Popup';
import Button from '../Button';

describe('Popup', () => {
    it('renders open popup', () => {
        const wrapper = mount(<Popup data-id="test-popup" isOpen />);
        const popup = wrapper.find('div[data-id="test-popup"]');

        expect(popup.exists()).toBeTruthy();
    });

    it('renders open popup with title, children, and button', () => {
        const wrapper = mount(
            <Popup
                data-id="test-popup"
                isOpen
                title="The Title"
                buttons={<Button>Save</Button>}
            >
                The Children
            </Popup>,
        );
        const popup = wrapper.find('div[data-id="test-popup"]');
        const cancelButton = wrapper.find(Button).at(1);

        expect(popup.exists()).toBeTruthy();
        expect(cancelButton.text()).toBe('Cancel');
    });

    it('renders without the cancel button', () => {
        const wrapper = mount(
            <Popup
                data-id="test-popup"
                isOpen
                title="The Title"
                buttons={<Button>Save</Button>}
                hasNoCancel
            >
                The Children
            </Popup>,
        );
        const popup = wrapper.find('div[data-id="test-popup"]');
        const cancelButton = wrapper.find(Button).at(1);

        expect(popup.exists()).toBeTruthy();
        expect(cancelButton.exists()).toBeFalsy();
    });

    it('renders without the close (x) button', () => {
        const wrapper = mount(
            <Popup
                data-id="test-popup"
                isOpen
                title="The Title"
                buttons={<Button>Save</Button>}
                hasNoClose
            >
                The Children
            </Popup>,
        );
        const popup = wrapper.find('div[data-id="test-popup"]');
        const closeButton = wrapper.find('button[aria-label="Close"]');

        expect(popup.exists()).toBeTruthy();
        expect(closeButton.exists()).toBeFalsy();
    });

    it('renders closed popup', () => {
        const wrapper = mount(<Popup data-id="test-popup" />);
        const popup = wrapper.find('div[data-id="test-popup"]');

        expect(popup.exists()).toBeFalsy();
    });
});
