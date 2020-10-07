import React from 'react';
import { mount } from 'enzyme';
import RadioBoxBlank from '@mdi/svg/svg/radiobox-blank.svg';
import RadioBoxMarked from '@mdi/svg/svg/radiobox-marked.svg';

import RadioButton from './RadioButton';

const defaultRadioButtonProps = {
    'data-id': 'test-radio',
    label: 'This is a test radio',
    value: 'choice1',
    name: 'group1',
};
const getRadioButton = props => mount(<RadioButton {...defaultRadioButtonProps} {...props} />);

describe('RadioButton', () => {
    it('renders the radio button in the default state', () => {
        const wrapper = getRadioButton({});
        const radio = wrapper.find(`input[data-id="${defaultRadioButtonProps['data-id']}"]`);
        const uncheckedIcon = wrapper.find(RadioBoxBlank);

        expect(uncheckedIcon.exists()).toEqual(true);
        expect(radio.exists()).toEqual(true);
    });

    it('renders the radio button in the checked state', () => {
        const wrapper = getRadioButton({
            isDefaultChecked: true,
        });
        const radio = wrapper.find(`input[data-id="${defaultRadioButtonProps['data-id']}"]`);
        const checkedIcon = wrapper.find(RadioBoxMarked);

        expect(checkedIcon.exists()).toEqual(true);
        expect(radio.exists()).toEqual(true);
    });

    it('shows the content on a checked radio button', () => {
        const wrapper = getRadioButton({
            isDefaultChecked: true,
            checkedContent: (
                <div data-id="checked-content">YOOO</div>
            ),
        });
        const radio = wrapper.find(`input[data-id="${defaultRadioButtonProps['data-id']}"]`);
        const checkedContent = wrapper.find('div[data-id="checked-content"]');

        expect(checkedContent.exists()).toEqual(true);
        expect(radio.exists()).toEqual(true);
    });
});
