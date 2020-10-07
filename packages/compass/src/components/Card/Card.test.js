import React from 'react';
import { mount } from 'enzyme';

import Card, { Content, Header } from './Card';
import { accent } from '../../styles/colors';

const defaultProps = {
    'data-id': 'test-card',
    children: 'test',
};
const getComponent = props => mount(<Card {...defaultProps} {...props} />);

describe('Card', () => {
    it('renders the card in the default state', () => {
        const wrapper = getComponent();
        const card = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const content = wrapper.find(Content);
        const header = wrapper.find(Header);


        expect(card.exists()).toBe(true);
        expect(content.exists()).toBe(true);
        expect(content.text()).toBe(defaultProps.children);
        expect(header.exists()).toBe(false);
    });

    it('renders the card with a header', () => {
        const customProps = { header: 'test header' };
        const wrapper = getComponent(customProps);
        const card = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const content = wrapper.find(Content);
        const header = wrapper.find(Header);

        expect(card.exists()).toBe(true);
        expect(content.exists()).toBe(true);
        expect(header.exists()).toBe(true);
        expect(header.text()).toBe(customProps.header);
        expect(header).toHaveStyleRule('background-color', accent[95]);
    });

    it('renders the card with custom components', () => {
        const CustomHeader = () => <div data-id="custom-header">Header</div>;
        const CustomContent = () => <div data-id="custom-content">Content</div>;
        const customProps = { header: <CustomHeader />, children: <CustomContent /> };
        const wrapper = getComponent(customProps);
        const content = wrapper.find(Content);
        const header = wrapper.find(Header);

        expect(header.exists()).toBe(true);
        expect(wrapper.find('[data-id="custom-header"]')).toHaveLength(1);
        expect(content.exists()).toBe(true);
        expect(wrapper.find('[data-id="custom-content"]')).toHaveLength(1);
    });
});
