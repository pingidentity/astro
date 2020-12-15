import React from 'react';
import { mount } from 'enzyme';
import ProfilePicture from './ProfilePicture';
import Icon from '../Icon';

const defaultProps = {
    'data-id': 'test-picture',
    src: 'https://randomuser.me/api/portraits/lego/8.jpg',
};
const getComponent = props => mount(<ProfilePicture {...defaultProps} {...props} />);

describe('Profile Picture', () => {
    it('renders the picture in the default state', () => {
        const wrapper = getComponent();
        const picture = wrapper.find('img');

        expect(picture.exists()).toEqual(true);
    });

    it('renders the picture at a different size', () => {
        const wrapper = getComponent({ size: 70 });
        const picture = wrapper.find('div[data-id="test-picture"]');

        expect(picture).toHaveStyleRule('width', '70px');
    });

    it('renders the placeholder Icon', () => {
        const wrapper = getComponent({ src: undefined });
        const picture = wrapper.find('img');

        expect(picture.exists()).toEqual(false);

        const icon = wrapper.find(Icon);
        expect(icon.exists()).toEqual(true);
    });
});
