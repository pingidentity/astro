import React from 'react';
import { mount } from 'enzyme';
import { matchers } from 'jest-emotion';
import TransitionRotate from './TransitionRotate';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

describe('TransitionRotate', () => {
    it('should render unrotated', () => {
        const wrapper = mount(<TransitionRotate><div>hi</div></TransitionRotate>);

        expect(wrapper.find(TransitionRotate)).toHaveStyleRule('transform', 'rotate(0deg)');
    });

    it('should render rotated', () => {
        const wrapper = mount(<TransitionRotate isRotated><div>hi</div></TransitionRotate>);

        expect(wrapper.find(TransitionRotate)).toHaveStyleRule('transform', 'rotate(-180deg)');
    });
});
