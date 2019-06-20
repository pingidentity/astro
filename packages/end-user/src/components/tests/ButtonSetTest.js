
import React from 'react';
import { shallow } from 'enzyme';
import ButtonSet from '../ButtonSet';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-buttonset',
};
const getComponent = props => shallow(<ButtonSet {...defaultProps} {...props} />);

describe('ButtonSet', () => {
    it('renders the ButtonSet in the default state', () => {
        const wrapper = getComponent();
        const buttonset = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(buttonset.exists()).toEqual(true);
    });
});
