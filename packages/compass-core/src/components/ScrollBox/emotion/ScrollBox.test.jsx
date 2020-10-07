import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import ScrollBox from './ScrollBox';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

const defaultProps = {
    'data-id': 'test-scroll-box',
    children: 'Test',
};
const getComponent = props => mount(<ScrollBox {...defaultProps} {...props} />);

describe('ScrollBox', () => {
    it('renders the ScrollBox in the default state', () => {
        const wrapper = getComponent();
        const component = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(component.exists()).toEqual(true);
    });

    it('shows scrolling indicators', () => {
        const component = getComponent({});

        const outerComponent = component.find(`div[data-id="${defaultProps['data-id']}"]`);
        const innerComponent = outerComponent.childAt(0);
        const outer = outerComponent.getDOMNode();
        const inner = innerComponent.getDOMNode();

        Object.defineProperty(outer, 'clientHeight', {
            value: 200,
            writable: false,
        });
        Object.defineProperty(inner, 'scrollHeight', {
            value: 500,
            writable: false,
        });
        inner.scrollTop = 50;

        innerComponent.simulate('scroll');

        const topShadow = component.findWhere(div => div.key() === 'top-shadow');
        const bottomShadow = component.findWhere(div => div.key() === 'bottom-shadow');

        expect(topShadow).toHaveStyleRule('visibility', 'visible');
        expect(bottomShadow).toHaveStyleRule('visibility', 'visible');
    });

    it('renders the ScrollBox in stretch mode', () => {
        const wrapper = getComponent({ isStretched: true });
        const innerDiv = wrapper.find(`div[data-id="${defaultProps['data-id']}"] div`);

        expect(innerDiv).toHaveStyleRule('position', 'absolute');
    });
});
