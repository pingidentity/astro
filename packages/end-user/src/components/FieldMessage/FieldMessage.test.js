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
            status: 'error',
        });
        const fieldMessage = wrapper.find('.field-message--error');

        expect(fieldMessage.exists()).toEqual(true);
    });

    it('renders the FieldMessage with the info state', () => {
        const wrapper = getComponent({
            status: 'info',
        });
        const fieldMessage = wrapper.find('.field-message--info');

        expect(fieldMessage.exists()).toEqual(true);
    });

    it('renders the FieldMessage with the success state', () => {
        const wrapper = getComponent({
            status: 'success',
        });
        const fieldMessage = wrapper.find('.field-message--success');

        expect(fieldMessage.exists()).toEqual(true);
    });

    it('renders the FieldMessage with the warning state', () => {
        const wrapper = getComponent({
            status: 'warning',
        });
        const fieldMessage = wrapper.find('.field-message--warning');

        expect(fieldMessage.exists()).toEqual(true);
    });
});
