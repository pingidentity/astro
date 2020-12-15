import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

const defaultProps = {
    'data-testid': 'test-checkbox',
    'data-id': 'test-checkbox',
};
const getComponent = props => render(<Checkbox {...defaultProps} {...props} />);

describe('Checkbox', () => {
    it('renders the checkbox in the default state', () => {
        getComponent();
        const label = screen.getByTestId(defaultProps['data-testid']);
        const checkbox = screen.getByRole('checkbox');

        expect(label).toHaveAttribute('data-id', defaultProps['data-id']);
        expect(checkbox).toHaveStyleRule('opacity', '0');
        expect(screen.getByTestId('checkbox-blank')).toBeVisible();
        expect(screen.getByTestId('checkbox-marked')).not.toBeVisible();
    });

    it('renders the checkbox correctly when default checked', () => {
        getComponent({ isDefaultChecked: true });
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveStyleRule('opacity', '0');
        expect(screen.getByTestId('checkbox-blank')).not.toBeVisible();
        expect(screen.getByTestId('checkbox-marked')).toBeVisible();
    });

    it('renders the checkbox with a label', () => {
        const label = 'Test';
        getComponent({ label });
        const checkbox = screen.getByLabelText(label);
        expect(checkbox).toBeInTheDocument();
    });

    it('invokes the onChange callback properly when unchecked', () => {
        const onChange = jest.fn();
        getComponent({ onChange });
        const checkbox = screen.getByRole('checkbox');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenNthCalledWith(1, true, expect.anything());
    });

    it('invokes the onChange callback properly when checked', () => {
        const onChange = jest.fn();
        getComponent({ isChecked: true, onChange });
        const checkbox = screen.getByRole('checkbox');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(checkbox);
        expect(onChange).toHaveBeenNthCalledWith(1, false, expect.anything());
    });
});
