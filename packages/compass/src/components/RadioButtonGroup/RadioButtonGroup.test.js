import React from 'react';
import { mount } from 'enzyme';
import RadioButtonGroup from './RadioButtonGroup';
import RadioButton from '../RadioButton';

const defaultRadioGroupProps = {
    name: 'group1',
};
const getRadioGroup = props => mount(<RadioButtonGroup {...defaultRadioGroupProps} {...props} />);

describe('RadioButtonGroup', () => {
    it('renders a group of radio buttons with the same name', () => {
        const wrapper = getRadioGroup({
            name: 'something',
            children: [
                <RadioButton value="item1" />,
                <RadioButton value="item2" />,
            ],
        });
        const group = wrapper.find(RadioButtonGroup);
        const buttons = wrapper.find(RadioButton);

        expect(group.exists()).toEqual(true);
        buttons.map(btn => expect(btn.props().name).toEqual('something'));
        expect(buttons.length).toEqual(2);
    });

    it('renders a group of radio buttons with a default checked', () => {
        const wrapper = getRadioGroup({
            name: 'something',
            defaultChecked: 'item1',
            children: [
                <RadioButton value="item1" />,
                <RadioButton value="item2" />,
            ],
        });

        const button = wrapper.find(RadioButton).first();
        expect(button.props().isDefaultChecked).toEqual(true);
    });

    it('renders a group of radio buttons with a default checked', () => {
        const onValueChange = jest.fn();
        const wrapper = getRadioGroup({
            name: 'something',
            defaultChecked: 'item1',
            children: [
                <RadioButton value="item1" />,
                <RadioButton value="item2" />,
            ],
            onValueChange,
        });

        expect(onValueChange).toHaveBeenCalledTimes(0);
        const button = wrapper.find(RadioButton).last();
        button.props().onChange({ target: { value: 'item2' } });
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it('renders invalid react elements', () => {
        const wrapper = getRadioGroup({
            name: 'something',
            defaultChecked: 'item1',
            children: [
                ('hi'),
            ],
        });

        expect(wrapper.text()).toBe('hi');
    });
});
