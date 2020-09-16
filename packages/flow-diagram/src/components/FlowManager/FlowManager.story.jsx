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

function Demo() {
    const [nodeDataArray] = useState([{ key: 0, category: 'Start', loc: '0 0' }, { key: 1, text: 'Action', category: 'action' }]);
    const [paletteDataArray] = useState([
        { ...loginStepJSON, key: 0, text: loginStepJSON.title },
    ]);
    const [paletteLinkDataArray] = useState([]);
    const [linkDataArray] = useState([{ from: 0, to: 1 }]);
    const [skipsDiagramUpdate] = useState(false);

    return (
        <div>
            <FlowManager
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
                skipsDiagramUpdate={skipsDiagramUpdate}
                paletteDataArray={paletteDataArray}
                paletteLinkDataArray={paletteLinkDataArray}
            />
        </div>
    );
}

export const Default = () => {
    return (
        <Demo />
    );
};
