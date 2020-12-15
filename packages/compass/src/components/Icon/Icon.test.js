import React from 'react';
import { mount } from 'enzyme';
import PlusSVG from '@mdi/svg/svg/plus.svg';
import Icon, { makeIcon } from './Icon';

const MockComponent = props => <span {...props} />;

const defaultProps = {
    'data-id': 'test-Icon',
    children: 'Test',
    component: MockComponent,
};
const getComponent = props => mount(<Icon {...defaultProps} {...props} />);

describe('Icon', () => {
    it('renders the icon in the default state', () => {
        const wrapper = getComponent();
        const icon = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(icon.exists()).toEqual(true);
    });

    it('renders a custom-built icon', () => {
        const CustomIcon = makeIcon(PlusSVG, 'plus');
        const wrapper = mount(<CustomIcon data-id={defaultProps['data-id']} />);

        const icon = wrapper.find(`svg[data-id="${defaultProps['data-id']}"]`);

        expect(icon.exists()).toEqual(true);
    });

    it('renders the icon with a background color', () => {
        const wrapper = getComponent({ bg: '#ff0000' });
        const icon = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(icon).toHaveStyleRule('background', '#ff0000');
    });

    it('renders the icon with set width and height', () => {
        const wrapper = getComponent({ size: 30 });
        const icon = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(icon).toHaveStyleRule('width', '30px');
        expect(icon).toHaveStyleRule('height', '30px');
    });
});
