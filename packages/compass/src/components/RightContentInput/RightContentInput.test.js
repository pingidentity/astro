import React from 'react';
import { mount } from 'enzyme';
import RightContentInput from './RightContentInput';
import { CheckSVG } from '../Icons';

const defaultProps = {
    'data-id': 'test-RightContentInput',
    label: 'Test',
    value: 'test value',
};
const getComponent = props => mount(<RightContentInput {...defaultProps} {...props} />);

describe('RightContentInput', () => {
    it('renders the RightContentInput in the default state', () => {
        const wrapper = getComponent();

        const input = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);
        expect(input.exists()).toEqual(true);
    });

    it('renders the RightContentInput with an icon on the right', () => {
        const wrapper = getComponent({ rightContent: <CheckSVG data-id="test-icon" /> });
        const icon = wrapper.find('svg[data-id="test-icon"]');

        expect(icon.exists()).toEqual(true);
    });
});
