import React, { useState } from 'react';
import { Desktop, Error, Success, Walkthrough } from '@pingux/icons';
import { Button, Checkbox, Field, Input } from '@pingux/compass';
import FlowManager from './FlowManager';
import {
    outletTemplate,
    successNode,
    failureNode,
    nodeTemplateStart,
    stepTemplate,
} from './templates';
import { stepsToFlowDiagram, triggersToFlowDiagram } from '../../utils/dataUtils';

export default {
    title: 'Flow Manager',
    component: FlowManager,
};

// KEEP THIS- Sample step type from API
//
// const loginStepJSON = {
//     'title': 'My first step type!',
//     'description': 'This is an example step type',
//     'type': 'object',
//     'properties': {
//         'stepType': {
//             'const': 'LOGIN',
//         },
//         'configuration': {
//             'properties': {
//                 'enableRegistration': {
//                     'type': 'boolean',
//                 },
//                 'redirectUrl': {
//                     'type': 'string',
//                     'format': 'uri',
//                 },
//             },
//             'additionalProperties': false,
//         },
//         'outlets': {
//             'type': 'array',
//             'items': {
//                 'type': 'object',
//                 'properties': {
//                     'name': {
//                         'enum': [
//                             'On Success',
//                             'Bad Password',
//                         ],
//                     },
//                     'next': {
//                         'type': 'string',
//                     },
//                 },
//             },
//         },
//         'outputSchema': {
//             'properties': {
//                 'someOutputParam': {
//                     'type': 'string',
//                     'title': 'The example output param',
//                     'description': 'This is just an example output parameter.',
//                 },
//             },
//         },
//     },
// };

// KEEP THIS- for reference during development
// {
//     "name": "Example Single Factor Flow Definition",
//     "description": "This is an example flow definition",
//  "triggers": [
//     {
//          "type": "AUTHENTICATION",
//          "next": "userLogin"
//     },
//     {
//         “type”: “LINK”,
//         “next”: “..”,
//         “inputSchema”: {

//         },
//     {
//         “type”: “API”,
//         “next”: “..”,
//         “inputSchema”: {
//     },
// ],

//     "stepDefinitions": {
//      "userLogin": {
//         "type": "LOGIN",
//         "configuration": {
//           "enableRegistration": true,
//           "accountRecovery": "${flow.context.recoveryEnabled}"
//         },
//         “outputMapping”: {
//             “usernameProvided”: “${this.outputs.username}”,
//             “id”: ”123fdsj23521fsdf”,
//             “initialUsername”:”${flow.inputs.user.id}”
//         },
//         "outlets": [{
//             "name": "On Success",
//             "type": "success",
//             "next": "finished"
//           },
//           {
//             "name": "On Failure",
//             "type": "failure",
//             "next": "error"
//           },
//           {
//             "name": "no such user",
//             "type": "not_found",
//             "next": "registration"
//           }
//         ]
//       },
//       "finished": {
//         "type": "END_FLOW",
//         "configuration": {
//           "redirect": "https://example.com"
//         }
//       },
//       "error": {
//         "type": "END_FLOW",
//         "configuration": {
//           "error": {
//             "code": "${step.context.status}",
//             "message": "authentication failed"
//           }
//         }
//       },
//       "registration": {
//         "type": "EXECUTE_FLOW",
//         "configuration": {
//           "flowDefinition": {
//             "id": "1234"
//           },
//           "flowConfiguration": {
//             "username": "${flow.steps.context.username}"
//           }
//         }
//       }
//     }
//   }

function Demo() {
    const [skipsDiagramUpdate] = useState(false);

    const stepDefinitions =
        [
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

    const [triggerNodes, triggerLinks] = triggersToFlowDiagram(triggers);
    const [steps, links] = stepsToFlowDiagram(stepDefinitions);
    const [stepDefs, setStepDefs] = useState(steps);

    const onChangeConfig = (id, field, val) => {
        const updatedDefinitions = stepDefs.map((obj) => {
            if (obj.id === id) {
                const updatedStep = {
                    ...obj,
                    configuration: {
                        ...obj.configuration,
                        [field]: val,
                    },
                };
                return updatedStep;
            }
            return obj;
        });

        setStepDefs(updatedDefinitions);
    };

    const getConfig = (id) => {
        return stepDefs.find(def => def.id === id).configuration;
    };

    const nodeClick = (id) => {
        console.log(id);
    };

    const onModelChange = (updates) => {
        setStepDefs([...stepDefs, ...updates.insertedNodes]);
    };

    return (
        <div>
            <FlowManager
                renderTopPanel={(flowDefinition) => {
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
                }}
                // How to decide whether or not these get put into the list of the left?
                // Can't just extrapolate based on stepDefinitions, because that would mean
                // that empty workflows would be missing most options.
                typeDefinitions={[
                    {
                        id: 'LOGIN',
                        displayName: 'Login',
                        icon: <Desktop />,
                        color: '#028CFF',
                        template: stepTemplate,
                        configuration: {
                            'enableRegistration': true,
                            'accountRecovery': '{flow.context.recoveryEnabled}',
                        },
                        renderConfig: node => (
                            <>
                                <Field label="Account Recovery" mb={20}>
                                    <Input value={getConfig(node.id).accountRecovery} onValueChange={val => onChangeConfig(node.id, 'accountRecovery', val)} width="90%" />
                                </Field>
                                <Checkbox isChecked={getConfig(node.id).enableRegistration} label="Enable Registration" onChange={val => onChangeConfig(node.id, 'enableRegistration', val)} />
                            </>
                        ),
                    },
                    {
                        id: 'EXECUTE_FLOW',
                        displayName: 'Execute Flow',
                        icon: <Walkthrough />,
                        color: '#228C22',
                        template: stepTemplate,
                    },
                    {
                        id: 'success',
                        template: outletTemplate,
                        showInPalette: false,
                        color: '#0bbf01',
                    },
                    {
                        id: 'failure',
                        template: outletTemplate,
                        showInPalette: false,
                        color: '#ce0808',
                    },
                    {
                        id: 'not_found',
                        template: outletTemplate,
                        showInPalette: false,
                        color: '#000',
                    },
                    {
                        id: 'finished',
                        template: successNode,
                        displayName: 'Complete',
                        icon: <Success />,
                        color: '#00B111',
                    },
                    {
                        id: 'error',
                        template: failureNode,
                        displayName: 'Failure',
                        icon: <Error />,
                        color: '#BB0101',
                    },
                    {
                        id: 'START',
                        template: nodeTemplateStart,
                        showInPalette: false,
                    },
                ]}
                links={[...links, ...triggerLinks]}
                nodes={[...steps, ...triggerNodes]}
                triggers={[
                    {
                        'type': 'START',
                        'next': 'user-login',
                    },
                ]}
                onModelChange={onModelChange}
                onNodeClick={nodeClick}
            />
        </div>
    );
}

export const Default = () => {
    return (
        <Demo />
    );
};
