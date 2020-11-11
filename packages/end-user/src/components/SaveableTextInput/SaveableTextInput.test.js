import React from 'react';
import { shallow } from 'enzyme';
import SaveableTextInput from './SaveableTextInput';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-saveabletextinput',
};
const getComponent = props => shallow(<SaveableTextInput {...defaultProps} {...props} />);

describe('SaveableTextInput', () => {
    it('renders the SaveableTextInput in the default state', () => {
        const wrapper = getComponent({
            isOpen: true,
        });
        const saveableTextInput = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(saveableTextInput.exists()).toEqual(true);
    });

    it('clicking the save button triggers onSave', () => {
        const testFn = jest.fn();
        const wrapper = getComponent({
            onSave: testFn,
        });

        const saveButton = wrapper.find('.saveable-textinput__save');
        saveButton.simulate('click');
        expect(testFn).toHaveBeenCalled();
    });

    it('clicking the cancel button triggers onCancel', () => {
        const testFn = jest.fn();
        const wrapper = getComponent({
            onCancel: testFn,
        });

        const cancelButton = wrapper.find('.saveable-textinput__cancel');
        cancelButton.simulate('click');
        expect(testFn).toHaveBeenCalled();
    });
});
