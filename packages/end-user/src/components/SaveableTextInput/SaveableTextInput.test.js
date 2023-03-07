import React from 'react';
import SaveableTextInput from './SaveableTextInput';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

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

        act(() => { userEvent.click(saveButton); });

        expect(testFn).toHaveBeenCalled();
    });

    it('clicking the cancel button triggers onCancel', () => {
        const testFn = jest.fn();
        getComponent({
            onCancel: testFn,
        });

        const buttons = screen.getAllByRole('button');
        const cancelButton = buttons[1];

        act(() => { userEvent.click(cancelButton); });
        expect(testFn).toHaveBeenCalled();
    });

    it('onCancel is triggered by keyboard events', () => {
        const testFn = jest.fn();
        getComponent({ onCancel: testFn });

        const buttons = screen.getAllByRole('button');
        const cancelButton = buttons[1];

        act(() => { userEvent.type(cancelButton, '{Enter}'); });
        expect(testFn).toHaveBeenCalled();

        act(() => { userEvent.type(cancelButton, '{Space}'); });
        expect(testFn).toHaveBeenCalled();
    });

    it('onSave is triggered by keyboard events', () => {
        const testFn = jest.fn();
        getComponent({
            onSave: testFn,
        });

        const buttons = screen.getAllByRole('button');
        const saveButton = buttons[0];

        act(() => { userEvent.type(saveButton, '{Enter}'); });
        expect(testFn).toHaveBeenCalled();

        act(() => { userEvent.type(saveButton, '{Space}'); });
        expect(testFn).toHaveBeenCalled();
    })
});
