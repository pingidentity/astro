import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '../Checkbox';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'checkbox',
};

const getComponent = props => mount(<Checkbox {...defaultProps} {...props} />);

describe('Checkbox', () => {
    it('renders the Checkbox in the default state', () => {
        const wrapper = getComponent();
        const checkbox = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(checkbox.exists()).toEqual(true);
    });

    it('calls the onChange', () => {
        const testCallback = jest.fn();

        const wrapper = getComponent({ onChange: testCallback });
        const checkbox = wrapper.find(`label[data-id="${defaultProps['data-id']}"]`);

        expect(checkbox.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        wrapper.find('.checkbox__input').first().simulate('change');

        expect(testCallback).toHaveBeenCalled();
    });
});
