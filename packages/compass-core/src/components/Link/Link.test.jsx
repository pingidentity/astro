import React from 'react';
import { mount } from 'enzyme';
import Link, { LinkProvider } from './Link';

const defaultProps = {
    'data-id': 'test-link',
    children: 'Test',
};
const getComponent = props => mount(<Link {...defaultProps} {...props} />);

describe('Link', () => {
    it('renders a link', () => {
        const wrapper = getComponent({ href: '/nowhere' });
        const link = wrapper.find(`a[data-id="${defaultProps['data-id']}"]`);

        expect(link.exists()).toEqual(true);
    });

    it('renders a button', () => {
        const wrapper = getComponent();
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
    });

    it('uses LinkProvider\'s onClick', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <LinkProvider onClick={callback}>
                <Link href="/nowhere" data-id="test-link">Click me</Link>
            </LinkProvider>,
        );
        const link = wrapper.find('a[data-id="test-link"]');

        expect(callback).not.toBeCalled();
        link.simulate('click');
        expect(callback).toBeCalled();
    });
});
