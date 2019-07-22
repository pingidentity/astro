import React from 'react';
import { mount } from 'enzyme';
import Logo from './Logo';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'logo-image',
};
const getComponent = props => mount(<Logo {...defaultProps} {...props} />);

describe('Logo', () => {
    it('renders the logo', () => {
        const wrapper = getComponent({
            src: 'http://placekitten.com/200/200'
        });
        const component = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(component.exists()).toEqual(true);
        expect(component.find('img').prop('src')).toEqual('http://placekitten.com/200/200');
    });
});
