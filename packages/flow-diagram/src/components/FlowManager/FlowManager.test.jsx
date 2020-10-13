import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import { Desktop, Error } from '@pingux/icons';
import { Button } from '@pingux/compass';
import FlowManager from './FlowManager';
import {
    outletTemplate,
    successNode,
    failureNode,
    nodeTemplateStart,
    stepTemplate,
} from './templates';

const loginStepJSON = {
    'title': 'My first step type!',
    'description': 'This is an example step type',
    'type': 'object',
    'properties': {
        'stepType': {
            'const': 'LOGIN',
        },
        'configuration': {
            'properties': {
                'enableRegistration': {
                    'type': 'boolean',
                },
                'redirectUrl': {
                    'type': 'string',
                    'format': 'uri',
                },
            },
            'additionalProperties': false,
        },
        'outlets': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'enum': [
                            'On Success',
                            'Bad Password',
                        ],
                    },
                    'next': {
                        'type': 'string',
                    },
                },
            },
        },
        'outputSchema': {
            'properties': {
                'someOutputParam': {
                    'type': 'string',
                    'title': 'The example output param',
                    'description': 'This is just an example output parameter.',
                },
            },
        },
    },
};

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

const testId = 'test-flow-manager';
const defaultProps = {
    'data-testid': testId,
    renderTopPanel: (flowDefinition) => {
        return (
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                <div>
                    <p style={{ color: 'gray', fontWeight: 'bold', margin: 0 }}>Flow Manager</p>
                    <h2 style={{ margin: 0 }}>Registration</h2>
                </div>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                    <Error fill="#a30303" />
                    <p style={{ color: '#a30303', fontWeight: 'bold', marginLeft: 10 }}>1 error. To publish this flow, fix all errors.</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button style={{ border: 'none' }}>Cancel</Button>
                    <Button style={{ marginLeft: 10, marginRight: 15 }}>Save</Button>
                    <Button style={{ background: '#4462ED', color: 'white' }} onClick={() => console.log(flowDefinition)}>Save & Close</Button>
                </div>
            </div>
        );
    },
    typeDefinitions: [
        ['LOGIN', stepTemplate('#028CFF', <Desktop />)],
        ['success', outletTemplate('#0bbf01')],
        ['failure', outletTemplate('#ce0808')],
        ['not_found', outletTemplate('#000')],
        ['finished', successNode],
        ['error', failureNode],
        ['START', nodeTemplateStart],
    ],
    paletteDataArray: [{ ...loginStepJSON, key: 0, text: loginStepJSON.title }],
    paletteLinkDataArray: [],
    links,
    nodes,
    triggers: [
        {
            'type': 'START',
            'next': 'user-login',
        },
    ],
};
const getComponent = props => render(<FlowManager {...defaultProps} {...props} />);
test('Renders flowManager', () => {
    getComponent();
    const flowManager = screen.getByTestId(testId);
    expect(flowManager).toBeInTheDocument();
});
test('Has correct styling', () => {
    getComponent();
    const flowManager = screen.getByTestId(testId);
    expect(flowManager).toHaveStyleRule('display', 'flex');
});
