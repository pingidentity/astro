import React from 'react';
import { mount } from 'enzyme';
import DropDownList from './DropDownList';
import DropDownOption from './DropDownOption';

const someOptions = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'].map((label, value) => ({ label, value }));

const defaultProps = {
    'data-id': 'test-DropDownList',
    options: someOptions,
};
const getComponent = props => mount(<DropDownList {...defaultProps} {...props} />);

describe('DropDownList', () => {
    it('renders the DropDownList in the default state', () => {
        const wrapper = getComponent({});
        const dropdown = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(dropdown.exists()).toEqual(true);
    });

    it('renders the DropDownList with children', () => {
        const wrapper = getComponent({
            options: [],
            children: [
                <DropDownOption value={0} key="0">Zero</DropDownOption>,
                <DropDownOption value={1} key="1">One</DropDownOption>,
            ],
        });
        const options = wrapper.find('option');

        expect(options.length).toEqual(2);
    });

    it('fires the onValueChange callback', () => {
        const callback = jest.fn();
        const wrapper = getComponent({ onValueChange: value => callback(value) });
        const dropdown = wrapper.find(`span[data-id="${defaultProps['data-id']}"] select`);

        expect(callback).not.toBeCalled();
        dropdown.simulate('change', { target: { value: 'newvalue' } });
        expect(callback).toBeCalledWith('newvalue');
    });

    it('renders the DropDownList with only values', () => {
        const wrapper = getComponent({ options: [{ value: 'uno' }, { value: 'dos' }] });
        const dropdown = wrapper.find(`span[data-id="${defaultProps['data-id']}"]`);

        expect(dropdown.exists()).toEqual(true);
    });

    it('renders the DropDownList with an id', () => {
        const wrapper = getComponent({ id: 'this-one' });
        const dropdown = wrapper.find('select#this-one');

        expect(dropdown.exists()).toEqual(true);
    });

    it('renders the DropDownList with a none option', () => {
        const wrapper = getComponent({ hasNoneOption: true });
        const noneOption = wrapper.find('option[value=""]');

        expect(noneOption.exists()).toEqual(true);
    });
});
