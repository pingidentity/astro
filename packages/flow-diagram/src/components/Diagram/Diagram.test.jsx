import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { Desktop, Details } from '@pingux/icons';
import Diagram from './Diagram';
import { failureNode, groupTemplate, nodeTemplateStart, outletTemplate, stepTemplate, successNode } from '../FlowManager/templates';

const typeDefinitions = [
    ['LOGIN', stepTemplate('#028CFF', <Desktop />)],
    ['success', outletTemplate('#0bbf01')],
    ['failure', outletTemplate('#ce0808')],
    ['not_found', outletTemplate('#000')],
    ['finished', successNode],
    ['error', failureNode],
    ['START', nodeTemplateStart],
];

const links = [{ 'id': 'user-login_user-login-success', 'from': 'user-login', 'to': 'user-login-success' },
    { 'id': 'user-login-success_finished', 'from': 'user-login-success', 'to': 'finished' },
    { 'id': 'user-login_user-login-failure', 'from': 'user-login', 'to': 'user-login-failure' },
    { 'id': 'user-login-failure_error', 'from': 'user-login-failure', 'to': 'error' },
    { 'id': 'user-login_user-login-not_found', 'from': 'user-login', 'to': 'user-login-not_found' },
    { 'id': 'user-login-not_found_registration', 'from': 'user-login-not_found', 'to': 'registration' },
    { 'id': 'START_user-login', 'from': 'START', 'to': 'user-login' },
];

const nodes = [{ 'id': 'user-login', 'key': 'user-login', 'category': 'LOGIN', 'name': 'User login', 'stepId': 'userLogin', 'configuration': { 'enableRegistration': true, 'accountRecovery': '{flow.context.recoveryEnabled}' }, 'errorMessage': '' },
    { 'id': 'user-login-success', 'key': 'user-login-success', 'category': 'success', 'text': 'On Success', 'isOutlet': true },
    { 'id': 'user-login-failure', 'key': 'user-login-failure', 'category': 'failure', 'text': 'On Failure', 'isOutlet': true },
    { 'id': 'user-login-not_found', 'key': 'user-login-not_found', 'category': 'not_found', 'text': 'no such user', 'isOutlet': true },
    { 'id': 'finished', 'key': 'finished', 'category': 'finished', 'stepId': 'finished', 'configuration': { 'redirect': 'https://example.com' }, 'errorMessage': '' },
    { 'id': 'registration', 'key': 'registration', 'category': 'EXECUTE_FLOW', 'stepId': 'registration', 'configuration': { 'error': { 'code': '{step.context.status}', 'message': 'authentication failed' }, 'flowDefinition': { 'id': '1234' } }, 'errorMessage': 'authentication failed' },
    { 'id': 'START', 'key': 'START', 'category': 'START', 'loc': '0 0' },
];

const testId = 'test-diagram';
const defaultProps = {
    'data-testid': testId,
    groupTemplates: [['', groupTemplate]],
    nodeTemplates: [
        ['', stepTemplate('#028CFF', <Details />)],
        ...typeDefinitions],
    links,
    nodes,
};

const getComponent = props => render(<Diagram {...defaultProps} {...props} />);
test('Renders diagram', () => {
    getComponent();
    const diagram = screen.getByTestId(testId);
    expect(diagram).toBeInTheDocument();
});
test('Has correct styling', () => {
    getComponent();
    const diagram = screen.getByTestId(testId);
    expect(diagram).toHaveStyleRule('width', '80%');
});
