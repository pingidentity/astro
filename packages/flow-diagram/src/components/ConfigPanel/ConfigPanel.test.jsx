import React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import ConfigPanel from './ConfigPanel';

const testId = 'test-config-panel';
const defaultProps = {
    'data-testid': testId,
    data: {
        category: 'LOGIN',
        configuration: { enableRegistration: true, accountRecovery: '{flow.context.recoveryEnabled}' },
        errorMessage: '',
        key: 'user-login',
        loc: '70.00000000000004 0',
        name: 'User login',
        stepId: 'userLogin',
    },
    onClose: jest.fn(() => {}),
};

const getComponent = props => render(<ConfigPanel {...defaultProps} {...props} />);
test('Renders configPanel', () => {
    getComponent();
    const configPanel = screen.getByTestId(testId);
    expect(configPanel).toBeInTheDocument();
});
test('Has correct styling', () => {
    getComponent();
    const configPanel = screen.getByTestId(testId);
    expect(configPanel).toHaveStyleRule('position', 'relative');
});
test('Clicking close fires onClose', () => {
    getComponent();
    const closeButton = screen.getByTestId('config-panel-close');
    fireEvent(
        closeButton,
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    );
    expect(defaultProps.onClose).toHaveBeenCalled();
});
