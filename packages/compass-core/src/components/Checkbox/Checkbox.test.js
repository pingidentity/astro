import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

const defaultProps = {
    'data-id': 'test-checkbox',
};
const getComponent = props => render(<Checkbox {...defaultProps} {...props} />);

describe('Checkbox', () => {
    it('renders the checkbox in the default state', () => {
        getComponent();
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('data-id', defaultProps['data-id']);
        expect(checkbox).not.toBeChecked();
        expect(checkbox).not.toBeDisabled();
    });

    it('clicking the checkbox does not affect its state but sends up the DOM change', () => {
        const onChange = jest.fn();
        getComponent({ onChange });
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenNthCalledWith(1, true, expect.anything());
        expect(checkbox).not.toBeChecked();
    });

    it('setting the checked state via props does not affect behavior', () => {
        const onChange = jest.fn();
        getComponent({ isChecked: true, onChange });
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenNthCalledWith(1, false, expect.anything());
        expect(checkbox).toBeChecked();
    });

    it('sets the disabled state', () => {
        getComponent({ isDisabled: true });
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeDisabled();
    });
});
