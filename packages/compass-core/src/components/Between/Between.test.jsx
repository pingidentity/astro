import React from 'react';
import { mount } from 'enzyme';
import Between from './Between';

const defaultProps = {
    'data-id': 'test-between',
    children: [
        <div key="1">One</div>,
        <div key="2">Two</div>,
        <div key="3">Three</div>,
    ],
    insert: <span data-el="insert" />,
};

const getComponent = props => mount(<Between {...defaultProps} {...props} />);

describe('Between', () => {
    it('renders two spans among the three elements', () => {
        const wrapper = getComponent();

        expect(wrapper.find('span[data-el="insert"]').length).toBe(2);
    });

    it('filters out null children and only renders the insert based on non-null children', () => {
        const wrapper = getComponent({
            children: [
                null,
                <div key="1">One</div>,
                null,
                <div key="2">Two</div>,
                null,
                <div key="3">Three</div>,
            ],
        });

        expect(wrapper.find('span[data-el="insert"]').length).toBe(2);
    });

    it('renders the given insert for the index - 1 among the three elements', () => {
        const insert = [<span data-el={0} />, <span data-el={1} />];
        const wrapper = getComponent({ insert });
        const spans = wrapper.find('span');

        expect(spans).toHaveLength(2);
        spans.forEach((el, index) => {
            expect(el.prop('data-el')).toBe(index);
        });
    });
});
