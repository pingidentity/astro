import React from 'react';
import { shallow } from 'enzyme';
import FieldMessage from './FieldMessage';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-fieldMessage',
    children: 'Error message'
};
const getComponent = props => shallow(<FieldMessage {...defaultProps} {...props} />);

describe('FieldMessage', () => {
    it('renders the FieldMessage in the default state', () => {
        const wrapper = getComponent();

        expect(wrapper.exists()).toEqual(true);
    });

    it('renders the FieldMessage with the error state', () => {
        const wrapper = getComponent({
            type: 'error',
        });
        const fieldMessage = wrapper.find('.field-message--error');

        expect(fieldMessage.exists()).toEqual(true);
    });

    it('renders the FieldMessage with the success state', () => {
        const wrapper = getComponent({
            type: 'success',
        });
        const fieldMessage = wrapper.find('.field-message--success');

        expect(fieldMessage.exists()).toEqual(true);
    });
});
