import React from 'react';
import SaveableTextInput from './SaveableTextInput';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

const testId = 'test-saveabletextinput';
const defaultProps = {
    'data-id': testId,
    'data-testid': testId,
};

const getComponent = (props = {}) => render((
    <SaveableTextInput {...defaultProps} {...props} />
  ));

describe('SaveableTextInput', () => {
    it('clicking the save button triggers onSave', () => {
        const testFn = jest.fn();
        getComponent({
            onSave: testFn,
        });

        const buttons = screen.getAllByRole('button');
        const saveButton = buttons[0];

        fireEvent.click(saveButton);
        expect(testFn).toHaveBeenCalled();
    });

    it('clicking the cancel button triggers onCancel', () => {
        const testFn = jest.fn();
        getComponent({
            onCancel: testFn,
        });

        const buttons = screen.getAllByRole('button');
        const cancelButton = buttons[1];

        fireEvent.click(cancelButton);
        expect(testFn).toHaveBeenCalled();
    });

    it('onCancel is triggered by keyboard events', () => {
        const testFn = jest.fn();
        getComponent({ onCancel: testFn });

        const buttons = screen.getAllByRole('button');
        const cancelButton = buttons[1];

        userEvent.type(cancelButton, '{Enter}');
        expect(testFn).toHaveBeenCalled();

        userEvent.type(cancelButton, '{Space}');
        expect(testFn).toHaveBeenCalled();
    });

    it('onSave is triggered by keyboard events', () => {
        const testFn = jest.fn();
        getComponent({
            onSave: testFn,
        });

        const buttons = screen.getAllByRole('button');
        const saveButton = buttons[0];

        userEvent.type(saveButton, '{Enter}');
        expect(testFn).toHaveBeenCalled();

        userEvent.type(saveButton, '{Space}');
        expect(testFn).toHaveBeenCalled();
    })
});
