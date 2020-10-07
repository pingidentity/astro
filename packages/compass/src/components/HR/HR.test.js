import React from 'react';
import { mount } from 'enzyme';
import HR from './HR';

const defaultProps = {
    'data-id': 'test-rule',
};
const getComponent = props => mount(<HR {...defaultProps} {...props} />);

describe('HR', () => {
    it('renders the horizontal rule in the default state', () => {
        const wrapper = getComponent();
        const div = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(div.exists()).toEqual(true);
    });

    it('customizes the gap and color for the rule', () => {
        const wrapper = getComponent({ gap: 'xl', color: 'black' });
        const div = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const hr = div.find('hr');

        expect(div).toHaveStyleRule('padding-top', '40px');
        expect(hr).toHaveStyleRule('border-color', '#000');
    });
});
