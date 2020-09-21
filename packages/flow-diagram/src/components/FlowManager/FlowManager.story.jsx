import React, { useState } from 'react';
import FlowManager from './FlowManager';

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
            'type': 'END_FLOW',
            'configuration': {
                'redirect': 'https://example.com',
            },
        },
        {
            id: 'error',
            stepId: 'error',
            'type': 'END_FLOW',
            'configuration': {
                'error': {
                    'code': '{step.context.status}',
                    'message': 'authentication failed',
                },
            },
        },
        {
            id: 'registration',
            stepId: 'registration',
            'type': 'EXECUTE_FLOW',
            'configuration': {
                'flowDefinition': {
                    'id': '1234',
                },
                'flowConfiguration': {
                    'username': '{flow.steps.context.username}',
                },
            },
        },
    ];

    return (
        <div>
            <FlowManager
                skipsDiagramUpdate={skipsDiagramUpdate}
                paletteDataArray={paletteDataArray}
                paletteLinkDataArray={paletteLinkDataArray}
                stepDefinitions={stepDefinitions}
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
