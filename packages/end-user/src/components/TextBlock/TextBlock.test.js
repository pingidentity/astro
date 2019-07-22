import React from 'react';
import { shallow } from 'enzyme';
import TextBlock from './TextBlock';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-textblock',
};
const getComponent = props => shallow(<TextBlock {...defaultProps} {...props} />);

describe('TextBlock', () => {
    it('renders the TextBlock in the default state', () => {
        const wrapper = getComponent();
        const textblock = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(textblock.exists()).toEqual(true);
    });

    it('renders the TextBlock with the size prop', () => {
        const wrapper = getComponent({
            size: 'small',
        });
        const textblock = wrapper.find('.text-block--small');

        expect(textblock.exists()).toEqual(true);
    });

    it('renders the TextBlock with the spacing prop', () => {
        const wrapper = getComponent({
            spacing: 'xxlarge',
        });
        const textblock = wrapper.find('.text-block--margin-xx');

        expect(textblock.exists()).toEqual(true);
    });
});
