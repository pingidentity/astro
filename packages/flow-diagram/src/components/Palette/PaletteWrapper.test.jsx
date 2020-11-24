import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import PaletteWrapper from './PaletteWrapper';

const testId = 'test-palette';

const getComponent = props => render(<PaletteWrapper data-testid="test-palette" {...props} />);
test('Renders palette wrapper', () => {
    getComponent();
    const palette = screen.getByTestId(testId);
    expect(palette).toBeInTheDocument();
});
