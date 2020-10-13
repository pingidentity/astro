import { stepsToFlowDiagram, triggersToFlowDiagram } from './dataUtils';

const stepDefinitions = [
    {
        id: 'user-login', // Used for internal calculations and callbacks
        name: 'User login',
        stepId: 'userLogin',
        'type': 'LOGIN',
        'configuration': {
            'enableRegistration': true,
            'accountRecovery': '{flow.context.recoveryEnabled}',
        },
        outputMapping: {
            usernameProvided: '{this.outputs.username}',
            id: '123fdsj23521fsdf',
            initialUsername: '{flow.inputs.user.id}',
        },
        'outlets': [{
            'name': 'On Success',
            'type': 'success',
            'next': 'finished',
        },
        {
            'name': 'On Failure',
            'type': 'failure',
            'next': 'error',
        },
        {
            'name': 'no such user',
            'type': 'not_found',
            'next': 'registration',
        },
        ],
    },
    {
        id: 'finished',
        stepId: 'finished',
        'type': 'finished',
        'configuration': {
            'redirect': 'https://example.com',
        },
    },
    {
        id: 'registration',
        stepId: 'registration',
        'type': 'EXECUTE_FLOW',
        'configuration': {
            'error': {
                'code': '{step.context.status}',
                'message': 'authentication failed',
            },
            'flowDefinition': {
                'id': '1234',
            },
        },
    },
];

const triggers = [
    {
        type: 'START',
        next: 'user-login',
    },
];

test('stepsToFlowDiagram returns correct value for steps', () => {
    const [steps, links] = stepsToFlowDiagram(stepDefinitions);
    expect(steps).toEqual([{ 'id': 'user-login', 'key': 'user-login', 'category': 'LOGIN', 'name': 'User login', 'stepId': 'userLogin', 'configuration': { 'enableRegistration': true, 'accountRecovery': '{flow.context.recoveryEnabled}' }, 'errorMessage': '' },
        { 'id': 'user-login-success', 'key': 'user-login-success', 'category': 'success', 'text': 'On Success', 'isOutlet': true },
        { 'id': 'user-login-failure', 'key': 'user-login-failure', 'category': 'failure', 'text': 'On Failure', 'isOutlet': true },
        { 'id': 'user-login-not_found', 'key': 'user-login-not_found', 'category': 'not_found', 'text': 'no such user', 'isOutlet': true },
        { 'id': 'finished', 'key': 'finished', 'category': 'finished', 'stepId': 'finished', 'configuration': { 'redirect': 'https://example.com' }, 'errorMessage': '' },
        { 'id': 'registration', 'key': 'registration', 'category': 'EXECUTE_FLOW', 'stepId': 'registration', 'configuration': { 'error': { 'code': '{step.context.status}', 'message': 'authentication failed' }, 'flowDefinition': { 'id': '1234' } }, 'errorMessage': 'authentication failed' }],
    );
});
test('stepsToFlowDiagram returns correct value for ilnks', () => {
    const [steps, links] = stepsToFlowDiagram(stepDefinitions);
    expect(links).toEqual([{ 'id': 'user-login_user-login-success', 'from': 'user-login', 'to': 'user-login-success' },
        { 'id': 'user-login-success_finished', 'from': 'user-login-success', 'to': 'finished' },
        { 'id': 'user-login_user-login-failure', 'from': 'user-login', 'to': 'user-login-failure' },
        { 'id': 'user-login-failure_error', 'from': 'user-login-failure', 'to': 'error' },
        { 'id': 'user-login_user-login-not_found', 'from': 'user-login', 'to': 'user-login-not_found' },
        { 'id': 'user-login-not_found_registration', 'from': 'user-login-not_found', 'to': 'registration' }],
    );
});
test('triggersToFlowDiagram returns correct value for triggerNodes', () => {
    const [triggerNodes, triggerLinks] = triggersToFlowDiagram(triggers);
    expect(triggerNodes).toEqual([{ 'id': 'START', 'key': 'START', 'category': 'START', 'loc': '0 0' }],
    );
});
test('triggersToFlowDiagram returns correct value for triggerLinks', () => {
    const [triggerNodes, triggerLinks] = triggersToFlowDiagram(triggers);
    expect(triggerLinks).toEqual([{ 'id': 'START_user-login', 'from': 'START', 'to': 'user-login' }],
    );
});
