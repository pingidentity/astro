import React from 'react';
import { mount } from 'enzyme';
import DividedBox from './DividedBox';

const defaultProps = {
    'data-id': 'test-box',
    children: [
        <div key="1">One</div>,
        <div key="2">Two</div>,
        <div key="3">Three</div>,
    ],
};
const getComponent = props => mount(<DividedBox {...defaultProps} {...props} />);

describe('Divided Box', () => {
    it('renders the divided box in the default state', () => {
        const wrapper = getComponent();
        const box = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(box.exists()).toEqual(true);
        expect(box).toHaveStyleRule('flex-direction', 'column');
    });

    it('renders the divided box as a row', () => {
        const wrapper = getComponent({ isRow: true });
        const box = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(box.exists()).toEqual(true);
        expect(box).toHaveStyleRule('flex-direction', 'row');
    });
});
