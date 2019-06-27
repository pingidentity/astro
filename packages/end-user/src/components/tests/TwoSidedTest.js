import React from 'react';
import { shallow } from 'enzyme';
import TwoSided from '../TwoSided';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-twosided',
};
const getComponent = props => shallow(
    <TwoSided {...defaultProps} {...props}>
        <div>Side One</div>
        <div>Side Two</div>
    </TwoSided>);

describe('TwoSided', () => {
    it('renders the TwoSided in the default state', () => {
        const wrapper = getComponent();
        const twosided = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(twosided.exists()).toEqual(true);
    });

    it('flips the TwoSided when the prop is set', () => {
        const wrapper = getComponent({
            flipped: true,
        });
        const twosided = wrapper.find('.two-sided--flipped');

        expect(twosided.exists()).toEqual(true);
    });
});
