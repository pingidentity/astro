import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import Modal, { ModalOverlay } from './Modal';

// Add the custom matchers provided by 'jest-emotion'
// TODO: remove this when UIP-3541 goes in
expect.extend(matchers);

const defaultProps = {
    'data-id': 'test-Modal',
    children: 'Test',
};
const getComponent = props => mount(<Modal {...defaultProps} {...props} />);

describe('Modal (Emotion)', () => {
    it('renders the Modal in the default state', () => {
        const wrapper = getComponent();
        const modal = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(modal.exists()).toEqual(true);
        expect(modal).toHaveStyleRule('left', '50%');
    });

    it('renders the Modal not centered', () => {
        const wrapper = getComponent({ isNotCentered: true });
        const modal = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(modal.exists()).toEqual(true);
        expect(modal).not.toHaveStyleRule('left', '50%');
    });

    it('renders the Modal Overlay with a color and opacity', () => {
        const wrapper = mount(<ModalOverlay color="white" opacity={0.9} />);
        const overlay = wrapper.find(ModalOverlay);

        expect(overlay.exists()).toEqual(true);
        expect(overlay).toHaveStyleRule('background', 'white');
        expect(overlay).toHaveStyleRule('opacity', '0.9');
    });
});
