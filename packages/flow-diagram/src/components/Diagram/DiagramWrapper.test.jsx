import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import DiagramWrapper from './DiagramWrapper';

const testId = 'test-diagram';
const defaultProps = {
    'data-testid': testId,
};

const getComponent = props => render(<DiagramWrapper {...defaultProps} {...props} />);
test('Renders diagram wrapper', () => {
    getComponent();
    const diagram = screen.getByTestId(testId);
    expect(diagram).toBeInTheDocument();
});
