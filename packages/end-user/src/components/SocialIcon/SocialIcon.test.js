import React from 'react';
import { mount } from 'enzyme';
import SocialIcon from './SocialIcon';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-socialicon',
    label: 'Test SocialIcon',
};
const getComponent = props => mount(<SocialIcon.GOOGLE {...defaultProps} {...props} />);

describe('SocialIcon', () => {
    it('renders the SocialIcon in the default state', () => {
        const wrapper = getComponent();
        const icon = wrapper.find('svg');

        expect(icon.exists()).toEqual(true);
    });
});
