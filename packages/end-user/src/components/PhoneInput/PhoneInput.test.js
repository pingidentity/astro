import React from 'react';
import { mount } from 'enzyme';
import PhoneInput from './PhoneInput';
import CountryCodes from './countryCodes';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'phone-input',
};
const getComponent = props => mount(<PhoneInput {...defaultProps} {...props} />);

describe('PhoneInput', () => {
    it('renders the PhoneInput in the default state', () => {
        const wrapper = getComponent();
        const phoneInput = wrapper.find('[data-id="phone-input"]');

        expect(phoneInput.exists()).toEqual(true);
    });

    it('renders the PhoneInput in the default state', () => {
        const wrapper = getComponent();
        const phoneInput = wrapper.find('[data-id="phone-input"]');

        expect(phoneInput.exists()).toEqual(true);
    });

    it('doesn\'t allow alphas in phonenumber input', () => {
        const testCallback = jest.fn();
        const mockEvent = { target: { value: 'a' } };
        const wrapper = getComponent({ onChange: testCallback });
        const input = wrapper.find('.phone-input__number input');

        expect(input.exists()).toEqual(true);
        expect(testCallback).not.toHaveBeenCalled();

        input.simulate('change', mockEvent.target.value);
        expect(testCallback).not.toHaveBeenCalled();
    });

    it('populates country codes', () => {
        const wrapper = getComponent({
            dropdownOpen: true,
        });
        expect(wrapper.find('.dropdown__option').length).toEqual(CountryCodes.length);
    });

    it('filters country codes', () => {
        const wrapper = getComponent({
            dropdownOpen: true,
            dialCodeSearchValue: 'united',
        });
        expect(wrapper.find('.dropdown__option').length).toEqual(3);
    });
});
