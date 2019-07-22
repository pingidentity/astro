
import React from 'react';
import { mount } from 'enzyme';
import Dropdown from './Dropdown';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-dropdown',
};
const getComponent = props => mount(<Dropdown {...defaultProps} {...props} />);

describe('Dropdown', () => {
    it('renders the Dropdown in the default state', () => {
        const wrapper = getComponent();
        const dropdown = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(dropdown.exists()).toEqual(true);
    });
    it('renders elements in the Dropdown', () => {
        const wrapper = getComponent({
            options: [
                'Foo',
                'Bar',
            ],
        });

        const items = wrapper.find(`div[data-id="${defaultProps['data-id']}"] > select > option`);

        expect(items.length).toEqual(2);
    });
});
