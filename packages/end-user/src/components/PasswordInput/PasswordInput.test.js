import React from 'react';
import { shallow } from 'enzyme';
import PasswordInput from './PasswordInput';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-passwordinput',
};
const getComponent = props => shallow(<PasswordInput {...defaultProps} {...props} />);

describe('PasswordInput', () => {
    it('renders the PasswordInput in the default state', () => {
        const wrapper = getComponent();
        const passwordinput = wrapper.find(`input[data-id="${defaultProps['data-id']}"]`);

        expect(passwordinput.exists()).toEqual(true);
    });
});
