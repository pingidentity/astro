import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-form',
};
const getComponent = props => shallow(<Form {...defaultProps} {...props} />);

describe('Form', () => {
    it('renders the Form in the default state', () => {
        const wrapper = getComponent();
        const form = wrapper.find(`form[data-id="${defaultProps['data-id']}"]`);

        expect(form.exists()).toEqual(true);
    });

    it('renders the Form with the margin prop', () => {
        const wrapper = getComponent({
            margin: 'small',
        });
        const form = wrapper.find('.form--margin-small');

        expect(form.exists()).toEqual(true);
    });

    it('renders the Form with the spacing prop', () => {
        const wrapper = getComponent({
            spacing: 'large',
        });
        const form = wrapper.find('.form--spacing-lg');

        expect(form.exists()).toEqual(true);
    });
});
