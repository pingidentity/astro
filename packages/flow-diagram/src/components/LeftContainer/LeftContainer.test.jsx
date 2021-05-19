import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import LeftContainer from './LeftContainer';

const testId = 'test-container';
const defaultProps = {
    'data-testid': testId,
};

const getComponent = props => render(<LeftContainer {...defaultProps} {...props} />);
test('Renders container', () => {
    getComponent();
    const container = screen.getByTestId(testId);
    expect(container).toBeInTheDocument();
});
