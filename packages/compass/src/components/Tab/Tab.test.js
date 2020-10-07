import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { active, neutral } from '../../styles/colors';

import Tab from './Tab';

const defaultProps = {
    'data-id': 'test-tab',
    label: 'Test',
    isSelected: false,
    value: 'test',
};
const getComponent = props => render(<Tab {...defaultProps} {...props} />);

describe('Tab', () => {
    it('renders the tab in the default state', () => {
        const { getByText, getByRole } = getComponent();
        const tab = getByRole('tab');

        expect(tab).toBeInTheDocument();
        expect(getByText(defaultProps.label)).toBeInTheDocument();
        expect(tab).toHaveAttribute('data-id', defaultProps['data-id']);
        expect(tab).toHaveAttribute('aria-controls', defaultProps.value);
        expect(tab).toHaveStyleRule('color', neutral[60]);
    });

    it('renders an active tab', () => {
        const { getByRole } = getComponent({ isSelected: true });
        const tab = getByRole('tab');

        expect(tab).toHaveStyleRule('color', active);
    });

    it('invokes onChange callback when the tab is interacted with', () => {
        const onChange = jest.fn();
        const { getByRole } = getComponent({ onChange });
        const tab = getByRole('tab');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(tab);
        expect(onChange).toHaveBeenNthCalledWith(1, { value: defaultProps.value });
        fireEvent.keyPress(tab, { key: 'Enter', code: 13, charCode: 13 });
        expect(onChange).toHaveBeenNthCalledWith(2, { value: defaultProps.value });
    });

    it('does not invoke onChange callback when the tab is selected and interacted with', () => {
        const onChange = jest.fn();
        const { getByRole } = getComponent({ onChange, isSelected: true });
        const tab = getByRole('tab');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(tab);
        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.keyPress(tab, { key: 'Enter', code: 13, charCode: 13 });
        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
