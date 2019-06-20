import React from 'react';
import { shallow } from 'enzyme';
import FormRow from '../FormRow';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-formrow',
};
const getComponent = props => shallow(<FormRow {...defaultProps} {...props} />);

describe('FormRow', () => {
    it('renders the FormRow in the default state', () => {
        const wrapper = getComponent();
        const formrow = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(formrow.exists()).toEqual(true);
    });
});
