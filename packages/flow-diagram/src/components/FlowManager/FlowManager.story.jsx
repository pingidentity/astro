import React, { useState } from 'react';
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
import { stepsToFlowDiagram, triggersToFlowDiagram } from '../../utils/dataUtils';

export default {
    title: 'Flow Manager',
    component: FlowManager,
};

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
    const [paletteDataArray] = useState([
        { ...loginStepJSON, key: 0, text: loginStepJSON.title },
    ]);
    const [paletteLinkDataArray] = useState([]);
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

    const [steps, links] = stepsToFlowDiagram(stepDefinitions);
    const [triggerNodes, triggerLinks] = triggersToFlowDiagram(triggers);

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
                    ['LOGIN', stepTemplate('#028CFF', <Desktop />)],
                    ['success', outletTemplate('#0bbf01')],
                    ['failure', outletTemplate('#ce0808')],
                    ['not_found', outletTemplate('#000')],
                    ['finished', successNode],
                    ['error', failureNode],
                    ['START', nodeTemplateStart],
                ]}
                skipsDiagramUpdate={skipsDiagramUpdate}
                paletteDataArray={paletteDataArray}
                paletteLinkDataArray={paletteLinkDataArray}
                // stepDefinitions={stepDefinitions}
                links={[...links, ...triggerLinks]}
                nodes={[...steps, ...triggerNodes]}
                triggers={[
                    {
                        'type': 'START',
                        'next': 'user-login',
                    },
                ]}
            />
        </div>
    );
}

export const Default = () => {
    return (
        <Demo />
    );
};
